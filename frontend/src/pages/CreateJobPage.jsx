import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createJob } from '../api/jobApi';
import { useNavigate } from 'react-router-dom'; // Use Navigate hook for redirection

export default function CreateJobPage() {
    const [jobData, setJobData] = useState({
        link: '',
        title: '',
        description: '',
    });
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Corrected from `Navigate` to `useNavigate`

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(typeof token);
        try {
            await createJob(jobData, token);
            alert('Job created successfully!');
            navigate('/jobs');
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Create a New Job
                </h2>
                <p className="text-center text-sm text-gray-500 mb-4">
                    Fill in the details below to create a new job posting.
                </p>
                <div className="text-center text-sm text-gray-400 mb-3">
                    See the listed jobs{' '}
                    <a href="/jobs" className="underline text-blue-600">
                        Available Jobs
                    </a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
                                Job Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={jobData.title}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter job title"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="link" className="block text-sm font-semibold text-gray-600">
                                Job Link
                            </label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={jobData.link}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter job link"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-600">
                                Job Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={jobData.description}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Provide a detailed job description"
                                rows="4"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300"
                            >
                                Create Job
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
