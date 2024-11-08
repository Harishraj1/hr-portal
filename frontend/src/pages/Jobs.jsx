import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Loader, baseURL } from '../components/utils';
import axios from 'axios';

export default function Jobs() {
    const navigate = useNavigate();
    const [jobsList, setJobsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [workplaceFilter, setWorkplaceFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    useEffect(() => {
        // Fetch jobs from the backend API
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${baseURL}/accounts/jobs/recent`);
                setJobsList(response.data);
            } catch (error) {
                console.error("Error fetching jobs data:", error);
            }
        };
        fetchJobs();
    }, []);

    // Filter jobs based on search term and filter criteria
    const filteredJobs = jobsList.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (job.title.toLowerCase().includes(searchLower) || 
             job.location.toLowerCase().includes(searchLower) || 
             job.type.toLowerCase().includes(searchLower) || 
             job.description.toLowerCase().includes(searchLower)) &&
            (locationFilter ? job.location.toLowerCase() === locationFilter.toLowerCase() : true) &&
            (workplaceFilter ? job.workplace.toLowerCase() === workplaceFilter.toLowerCase() : true) &&
            (departmentFilter ? job.department.toLowerCase() === departmentFilter.toLowerCase() : true) &&
            (titleFilter ? job.title.toLowerCase().includes(titleFilter.toLowerCase()) : true)
        );
    });

    // Get current jobs for pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Total pages for pagination
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    return (
        <div>
            <nav className="bg-[#FDC500] flex justify-between items-center w-full text-xl font-semibold py-4 px-10">
                <div className="flex gap-8">
                    <p onClick={() => navigate('/home')} className="cursor-pointer hover:text-[#171C3C]">Home</p>
                    <p onClick={() => navigate('/jobs')}  className="cursor-pointer hover:text-[#171C3C]">Jobs</p>
                    <p className="cursor-pointer hover:text-[#171C3C]">Contact us</p>
                </div>
                <div>
                     <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-[#171C3C]">Profile</p>
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

            {/* Filters Section */}
            <div className="px-28 py-4 flex gap-4">
                <select onChange={(e) => setLocationFilter(e.target.value)} className="p-3 border rounded-lg">
                    <option value="">All Locations</option>
                    <option value="Remote">Remote</option>
                    <option value="New York">New York</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Banglore">Banglore</option>
                </select>

                <select onChange={(e) => setWorkplaceFilter(e.target.value)} className="p-3 border rounded-lg">
                    <option value="">All Workplaces</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                </select>

                <select onChange={(e) => setDepartmentFilter(e.target.value)} className="p-3 border rounded-lg">
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>

                <select onChange={(e) => setTitleFilter(e.target.value)} className="p-3 border rounded-lg">
                    <option value="">All Titles</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                </select>
            </div>

            {/* Jobs Grid */}
            <div className="px-28 py-6">
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {currentJobs.map(job => (
                        <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-[#171C3C] mb-3">{job.title}</h3>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">{job.location}</span>
                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{job.workplace}</span>
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
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-6 py-3 rounded ${currentPage === index + 1 ? 'bg-[#171C3C] text-white' : 'bg-[#FDC500]'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
