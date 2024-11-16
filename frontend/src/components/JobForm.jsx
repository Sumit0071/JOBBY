import React, { useState } from 'react';

const JobForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!title || !description || !link) {
            setError('All fields are required.');
            return;
        }

        try {
            const newJob = { title, description, link };
            await onSubmit(newJob); // Calls the parent function to handle submission
            setSuccessMessage('Job created successfully!');
            setTitle('');
            setDescription('');
            setLink('');
        } catch (err) {
            setError('Failed to create job. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">Create Job</h2>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Job Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter job title"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Job Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter job description"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Job Link</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter job link"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Create Job
                </button>
            </form>
        </div>
    );
};

export default JobForm;
