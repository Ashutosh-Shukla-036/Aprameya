import React from "react";

const About: React.FC = () => {
    return (
        <div className="bg-charcoal-metallic-dark min-h-screen text-white">
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-5xl font-bold text-yellow-400 text-center mb-8">
                    About Aprameya Productions
                </h2>
                <div className="flex flex-col items-center space-y-8">
                    <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto">
                        Welcome to Aprameya Productions, where stories find their soul and creativity takes center stage. Driven by a passion for storytelling and a commitment to excellence, we craft visually stunning and emotionally resonant content that connects with audiences on a deeper level.
                    </p>
                </div>

                <div className="space-y-12 mt-12">
                    <h3 className="text-4xl font-semibold text-yellow-400 text-center">Our Vision</h3>
                    <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
                        At Aprameya Productions, we believe every story is worth telling. Our mission is to create thought-provoking films and content that inspire, entertain, and leave a lasting impact. We aim to deliver experiences that resonate emotionally, creatively, and intellectually with our audiences.
                    </p>

                    <h3 className="text-4xl font-semibold text-yellow-400 text-center">Our Story</h3>
                    <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
                        Established on September 11, 2023, Aprameya Productions was born from a group of five friends: Abhinav Gadde, Abhinav PV, Ajitesh Kumara, Abhishek A, and Ashutosh Shukla. Initially known as Locus Productions, the name was changed to Aprameya Productions to better reflect the creative vision of the team. Our debut film, "Safe Space," was released on December 11, 2023, marking the beginning of an exciting journey.
                    </p>
                    <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
                        The production house has since grown with the addition of our sixth member, Sai Kiran, who joined the team to contribute to the growing success of Aprameya Productions. Together, all six of us work both in front of and behind the camera, bringing our diverse talents and perspectives to each project we create.
                    </p>

                    <h3 className="text-4xl font-semibold text-yellow-400 text-center">What We Do</h3>
                    <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
                        From heartfelt short films to engaging digital narratives, Aprameya Productions specializes in turning unique ideas into cinematic experiences. Our team manages every stage of production, ensuring that every frame captures the essence of the story.
                    </p>

                    <h3 className="text-4xl font-semibold text-yellow-400 text-center">Why Choose Us</h3>
                    <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
                        With a year of experience producing acclaimed short films on YouTube, including notable projects like "Safe Space" and "Love As We Know It," Aprameya Productions is dedicated to pushing creative boundaries. We bring a fresh perspective, blending innovative techniques with authentic storytelling to deliver powerful visual experiences.
                    </p>

                    <h3 className="text-4xl font-semibold text-yellow-400 text-center">Let’s Create Together</h3>
                    <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
                        At Aprameya Productions, we’re always looking to collaborate with passionate storytellers, brands, and visionaries. Whether it’s a film, commercial, or creative project, we’re here to bring your vision to life with artistry and dedication. Let’s work together to create something unforgettable.
                    </p>
                </div>
            </section>

            {/* Developer & Skills Section */}
            <section className="bg-gray-900 p-8 rounded-lg max-w-6xl mx-auto mb-12 shadow-xl">
                <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
                    Meet the Developer
                </h2>
                <div className="flex flex-col items-center space-y-6 md:space-x-10">
                    <div className="text-center">
                        <p className="text-lg text-gray-300 mb-4">
                            I am <strong>Ashutosh Shukla</strong>, a passionate tech enthusiast and the creator of <strong>Aprameya Productions Website</strong>. Currently, I am pursuing my Bachelor’s degree in Computer Science Engineering (CSE) from <strong>CMR Institute of Technology (CMRIT)</strong>. My journey in the tech world is fueled by a desire to create impactful products that simplify people's lives and make digital solutions accessible to everyone.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-300 mb-4">Background</h3>
                        <p className="text-lg text-gray-300 mb-4">
                            As a CSE student at CMRIT, I have gained a solid foundation in software development, algorithms, and data structures. My education has equipped me with the skills to tackle real-world problems through technology. I actively seek opportunities to apply my knowledge through various projects and internships, enhancing my practical experience alongside my academic pursuits.
                        </p>
                    </div>
                    <div className="flex-1 mt-8 md:mt-0 text-center">
                        <h3 className="text-2xl font-semibold text-gray-300 mb-4">Skills</h3>
                        <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Full-Stack Development:</strong> Proficient in both front-end and back-end technologies, enabling me to build robust applications from the ground up.</li>
                            <li><strong>User Experience (UX) Design:</strong> I prioritize user-centric design, focusing on creating engaging and accessible interfaces.</li>
                            <li><strong>Problem-Solving:</strong> I enjoy tackling complex challenges and finding effective solutions that enhance user experiences.</li>
                            <li><strong>Collaboration:</strong> I value teamwork and actively engage with other developers and stakeholders to bring projects to life.</li>
                        </ul>

                        <h4 className="text-xl font-semibold text-gray-300 mb-4">My Vision</h4>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                            I aim to continuously learn and grow in the tech field, exploring new technologies and methodologies that can help me create better products. My goal is to develop applications that not only solve real-world problems but also empower users to manage their finances with confidence.
                        </p>

                        <h4 className="text-xl font-semibold text-gray-300 mb-4">Let's Connect!</h4>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            I am always open to collaboration and networking with like-minded individuals. If you're interested in working together or just want to connect, feel free to reach out!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
