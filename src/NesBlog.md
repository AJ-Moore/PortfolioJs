### Writing my first game system emulator 

More to come... a work in progress, it's designed to be a brief overview of my approach and implemenation and not a deep dive into the nes's hardware or console emulation in general. Disclaimer I wrote this almost 5 years ago whilst I was working as a SDET over the course of about 2 weekends and some nights after work I have barely looked at it since.

The emulator is intended to simulate the operation of the 2A03. 2A07 8 bit microprocessory developed by Rocoh for use in the nintendo entertainment system, a game system developed by nintendo in 1982, originally released under the name Famicom in Japan on July 15th 1983 then subsequently was made available to the US in 1985 and Europe in 1986.


## Emulating 6502 CPU

A brief look at my CPU Implementation.

RAM: The 64KB of addressable memory on the nes is represented by a vector of unsigned bytes.

Registers: Registers are attributes exposed on the CPU a plan for my next emulator is actually to make registers more configurable in order to create a more general purpose CPU definition where I can configure the particular registers based on the processor.

Read/Write Memory: Methods are provided for reading and writing memory, certain memory addresses are mirrored in different locations, providing a read write function allows us to mirror the writes to the other locations (Memory at $000-$07FF mirrored at $0800, $1000, $1800)

```
// Some attributes removed for brievity
class CPU
{
public: 
    // Read/ Write bytes to memory
    uint8 ReadMemory8(uint16 Addr);
    uint16 ReadMemory16(uint16 Addr);
    void WriteMemory8(uint16 Addr, uint8 Data);

private:
    // Reference to cartridge data
	Cartridge* m_loadedCartridge = nullptr;

    ...
    uint16 ReadMemoryAddress(AdrMode Mode);
    
    //... GetMem<AddrssingMode> - Removed for brevity

    //!< RAM - The CPUS memory/ ram 64KB total Address range from $0 - $FFFF
    std::vector<ubyte> RAM;

    // Constants to address locations for convience 
    // CPU ADDRESS LOCATIONS
    // https://wiki.nesdev.com/w/index.php/PPU_registers#OAMADDR
    static const uint16 PPU_CTRL_ADR = 0x2000;
    static const uint16 PPU_MASK_ADR = 0x2001;
    static const uint16 PPU_STATUS_ADR = 0x2002;
    static const uint16 OAM_ADR = 0x2003;
    static const uint16 OAM_DATA_ADR = 0x2004;
    static const uint16 PPU_SCROLL_ADR = 0x2005;
    static const uint16 PPU_ADR = 0x2006;
    static const uint16 PPU_DATA_ADR = 0x2007;
    static const uint16 OAM_DMA_ADR = 0x4014;
    static const uint16 CONTROLLER1_ADR = 0x4016;
    static const uint16 CONTROLLER2_ADR = 0x4017;

    uint16 PC = PRGROM_UPPER;
    uint8 SP = 0xFD;
    uint8 Accumulator = 0;
    uint8 XReg = 0;
    uint8 YReg = 0;
    uint8 ProcessorStatus = 0;
}
```


## Fetching and executing instructions 

In the CPU's update method we read the value at the memory location of the PC and execute the coresponding instruction. The PC increment is usually handled by the instruction itself.
```
	void CPU::Update()
	{
		// Check for non-maskable interrupt
		CheckForInterrupt();
		uint8 opCode = ReadMemory8(PC);
		m_instructions[opCode]->Execute(opCode);
	}
```



## Wrapping the CPU instruction/s 

When I first approached this problem I considered writing 151 operations required for the nes by hand however I thought to myself there must be a way to be able to extrapolate the addressing mode and then adapt the behaviour based on that mode.

`Info: Adressing Modes affect how an operation code and operand is interpreted.`

As it turns out you can extrapolate the addressing mode from the operation code, bits 2, 3 & 4 corespond to the adressing mode. 

`For opcode aaabbbcc. bbb bits determine addressing mode.`

However the approach I decided to take by wrapping the instruction meant it wasn't actually necessary to extropolate this from the opcode as I was able to implicitly reference the addressing mode through the assiociation between the opcode and the operation addressing mode. 

```js
// i.e. for the add mem accumulator with carry instruction we can see the operation 0x69 is associated with the immediate addressing mode of the ADC opcode
//params: uint8 opCode, uint8 bytes, uint8 cycles, uint8 cylesPageBoundary, AdrMode mode
ADC->AddOperation(0x69, 2, 2, 0, AdrMode::IMMEDIATE);
...
```

### Implementing the Instruction class 
In order to save writing out each variation of the instruction for each addressing mode I made it so you can sepcify the instruction referencing the functor to the code for the instruction then specify an operation for each addressing mode. See the example below for adding the (ADC)add memory to accumulator with carry operations

