import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

export default function Jobs() {
    const navigate = useNavigate();

    // Sample job data
    const jobsList = [
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
        },
        {
            id: 7,
            title: "Data Scientist",
            description: "Apply machine learning and statistical analysis to solve complex problems.",
            location: "Chicago",
            type: "Full-time"
        },
        {
            id: 8,
            title: "QA Engineer",
            description: "Ensure software quality through automated and manual testing.",
            location: "Austin",
            type: "Contract"
        },
        {
            id: 9,
            title: "Technical Writer",
            description: "Create clear and comprehensive technical documentation.",
            location: "Remote",
            type: "Part-time"
        },
        {
            id: 10,
            title: "Systems Architect",
            description: "Design and implement scalable system architectures.",
            location: "Washington DC",
            type: "Full-time"
        },
        {
            id: 11,
            title: "Cloud Engineer",
            description: "Manage and optimize cloud infrastructure and services.",
            location: "Denver",
            type: "Full-time"
        },
        {
            id: 12,
            title: "Security Engineer",
            description: "Protect our systems and data through security best practices.",
            location: "Remote",
            type: "Full-time"
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    // Filter jobs based on search term
    const filteredJobs = jobsList.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        return (
            job.title.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower) ||
            job.type.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower)
        );
    });

    // Get current jobs for pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    return(
        <div>
            <nav className="bg-[#FDC500] flex justify-between items-center w-[100%] text-xl font-semibold py-4 px-10">
                <div className="flex gap-8">
                    <p onClick={() => navigate('/home')} className="cursor-pointer hover:text-[#171C3C]">Home</p>
                    <p onClick={() => navigate('/jobs')}  className="cursor-pointer hover:text-[#171C3C]">Jobs</p>
                    <p className="cursor-pointer hover:text-[#171C3C]">Profile</p>
                </div>
                <div>
                     <p className="cursor-pointer hover:text-[#171C3C]">Contact us</p>
                </div>
            </nav>

            {/* Search Section */}
            <div className="px-28 py-6">
                <input
                    type="text"
                    placeholder="Search jobs by title, location, or type..."
                    className="w-full p-3 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Jobs Grid */}
            <div className="px-28 py-6">
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {currentJobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-[#171C3C] mb-3">{job.title}</h3>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">{job.location}</span>
                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{job.type}</span>
                                </div>
                                <button className="bg-[#FDC500] text-[#171C3C] px-4 py-2 rounded font-semibold hover:bg-[#171C3C] hover:text-white transition duration-300">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12 gap-4">
                    <button 
                        onClick={() => setCurrentPage(1)}
                        className={`px-6 py-3 rounded ${currentPage === 1 ? 'bg-[#171C3C] text-white' : 'bg-[#FDC500]'}`}
                    >
                        1
                    </button>
                    <button 
                        onClick={() => setCurrentPage(2)}
                        className={`px-6 py-3 rounded ${currentPage === 2 ? 'bg-[#171C3C] text-white' : 'bg-[#FDC500]'}`}
                    >
                        2
                    </button>
                </div>
            </div>
            {/* applied jobs */}
            <div className="bg-gray-50 px-28 py-16">
                <h2 className="text-4xl font-bold text-[#171C3C] mb-12">Applied Jobs</h2>
                <div className="grid grid-cols-3 gap-6">
                    {/* Applied Job Card 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-[#171C3C]">Frontend Developer</h3>
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Applied</span>
                        </div>
                        <p className="text-gray-600 mb-4">Build modern web applications using React, Redux and TypeScript.</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">Remote</span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Full-time</span>
                            </div>
                            <p className="text-sm text-gray-500">Applied on: 15 Oct 2023</p>
                        </div>
                    </div>

                    {/* Applied Job Card 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-[#171C3C]">UX Designer</h3>
                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">Under Review</span>
                        </div>
                        <p className="text-gray-600 mb-4">Create user-centered designs for web and mobile applications.</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">San Francisco</span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Contract</span>
                            </div>
                            <p className="text-sm text-gray-500">Applied on: 12 Oct 2023</p>
                        </div>
                    </div>

                    {/* Applied Job Card 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-[#171C3C]">Backend Developer</h3>
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Interview</span>
                        </div>
                        <p className="text-gray-600 mb-4">Develop scalable backend services using Node.js and MongoDB.</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">New York</span>
                                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Full-time</span>
                            </div>
                            <p className="text-sm text-gray-500">Applied on: 10 Oct 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}  
