
document.title = "Allan Moore - Portfolio"

const Alzonjs =
{
    Create(obj)
    {
        const tag = obj.tag || "div";

        const element = document.createElement(tag);

        if (element.children !== undefined)
        {
            if (Array.isArray(obj.children))
            {
                obj.children.forEach(child => {
                    element.appendChild(child);
                });
            }
        }

        for (const key in obj.properties)
        {
            // Check if the property is a style (CSS property)
            if (key === "style"){
                element.style.cssText = obj.properties[key];
            } 
            else {
                if (element[key] !== undefined)
                {
                    element[key] = obj.properties[key];
                }
            }
        }

        return element;
    }
}

const CreateBlogTitle = () =>
{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className:"BlogTitle",
            innerHTML:"My Post Title",
        }
    });
}

const CreateBlogSummary = () =>
{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className:"BlogSummary",
            innerHTML:"My Post summary",
        }
    })
}

const CreateBlogImage = () =>{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className:"BlogImage"
        }
    })
}

const CreateBlogBody = () =>{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className:"BlogBodyContainer"
        }
    })
}

const BlogTitle = CreateBlogTitle();
const BlogSummary = CreateBlogSummary();
const BlogImage = CreateBlogImage();
const BlogBody = CreateBlogBody();


const ModalViewAnimator = Alzonjs.Create({
    properties:{
        className:"ModalViewAnimator"
    }
});

const CreateModalView = () =>
{
    const ModalView =  Alzonjs.Create({
        tag:"div",
        properties:{
            className: "PortfolioItemModal ModalView", 
        }
    });

    ModalView.appendChild(ModalViewAnimator);

    ModalViewAnimator.appendChild(Alzonjs.Create({
        tag:"div",
        properties:{
            className: "ModalContent",
        },
        children:[
            Alzonjs.Create({
                tag: "span",
                properties:{
                    className:"CloseModal",
                    onclick: function(){
                        //ModalView.style.display = "none";
                        ModalViewAnimator.classList.add("ModalHidden");
                        // Disable scrolling of body when modal is open.
                        document.body.style.overflow = "scroll";
                    },
                    innerHTML:"X"
                }
            }),
            Alzonjs.Create({
                tag:"div",
                properties:{
                    className:"BlogEntryContainer"
                },
                children:[
                    BlogTitle,
                    BlogSummary,
                    BlogImage,
                    BlogBody
                ]
            })
        ]
    }));

    return ModalView;
}

const ModalView = CreateModalView();

const CreateLink = (params) =>
{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className:"Link",
        },
        children:[
            Alzonjs.Create({
                tag:"img",
                properties:{
                    className: "LinkedInImg",
                    src: params.img
                }
            }),
            Alzonjs.Create({
                tag:"div",
                properties:{
                    className:"LinkText",
                    innerHTML:params.link,
                    //href:params.link,
                    onclick:function(){
                        window.location = params.link;
                    }
                }
            }),
        ]
    })
}

const CreateSkillTag = (skill) =>
{
    return Alzonjs.Create({
        tag:"div", 
        properties:{
            className:"ProfileSkill",
            innerHTML:skill,
        },
    });
}

const CreateNameHeader = () =>
{
    return Alzonjs.Create({
        tag:"div", 
        properties:{
            className:"InfoHeader",
        },
        children:[
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className:"ProfileName",
                    innerHTML:"Allan Moore",
                }
            }), 
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className:"ProfileOccupation",
                    innerHTML:"Senior Software Engineer",
                }
            }), 
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className:"ProfileSkills",
                    //innerHTML:"C++ C# OpenGL Unity VR",
                },
                children:[
                    CreateSkillTag("C++"),
                    CreateSkillTag("C#"),
                    CreateSkillTag("OpenGL"),
                    CreateSkillTag("Unity"),
                    CreateSkillTag("VR"),
                ]
            }), 
        ]
    });
}

