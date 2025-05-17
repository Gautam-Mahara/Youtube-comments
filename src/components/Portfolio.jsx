import './portfolio.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Foot from './smallComponents/foot';
import Socials from './smallComponents/Socials';
import Sidebar from './smallComponents/Sidebar';

const Portfolio = () => {
    const [isDark, setIsDark] = useState(false);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const projectsContainerRef = useRef(null);
    const titleobserver = useRef(null);
    const projects = [
        {
            title: 'YouTube Comment Analysis',
            description: 'Analyzes YouTube comments using TextBlob to gauge sentiment.',
            demoLink: '/analyzer',
            githubLink: 'https://github.com/Gautam-Mahara/Youtube-comments-backend',
        },
        {
            title: 'Safe Secure',
            description: 'A User Authentication System using JWT and Bcrypt. It is a Flask based project. it is a simple project to understand the basics of JWT and Bcrypt. it also provide facility of otp verification.',
            demoLink: '/project2',
            githubLink: 'https://github.com/Gautam-Mahara/Login',
        },
        {
            title: 'Pdf Editor',
            description: 'To Counter Simple daily life problems like editing pdfs, I have created a pdf editor using python. It is a simple project to understand the basics of pdf editing. it also provide facility of merging pdfs and converting pdfs to images vice versa.',
            demoLink: '/pdfHome',
            githubLink: 'https://github.com/Gautam-Mahara/project3',
        },
        {
            title: 'CharBot',
            description: 'CharBot is a simple chatbot that can chat with you. it is a simple project to understand the basics of chatbots. it also provide facility of voice chat.',
            demoLink: '/Gpt',
            githubLink: ''
        }
    ];
    const [currentInd, setCurrentInd] = useState(0);
    const handlePrev = () => {
        setCurrentInd((prev) => {
            if (prev === 0) {
                return projects.length - 1;
            } else {
                return prev - 1;
            }
        });
    
    };
    const handleNext = () => {
        setCurrentInd((prev) => {

            if (prev === projects.length - 1) {
                return 0;
            } else {
                return prev + 1;
            }
        });
    };

    // Function to scroll left
    const scrollLeft = () => {
        projectsContainerRef.current.scrollBy({
            left: -300, // Adjust scroll distance as needed
            behavior: 'smooth',
        });
    };

    // Function to scroll right
    const scrollRight = () => {
        projectsContainerRef.current.scrollBy({
            left: 300, // Adjust scroll distance as needed
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            },
            { threshold: 0.5 } // Adjusts when to trigger animation (50% visibility)
        );
        const observer2 = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-animate');
                    // entry.target.classList.add('title-animate');
                    observer2.unobserve(entry.target); // Stop observing once animated
                }
            },
            { threshold: 1 } // Adjusts when to trigger animation (50% visibility)
        );

        const tileobserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-animate');
                    tileobserver.unobserve(entry.target); // Stop observing once animated
                }
            },
            { threshold: 1 } // Adjusts when to trigger animation (50% visibility)
        );
        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }
        if(projectsRef.current){
            observer2.observe(projectsRef.current);
        }
        if(titleobserver.current){
            tileobserver.observe(titleobserver.current);
        }
        return () =>{ observer.disconnect();
            observer2.disconnect();
            tileobserver.disconnect();
        };
    }, []);


    return (
        <>
            <div className='mid-section p-5 '>
                <div className='mid-section-inner'>
                    <h1 className='text-5xl font-bold name'>Gautam Singh Mahara</h1>
                    <div className='flex flex-row justify-between gap-4'>

                        <h1 className='btn-contact first'>
                            <Link to='/contact'><i className='fab fa-phone mr-2'></i> Contact</Link>
                        </h1>

                        <h1 className='btn-contact down'>
                            <a href="https://www.linkedin.com/in/gautam-singh-613648223/" target='_blank'>
                                <i className="fab fa-linkedin mr-2"></i>LinkedIn
                            </a>
                        </h1>

                        <h1 className='btn-contact down'>
                            <a href="https://instagram.com" target='_blank'>
                                <i className="fab fa-instagram mr-2"></i>Instagram
                            </a>
                        </h1>

                        <h1 className='btn-contact down'>
                            <a href="https://github.com" target='_blank'>
                                <i className="fab fa-github mr-2"></i>Github
                            </a>
                        </h1>

                        <h1 className='btn-contact second'>
                            <a href="mailto:gautam.gs712@gmail.com" target='_blank'>
                                <i className="fas fa-envelope mr-2"></i>Email
                            </a>
                        </h1>

                    </div>
                </div>
            </div>
            <div ref={aboutRef} className='about-me bg-blue-600 '>
                <h1 className='text-8xl'>About Me</h1>
                <p className='text-lg mx-auto  max-w-xl mt-4'>
                    I am Gautam Singh Mahara, a Computer Science Student from Graphic Era Hill University, Dehradun.
                </p>
                <p className='text-lg mx-auto max-w-xl mt-4'>
                    I have been programming since my 3rd semester. Currently, I know Python, C++, and Kotlin.
                </p>
                <h1 className=' mx-auto bg-yellow-500 ring-emerald-300'><Link to='/contact'> Read More</Link></h1>
            </div>
            {/* PROJECTS SECTION */}
            <div className='projects-section bg-blue-500'>
                <h1 ref={titleobserver} className='text-7xl title'>Projects</h1>
                <div ref={projectsContainerRef} className="scroll-container">
                <button onClick={handlePrev} className="carousel-button left-button">❮</button>
                    
                    <div ref={projectsRef} className="project-card m-auto">
                        <h1>{projects[currentInd].title}</h1>
                        <p>
                            {projects[currentInd].description}    
                        </p>
                        
                        <Link to={projects[currentInd].demoLink}>Hello</Link>
                        <h1><a href={projects[currentInd].githubLink}>Github Link</a></h1>
                    </div>
                     <button onClick={handleNext} className="carousel-button right-button">❯</button>
                   
                </div>
            </div>
            {/* <Foot /> */}
        </>
    );
}

export default Portfolio;
