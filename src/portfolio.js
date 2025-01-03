

const Alzonjs =
{
    Create(obj)
    {
        const element = document.createElement(obj.tag);

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

const CreateLink = () =>
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
                    className:"LinkedInImg",
                    src:"./res/LI-In-Bug.png"
                }
            }),
            Alzonjs.Create({
                tag:"div",
                properties:{
                    className:"LinkText",
                    innerHTML:"https://www.linkedin.com/in/allan-moore/"
                }
            }),
        ]
    })
}

const CreateHeader = () =>
{
    return Alzonjs.Create({
        tag: "div",
        properties:{
            className:"HeaderContainer",
        },
        children:[
            Alzonjs.Create({
                tag:"div", 
                properties:{
                    className:"AlzonHeader",
                    innerHTML:"Allan Moore, Programmer, OpenGL, C++, C#, Unity",
                }
            }), 
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
                    CreateLink()
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
        tag:"div", 
        properties:{
            className:"ProfileText",
            innerHTML:"I am a skilled developer with a passion for computer graphics, network programming, and game engines. My expertise includes 3D rendering and visualization using OpenGL, as well as game development and I have extensive experience working in Unity and I have also dabbled a fair bit in unreal during my professional career whilst working at Lionbridge with the Xbox Quality team, though admittedly a little rusty not having touched in the engine in a couple of years now. Additionally, I have contributed to the network logic for various projects, including designing and building network systems for the on site experiences I’ve developed as part of my current position as-well as tools I’ve developed during my professional career and personal dabbling’s with network programming and photon PUN,BOLT & FUSION, I’ve continued to develop my knowledge in these areas since I developed the Homebrew application PSVPAD(which uses TCP for communication) 12 years ago during my academic studies which was one of my earliest dabbling’s with network programming. Though maths isn’t my strongest skill I have successfully developed my own physically based rendering engine with deferred lighting, shadow maps, PBR texture support and Post Processing effects such as SSAO and Bloom which I am extremely proud even though it’s still far away from being a commercially viable product or any commercially viable game that might come out of it. I am a dedicated and passionate developer, always seeking new challenges and opportunities to apply my skills and knowledge, But I also suffer from a debilitating anxiety disorder so go easy on me."
        }
    });
}

const CreatePortfolioItem = (params) =>
{
    return Alzonjs.Create({
        tag:"div", 
        properties:{
            className:"PortfolioItem"
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
                    className: "PortfolioItemTitle PortfolioAuthor",
                    innerHTML: params.author,
                }
            })
        ]
    });
}

const CreatePortfolioItems = () =>
{
    return Alzonjs.Create({
        tag:"div",
        properties:{
            className: "ProfileSection-Professional"
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
                    innerHTML:"Professional Work"
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
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/unearthed.jpg"
                    }),
                    CreatePortfolioItem({
                        title:"Tate, Landscapes Reimagined(AR iOS)", 
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/tate.png"
                    }),
                    CreatePortfolioItem({
                        title:"Green Planet AR Experience(Cloud XR)", 
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/greenplanet.jpg"
                    })
                ]
            }),
            Alzonjs.Create({
                tag:"iframe", 
                properties:{
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
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/lostorigin.png"
                    }),
                    CreatePortfolioItem({
                        title:"Temple of Invention, Smithsonian(AR Android)", 
                        author:"Factory 42",
                        releaseDate:"March 2024", 
                        img:"res/toi.jpg"
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
                //innerHTML:"Holy Smokes Batman!",
                style:"width:100%;"
            }
        }),
        Alzonjs.Create({
            tag:"div", 
            properties:{
                style:"background-color:black; height: 100px; width:100%;"
            }
        }),
        CreateBanner(),
        CreatePageBody(),
        CreatePortfolioItems(),
    ],
})

document.body.appendChild(portfolio);