const CreateHeader = () =>
{
    return Alzonjs.Create({
        tag: "div",
        properties:{
            className:"HeaderContainer",
        },
        children:[

            CreateNameHeader(),
            Alzonjs.Create({
                tag:"img",
                properties:{
                    className:"AlzonHeaderImg",
                    src:"./res/meweb.jpg"
                }
            }),
            Alzonjs.Create({
                tag:'div', 
                properties:{
                    className:"LinkContainer"
                },
                children:[
                    CreateLink({
                        img:"./res/LI-In-Bug.png", 
                        link:"https://www.linkedin.com/in/allan-moore/",
                    }),
                    CreateLink({
                        img:"./res/github2.png", 
                        link:"https://github.com/AJ-Moore",
                    }),
                    CreateLink({
                        img:"./res/Instagram_Glyph_Black.png", 
                        link:"https://www.instagram.com/alzonnnnnnn/",
                    })
                ]
            })
        ]
    });
}

const CreateBanner = () =>
{
    return Alzonjs.Create({
        tag: "div",
        properties:{
            className:"AlzonBanner",
        },
        children:[
            CreateHeader()
        ]
    });
}

const CreateHeroParagraph = () =>
{
    return Alzonjs.Create({
        tag:"p", 
        properties:{
            className:"ProfileText",
            innerHTML:"I am a skilled developer with a passion for computer science and games development. I specialise in a few areas including gameplay programming in Unity and Graphics Programming in OpenGL though my interests also extend to network programming and game engine development.<br><br> In my most recent position I worked as a Senior Programming at Factory 42 developing VR games and immersive mixed reality experiences for Meta Quest, Magic Leap, iOS and Android. Some of my work included developing network systems for use on site at some of the experiences I worked on such as on the Green Planet AR Experience, a Nvidia Cloud XR based AR mobile experience and Lost Origin a Magic Leap based experience. One of the larger projects I worked on whilst at Factory42 was Unearthed a meta quest VR game, I worked as a gameplay programming and worked on various systems we used in the game including visual systems used to create gameplay sequences. <br><br> Prior to Joining Factory 42 I worked as a Software Engineer at Lionbridge working closely with Xbox studios quality I built tools, scripts and automation solutions for Microsoft first party titles, most notably Forza Street for mobile platforms. <br><br>Prior to this I worked as a software developer at a small company known as Softpauer where I primarily worked on Event Apps most notably the official formula 1 application and later known as the f1 timing app before it was discontinued. I worked on our in house engine written in C++ and OpenGL and worked closely with designers to implement new app features. I am a dedicated and passionate developer, constantly seeking opportunities to innovate and refine my skills. I approach every project with enthusiasm and a drive to deliver impactful, high-quality work."
        }
    });
}

const UnpackData = (data) =>{
    const body = Alzonjs.Create({
        properties:{
            className:"BlogBody"
        }
    });

    // Check for code block 
    if (data.codeBlock != undefined)
    {
        const bodyCodeElementParent = Alzonjs.Create({
            properties:{
                className:"BlogBodyElementParent"
            }
        });
    
        body.appendChild(bodyCodeElementParent);
    
        // Insert custom code HTML Block 
        bodyCodeElementParent.appendChild(Alzonjs.Create({
            properties:{
                className:"BlogBodyElement",
                innerHTML:data.codeBlock.code,
            }
        }))
    }

    if (data.body !== undefined)
    {
        data.body.forEach(element => {
            const bodyElementParent = Alzonjs.Create({
                properties:{
                    className:"BlogBodyElementParent"
                }
            });
    
            body.appendChild(bodyElementParent);
    
            element.children.forEach(childElement=>{
                bodyElementParent.appendChild(Alzonjs.Create({
                    properties:{
                        tag:childElement._type,
                        className:"BlogBodyElement",
                        innerHTML:childElement.text,
                    }
                }))
            })
        });
    }

    return body;
}

