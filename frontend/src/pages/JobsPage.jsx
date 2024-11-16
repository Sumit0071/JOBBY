import React, { useEffect, useState } from 'react';
import {
    getJobs,
    applyForJob,
    updateJob,
    deleteJob,
} from '../api/jobApi';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editJob, setEditJob] = useState(null); // Manage editing state
    const [updatedJobData, setUpdatedJobData] = useState({
        title: '',
        link: '',
        description: '',
    });
    const { user } = useAuth();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await getJobs(token);
                setJobs(response.data);
            } catch (err) {
                setError('Failed to fetch jobs.');
            } finally {
                setLoading(false);
            }
        };

        if (user && token) fetchJobs();
    }, [user, token]);

    const handleApply = async (jobId) => {
        try {
            await applyForJob(jobId, token);
            alert('Applied successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to apply.');
        }
    };

    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId, token);
            setJobs(jobs.filter((job) => job._id !== jobId));
            alert('Job deleted successfully.');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete.');
        }
    };

    const handleEdit = (job) => {
        // Set the job to be edited and fill the form with its current data
        setEditJob(job);
        setUpdatedJobData({
            title: job.title,
            link: job.link,
            description: job.description,
        });
    };

    const handleUpdateJob = async (e) => {
        e.preventDefault();
        try {
            await updateJob(editJob._id, updatedJobData, token);
            alert('Job updated successfully!');
            setJobs(
                jobs.map((job) =>
                    job._id === editJob._id ? { ...job, ...updatedJobData } : job
                )
            );
            setEditJob(null); // Close the edit form
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedJobData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-8">
            {/* Edit Job Form */}
            {editJob && (
                <form
                    onSubmit={handleUpdateJob}
                    className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Edit Job
                    </h2>
                    <input
                        type="text"
                        name="title"
                        value={updatedJobData.title}
                        onChange={handleChange}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Job Title"
                        required
                    />
                    <input
                        type="text"
                        name="link"
                        value={updatedJobData.link}
                        onChange={handleChange}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Job Link"
                        required
                    />
                    <textarea
                        name="description"
                        value={updatedJobData.description}
                        onChange={handleChange}
                        className="border p-2 w-full mb-4 rounded"
                        placeholder="Job Description"
                        rows="4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Update Job
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditJob(null)}
                        className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {/* Job Cards */}
            <div className="grid gap-6">
                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        userRole={user.role}
                        onApply={handleApply}
                        onEdit={() => handleEdit(job)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