```c++
        // Instruction.h
        void AddOperation(uint8 opCode, uint8 bytes, uint8 cycles, uint8 cylesPageBoundary, AdrMode mode);

        // CPU.cpp
		SharedPtr<Instruction> ADC = std::make_shared<Instruction>("ADC", std::bind(&CPU::ADC, this, std::placeholders::_1));
		ADC->AddOperation(0x69, 2, 2, 0, AdrMode::IMMEDIATE);
		ADC->AddOperation(0x65, 2, 3, 0, AdrMode::ZERO_PAGE);
		ADC->AddOperation(0x75, 2, 4, 0, AdrMode::ZERO_PAGEX);
		ADC->AddOperation(0x6D, 3, 4, 0, AdrMode::ABSOLUTE);
		ADC->AddOperation(0x7D, 3, 4, 1, AdrMode::ABSOLUTEX);
		ADC->AddOperation(0x79, 3, 4, 1, AdrMode::ABSOLUTEY);
		ADC->AddOperation(0x61, 2, 6, 0, AdrMode::INDEXED_INDIRECT);
		ADC->AddOperation(0x71, 2, 5, 1, AdrMode::INDIRECT_INDEXED);
		AddInstruction(ADC);
```


```c++
...

namespace ControlDeck
{
	class Instruction
	{
		friend class CPU;
	public:
		Instruction(String Name, std::function<void(AdrMode)>);

		virtual void Init() {}
		virtual void Execute(uint8 opCode);

		String GetInfo() const { return m_info; }
		void SetInfo(String info) { m_info = info; }
		String GetName() const { return m_name; }

		void Bind(std::function<void(AdrMode)>);
        // Adds entry Instruction info to the m_instructions vector
		void AddOperation(uint8 opCode, uint8 bytes, uint8 cycles, uint8 cylesPageBoundary, AdrMode mode);
		std::vector<uint8> GetOpCodes() const;

	protected:
		CPU* m_cpu = nullptr;
		String m_name = "ERR";
		String m_info = "No Info given.";
		std::vector<UniquePtr<InstructionInfo>> m_instructions;
		std::function<void(AdrMode)> m_operation;

		const InstructionInfo* GetInstructionInfo(uint8 OpCode) const;
	};
}
```

When executing the operation the addressing mode is passed to the method the ReadMemoryAddress takes the mode and returns the address of the data we want to operate on, this is a pretty common pattern used in the emulator though in some instances we may want to do something different such as with the accumulator addressing mode we might explicitly check for the addressing mode in order to carry out the operation.

``` c++
	/*Add memory to Accumulator with carry*/
	void CPU::ADC(AdrMode Mode)
	{
		uint8 data = ReadMemory8(ReadMemoryAddress(Mode));

		uint16 sum = ProcessorStatus & PFlags::CARRY;
		sum += Accumulator;
		sum += data;

		// check for overflow. 
		if (data & PFlags::NEGATIVE && Accumulator & PFlags::NEGATIVE)
		{
			SetProcessorFlag(PFlags::OVER_FLOW, (sum & PFlags::NEGATIVE) == 0);
		}

		// check for overflow.
		if ((data & PFlags::NEGATIVE) == 0 && (Accumulator & PFlags::NEGATIVE) == 0)
		{
			SetProcessorFlag(PFlags::OVER_FLOW, sum & PFlags::NEGATIVE);
		}

		SetProcessorFlag(PFlags::CARRY, sum > 255);
		SetProcessorFlag(PFlags::ZERO, sum == 0);
		SetProcessorFlag(PFlags::NEGATIVE, sum & PFlags::NEGATIVE);

		Accumulator = sum;
	}

    ... 
    // As we can see it returns the memory address based on the addressing mode
    uint16 CPU::ReadMemoryAddress(AdrMode Mode)
	{
		switch (Mode)
		{
		case AdrMode::ZERO_PAGE: return GetMemZeroPage();
		case AdrMode::ZERO_PAGEX: return GetMemZeroPageX();
		case AdrMode::ZERO_PAGEY: return GetMemZeroPageY();
		case AdrMode::ABSOLUTE: return GetMemAbsolute();
		case AdrMode::ABSOLUTEX: return GetMemAbsoluteX();
		case AdrMode::ABSOLUTEY: return GetMemAbsoluteY();
		case AdrMode::ABSOLUTE_INDIRECT: return GetMemAbsoluteIndirect();
		case AdrMode::IMMEDIATE: return GetMemImmediate();
		case AdrMode::RELATIVE: return GetMemRelative();
		case AdrMode::INDEXED_INDIRECT: return GetMemIndexedIndirect();
		case AdrMode::INDIRECT_INDEXED: return GetMemIndirectIndexed();
		default:
			throw ("Operation Addressing Mode Error");
		}

		return uint8();
	}

    // Example Zero Page, we add one to the program counter to get to the address of the operand read the operand into memory, increment PC to move onto the next instruction and return the value of data read from memory. This behaviour varies depending on the addressing mode, they generally operate in different parts of memory or might add the value of a register to the operand. The value read could be a pointer to another memory location or a value how it finally gets interpreted depends on what instruction was executed to begin with.
    uint16 CPU::GetMemZeroPage()
	{
		PC++;
		uint8 M = ReadMemory8(PC);
		PC++;
		return M;
	}
```

Following this structure I came up with I implemented the behaviour for all the essential operations, luckily the instructions themselves are fairly well documented and it was just a case of implementing the desired behaviour in c++, though it wasn't without its pitfalls.