const CreatePortfolioItem = (params) =>
{
    //tmp
    if (params.id == undefined)
        params.id = "3105207e-7a73-4d84-b0e0-b074c69f983d";

    let endpoint = "https://wnekr0lh.api.sanity.io";

    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        //endpoint = "http://localhost:3333";
    }
    
    // Try and fetch 
    const data ={
        url: `${endpoint}/v2022-03-07/data/query/production?query=*%5B_id+%3D%3D+%22${params.id}%22%5D%5B0%5D&perspective=published`,
        result:undefined,
        listeners:[],
        addListener: function(func){
            this.listeners.push(func);
        },
        hasListener: function(func) {
            return this.listeners.includes(func);
        }
    }
    data.fetchData = function(){
        fetch(this.url)
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            return response.json();
        })
        .then(response => {
            this.listeners.forEach(listener=>{
                listener(response.result);
            })
            this.result = response.result;
        })
        .catch(error => console.error('Error:', error));
    }

    data.fetchData();

    return Alzonjs.Create({
        tag:"div", 
        properties:{
            className:"PortfolioItem",
            onclick: function()
            {
                ModalView.style.display = "block";
                ModalViewAnimator.classList.remove("ModalHidden");
                // Disable scrolling of body when modal is open.
                document.body.style.overflow = "hidden";
                BlogTitle.innerHTML = params.title;
                BlogSummary.innerHTML = params.summary;
                BlogImage.style.backgroundImage = `url(${params.img})`;

                if (params.hideImageInPost)
                {
                    BlogImage.style.display = "none";
                }
                else
                {
                    BlogImage.style.display = "block";
                }

                const dataProcessFunc = (result) =>{
                    BlogBody.innerHTML = '';
                    BlogBody.appendChild(UnpackData(result))
                }

                if (data.result !== undefined) 
                {
                    dataProcessFunc(data.result)
                }

                if (data.hasListener(dataProcessFunc) == false) 
                {
                    data.addListener(dataProcessFunc);
                }
            }
        }, 
        children:[
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className: "PortfolioItemImg",
                    style:`background-image:url(${params.img})`
                }
            }),
            Alzonjs.Create({
                tag: "div", 
                properties:
                {
                    className: "PortfolioItemTitle",
                    innerHTML: params.title,
                }
            }),
            Alzonjs.Create({
                tag: "div", 
                properties:
                {
                    className: "PortfolioItemSummary",
                    innerHTML: params.summary,
                }
            }),
            Alzonjs.Create({
                tag: "div", 
                properties:
                {
                    className: "PortfolioItemTitle PortfolioAuthor",
                    innerHTML: params.author,
                }
            })
        ]
    });
}

const CreateHobbySection = () =>
{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className: "ProfileSection HobbySection"
        },
        children:[
            Alzonjs.Create({
                tag:"section", 
                properties:{
                    //className:"Spikes"
                } 
            }),
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className:"SectionTitle",
                    innerHTML:"Other Projects"
                }
            }),
            Alzonjs.Create({
                tag:"div",
                properties:{
                    className:"PortfolioGridLayout"
                },
                children:[
                    CreatePortfolioItem({
                        title:"Nes Emulator (Control Deck)", 
                        summary:"Nintendo Entertainment System Emulator, partial functionality, no sound. Learnt a lot about the Architecture of these older game systems and how games were built for the platform, as-well as console emulation in general.",
                        author:"Allan",
                        releaseDate:"March 2024", 
                        img:"res/nes.jpg",
                        id: "8d996d2b-66bf-4ed1-9a64-f6b6f7ec4819",
                    }),
                    CreatePortfolioItem({
                        title:"OpenGL Game Engine", 
                        summary: "Systems/ Engine/ Graphics Programming In my spare time I work on a rendering & engine technologies using C++, OpenGL & Vulkan, this is ongoing. I'm hoping to release a LUA game framework based on my work in this area in the coming years",
                        author:"Allan",
                        releaseDate:"March 2024", 
                        img:"res/engine.jpg"
                    }),
                    CreatePortfolioItem({
                        title:"Marching Cubes Unity", 
                        summary: "A demo of marching cubes implemented in unity",
                        author:"Allan",
                        releaseDate:"March 2024", 
                        img:"res/mc.jpg"
                    }),
                    CreatePortfolioItem({
                        title:"Expand Land (96h gamejam)", 
                        summary: "I made expandland with a friend for the GMTK 2024 Jam. Expandland is a short ~15-30 minute puzzle game about expanding the land, where you play as John Expandland. Made in Unity for GMTK2024.  This game was created over a 96 hour period.",
                        author:"Allan(Alzon) & Jole(Noba)",
                        releaseDate:"July 2024", 
                        img:"res/expandland.png"
                    })
                ]
            }),
        ]
    });
}

