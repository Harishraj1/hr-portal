import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in by looking for access token
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        navigate('/');
    };

    // Sample job data - in production this would come from MongoDB
    const jobs = [
        {
            id: 1,
            title: "Senior Frontend Developer", 
            description: "Join our team to build amazing user experiences using React and modern web technologies.",
            location: "Remote",
            type: "Full-time"
        },
        {
            id: 2,
            title: "Backend Engineer",
            description: "Help scale our infrastructure and build robust APIs using Node.js and MongoDB.",
            location: "New York", 
            type: "Full-time"
        },
        {
            id: 3,
            title: "UI/UX Designer",
            description: "Create beautiful and intuitive designs for our web and mobile applications.",
            location: "San Francisco",
            type: "Contract"
        },
        {
            id: 4,
            title: "DevOps Engineer",
            description: "Manage our cloud infrastructure and implement CI/CD pipelines.",
            location: "Remote",
            type: "Full-time"
        },
        {
            id: 5,
            title: "Product Manager",
            description: "Drive product strategy and work closely with engineering teams.",
            location: "Boston",
            type: "Full-time"
        },
        {
            id: 6,
            title: "Mobile Developer",
            description: "Build native mobile applications for iOS and Android platforms.",
            location: "Seattle",
            type: "Full-time"
        }
    ];

    return (
        <div>
            <nav className="bg-[#FDC500] flex justify-between items-center w-[100%] text-xl font-semibold py-4 px-10">
                <div className="flex gap-8">
                    <p onClick={() => navigate('/')} className="cursor-pointer hover:text-[#171C3C]">Home</p>
                    <p onClick={() => isLoggedIn ? navigate('/jobs') : navigate('/login')} className="cursor-pointer hover:text-[#171C3C]">Jobs</p>
                    {isLoggedIn && (
                            <p className="cursor-pointer hover:text-[#171C3C]">Contact us</p>
                    )}
                </div>
                <div className="flex gap-4">
                    {isLoggedIn ? (
                        <>
                            <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-[#171C3C]">Profile</p>
                            <button 
                                onClick={handleLogout}
                                className="bg-[#171C3C] text-white px-4 py-1 rounded hover:bg-[#2a305e] transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => navigate('/login')} 
                                className="bg-[#171C3C] text-white px-4 py-1 rounded hover:bg-[#2a305e] transition duration-300"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/register')}
                                className="bg-white text-[#171C3C] px-4 py-1 rounded hover:bg-gray-100 transition duration-300"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* hero section */}
            <div className="bg-white flex justify-between items-center gap-10 py-20 px-10">
                <div className="w-[60%]">
                    <h1 className="text-6xl font-bold text-[#171C3C] mb-6">Find Your Dream Job Today</h1>
                    <p className="text-xl text-gray-600 mb-8">Discover thousands of job opportunities with all the information you need. Its your future.</p>
                    <button className="bg-[#FDC500] text-[#171C3C] px-8 py-3 rounded-lg font-semibold hover:bg-[#171C3C] hover:text-white transition duration-300">
                        Search Jobs
                    </button>
                </div>
                <div className="w-[40%]">
                    <img src="https://img.freepik.com/free-vector/recruitment-process-concept-illustration_114360-5146.jpg"
                        alt="Job Search Illustration"
                        className="w-full rounded-lg shadow-xl"
                    />
                </div>
            </div>

            {/* DND video */}
            <div className="bg-gray-100 mt-10 h-[500px] overflow-hidden flex items-center justify-center">
                <h1>DND video</h1>
            </div>

            {/* job status */}
            <div className="bg-white py-40 px-10">
                <h2 className="text-4xl font-bold text-[#171C3C] text-center mb-12">Application Status</h2>
                <div className="flex items-center justify-center">
                    <div className="flex items-center">
                        {/* First Status */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#FDC500] rounded-full flex items-center justify-center">
                                <i className="fas fa-file-alt text-2xl text-[#171C3C]"></i>
                            </div>
                            <p className="mt-2 font-semibold">Applied</p>
                        </div>

                        {/* Connecting Line */}
                        <div className="w-32 h-[2px] bg-gray-300 mx-4"></div>

                        {/* Second Status */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <i className="fas fa-user-check text-2xl text-gray-500"></i>
                            </div>
                            <p className="mt-2 font-semibold text-gray-500">Under Review</p>
                        </div>

                        {/* Connecting Line */}
                        <div className="w-32 h-[2px] bg-gray-300 mx-4"></div>

                        {/* Third Status */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <i className="fas fa-phone text-2xl text-gray-500"></i>
                            </div>
                            <p className="mt-2 font-semibold text-gray-500">Interview</p>
                        </div>

                        {/* Connecting Line */}
                        <div className="w-32 h-[2px] bg-gray-300 mx-4"></div>

                        {/* Fourth Status */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <i className="fas fa-check-circle text-2xl text-gray-500"></i>
                            </div>
                            <p className="mt-2 font-semibold text-gray-500">Accepted</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* job listings */}
            <div className="bg-gray-50 py-16 px-32">
                <h2 className="text-4xl font-bold text-[#171C3C] text-center mb-12">Recent Jobs</h2>
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-lg py-10 shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-[#171C3C] mb-3">{job.title}</h3>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">{job.location}</span>
                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{job.type}</span>
                                </div>
                                <button 
                                    onClick={() => !isLoggedIn && navigate('/login')}
                                    className="bg-[#FDC500] text-[#171C3C] px-4 py-2 rounded font-semibold hover:bg-[#171C3C] hover:text-white transition duration-300">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button
                        onClick={() => isLoggedIn ? navigate('/jobs') : navigate('/login')}
                        className="bg-[#171C3C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FDC500] hover:text-[#171C3C] transition duration-300">
                        View More Jobs
                    </button>
                </div>
            </div>

            {/* why this app */}
            <div className="text-center py-24 px-10">
                <h2 className="text-4xl font-bold text-[#171C3C]">Why SNS bhaiyaa? 🤔</h2>
            </div>

            {/* Newsletter Cards */}
            <div className="bg-gray-50 py-16 px-10">
                <h1 className="mb-10">Testimonial</h1>
                <div className="grid grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl text-[#FDC500] mb-4">
                            <i className="fas fa-newspaper"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-[#171C3C] mb-4">Latest Industry Trends</h3>
                        <p className="text-gray-600 mb-6">Stay updated with the newest developments and opportunities in the tech industry. Get weekly insights delivered to your inbox.</p>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-arrow-right text-[#FDC500]"></i>
                            <span className="text-[#171C3C] font-semibold">Read More</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl text-[#FDC500] mb-4">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-[#171C3C] mb-4">Career Tips & Advice</h3>
                        <p className="text-gray-600 mb-6">Expert guidance on resume building, interview preparation, and career advancement strategies. Level up your professional game.</p>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-arrow-right text-[#FDC500]"></i>
                            <span className="text-[#171C3C] font-semibold">Read More</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition duration-300">
                        <div className="text-5xl text-[#FDC500] mb-4">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-[#171C3C] mb-4">Market Insights</h3>
                        <p className="text-gray-600 mb-6">Deep dive into salary trends, in-demand skills, and emerging job markets. Make informed decisions about your career path.</p>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-arrow-right text-[#FDC500]"></i>
                            <span className="text-[#171C3C] font-semibold">Read More</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <div className="bg-[#171C3C] text-white py-12">
                <div className="container mx-auto px-10">
                    <div className="grid grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">About Us</h4>
                            <p className="text-gray-300 mb-4">We help job seekers find their dream careers and companies find great talent.</p>
                            <div className="flex space-x-4">
                                <i className="fab fa-facebook-f cursor-pointer hover:text-[#FDC500]"></i>
                                <i className="fab fa-twitter cursor-pointer hover:text-[#FDC500]"></i>
                                <i className="fab fa-linkedin-in cursor-pointer hover:text-[#FDC500]"></i>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-[#FDC500]">Home</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-[#FDC500]">About</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-[#FDC500]">Jobs</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-[#FDC500]">Contact</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-phone"></i>
                                    <span className="text-gray-300">+1 234 567 890</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-envelope"></i>
                                    <span className="text-gray-300">info@example.com</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span className="text-gray-300">123 Street, City, Country</span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
                            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates</p>
                            <div className="flex">
                                <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800" />
                                <button className="bg-[#FDC500] text-[#171C3C] px-4 py-2 rounded-r-lg hover:bg-yellow-400">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-300">&copy; 2023 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}