const CreateProfessionalSection = () =>
{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className: "ProfileSection ProfessionalSection"
        },
        children:[
            Alzonjs.Create({
                tag:"section", 
                properties:{
                    className:"Spikes"
                } 
            }),
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className:"SectionTitle",
                    innerHTML:"Professional Projects"
                }
            }),
            Alzonjs.Create({
                tag:"div",
                properties:{
                    className:"PortfolioGridLayout"
                },
                children:[
                    CreatePortfolioItem({
                        title:"Unearthed VR(Meta Quest)", 
                        summary:"Unearthed is single-player narrative driven VR game where you journey through the vibrant ecosystems of the Amazon and Tongass. I worked as a senior programmer on this project, working collaboratively to build such systems as the sequencing tool we used to build gameplay, the save system, UI, distance grab mechanics, scanning features and other miscellaneous features.",
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/unearthed.jpg",
                        hideImageInPost: true,
                        id:"03236dd8-66dd-4938-bda8-fd4e2513c0d8",
                    }),
                    CreatePortfolioItem({
                        title:"Tate, Landscapes Reimagined(AR iOS)", 
                        summary:"Landscapes Reimagined is an augmented-reality application we developed in collaboration with Tate and Shanghai Museum. The app allows you to explore interactive renditions of artworks and create your own. On this project I worked as a senior programmer working on such systems as the UI/ UI Animation, Navigation & general core mechanics additional to training and integrating our own style transfer models featured in the app using Unity's machine learning addon, Barracuda. The models were trained using digital copies of the original artwork and the open image dataset, It took weeks and much trial and error to train the final models. Due to difficulties running the models on device the feature was sadly restricted to newer handsets.",
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/tate.png",
                        hideImageInPost: true,
                        id:"11fbb670-2f41-42dd-88a8-e4e64f290893",
                    }),
                    CreatePortfolioItem({
                        title:"Green Planet AR Experience(Cloud XR)", 
                        summary: "Green planet is a Cloud XR/ Mobile Ar experience featuring a holographic Sir David Attenborough guiding you on a virtual journey into the BBC series of the same name.On this project I worked as a senior programming, I worked on a mix of gameplay systems, most notably the portal and room alignment on the game side as-well as writing much of the network logic we used to communicate data between the game running on servers on site and the viewer client running on the handset itself. I also integrated media pipe and machine learning models we used for the hand tracking on the experience and wrote the behavioural system used by the butterflies in conjunction with the hand tracking in order to allow for a butterfly to come up and land on the users hand when they were prompted to do so.",
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/greenplanet.jpg",
                        hideImageInPost: true,
                        id:"ec844856-3cf3-4d65-9304-6aefef2ec752",
                    })
                ]
            }),
            Alzonjs.Create({
                tag:"iframe", 
                properties:{
                    className:"VideoPlayer",
                    width:"1280",
                    height:"720",
                    src:"https://www.youtube.com/embed/M3YNmu-Ze3I",
                    title:"The Green Planet AR Experience, powered by EE 5G Showreel Video",
                    frameborder:"0",
                    allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    referrerpolicy:"strict-origin-when-cross-origin",
                    allowfullscreen: true
                }
            }),
            Alzonjs.Create({
                tag:"div",
                properties:{
                    className:"PortfolioGridLayout"
                },
                children:[
                    CreatePortfolioItem({
                        title:"Lost Origin(Magic Leap)", 
                        summary: "Lost Origin is an experience developed by Factory42 with Almedia Theatre and sky in partnership with UK Research and Innovation and the University of Exeter. It features the magic leap headset which enables the user to see creatures moving around and interacting with the physical space in the room. I joined this project when it was nearing completion, I spent my time on the project building on the network logic which included such things as building a front end for the front of house staff to monitor the headsets and coming up with a solution to handle the groups moving through the experience as there was some overlap with the groups moving through the experience.",
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/lostorigin.png",
                        hideImageInPost:true,
                        id:"9142b774-a330-4acd-995a-cab3d4811e33",
                    }),
                    CreatePortfolioItem({
                        title:"Temple of Invention (AR Android)", 
                        summary:"Temple of Invention is an AR mobile experience using Google cloud anchors to align virtual geometry with the Smithsonian American Art Museum, Luce Foundation Centre. The experience features insights into historical American figures as-well as interactive AR gameplay experiences which are based on the building history and some of the patents that were once held there back when it was a patent office.On this project I worked as the Technical Lead as such I was responsible for writing Technical Design Documents and helping build out the core systems of the application with assistance from our Creative Technologist working on the project. ",
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/toi.jpg"
                    }),
                    CreatePortfolioItem({
                        title:"Forza Street(Android/ iOS/ UWP)", 
                        summary:"Forza Street is a one touch mobile racing game developed by Electric Square whilst working for Lionbridge in collaboration with Xbox Studios Quality, I worked as an Software Engineer developing CI/CD and automation tests, as-well as helping Test Engineers by providing scripts and other software to aid in testing. Much of my work as a programmer involved implementing automation tests in C++/ Unreal to test gameplay and setting up build pipelines in TC to automate the deployment and testing of builds on PC as-well as on android and iOS.",
                        author:"Lionbridge/ Xbox",
                        releaseDate:"March 2019", 
                        img:"res/forzastreet.jpg",
                        hideImageInPost:true,
                        id:"576d5900-abea-405d-af99-f5667ce346b4",
                    }),
                    CreatePortfolioItem({
                        title:"Official Formula 1 App", 
                        summary:"The Official Formula 1 App or later known as the Timing app was a mobile application developed by Softpauer that provided such things as, news, live race commentary, 3d maps and timing data for Formula One races in real time. I worked as a software developer on the application between the years of 2016 - 2019 my main responsibilities were building upon and maintaining our in house engine written in C++ and OpenGL ES 2 as-well as implementing new features and UI we were able to control the layout of our GL UIs using XML and through other abstractions in code, during my time here we moved towards more of a hybrid app with many parts of the app being replaced by pages developed using a custom Javascript/ Dom wrapper library. Most of the development was done in xcode though we used android studio and visual studio when implementing native behaviour for Android & UWP respectively. ",
                        author:"Softpauer",
                        releaseDate:"March 2016", 
                        img:"res/f1.png"
                    }),
                    CreatePortfolioItem({
                        title:"BWT App", 
                        summary: "Towards the end of my time at Softpauer I also worked briefly on BWT’s App, It’s a react based mobile application for helping manage BWT’s products and services. It was however still very early days when I left the company.",
                        author:"Softpauer",
                        releaseDate:"March 2016", 
                        img:"res/bwt.jpg"
                    }),
                    CreatePortfolioItem({
                        title:"F1 Live Timing Website", 
                        summary: "As-well as the Formula 1 Application, Softpauer also developed the live timing portion of the F1 website, that similar to the app, provided real time timing data during races. At various points during my time at Softpauer I was tasked with providing various bits of maintenance bug fixes and improvements to the timing on the website.",
                        author:"Softpauer",
                        releaseDate:"March 2016", 
                        img:"res/timing.jpg"
                    })
                ]
            }),
        ]
    })
}

const CreatePageBody = () =>
{
    return Alzonjs.Create({
        tag:"div", 
        properties:{
            className:"PortfolioBodyContainer"
        },
        children:[
            CreateHeroParagraph(),
        ]
    });
}

const portfolio = Alzonjs.Create({
    tag: "div",
    properties:{
        style:"height:50px;",
        //innerHTML: "Hello World",
        className:"PortfolioContainer"
    },
    children:[
        Alzonjs.Create({
            tag:"div", 
            properties:{
                //style:"background-color:black; height: 100px; width:100%;"
            }
        }),
        CreateBanner(),
        CreatePageBody(),
        CreateProfessionalSection(),
        CreateHobbySection(),
        ModalView,
        Alzonjs.Create({
            tag:"div", 
            properties:{
                innerHTML:"Copyright © Allan Moore 2025",
                style:"width:100%; background-color:black; padding:25px;"
            }
        }),
    ],
})

document.body.appendChild(portfolio);
