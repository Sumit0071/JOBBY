import React from 'react';

const JobCard = ( { job, userRole, onApply, onEdit, onDelete } ) => {
    const { _id, date, link, title, description, usersApplied } = job;

    return (
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Job Title */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{new Date( date ).toLocaleDateString()}</p>
            </div>

            {/* Job Description */}
            <div className="px-4 py-2">
                <p className="text-gray-700">{description}</p>
            </div>

            {/* Job Link */}
            <div className="px-4 py-2">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    View Job Details
                </a>
            </div>

            {/* Users Applied */}
            <div className="px-4 py-2 mt-2 border-t">
                <h3 className="text-sm font-medium text-gray-800">Users Applied:</h3>
                {usersApplied.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-600">
                        {usersApplied.map( ( user, index ) => (
                            <li key={index}>
                                {/* Render a user field such as name or _id */}
                                {( user.username ) ? user.username : user._id || 'Unknown User'}
                            </li>
                        ) )}
                    </ul>
                ) : (
                    <p className="text-gray-500">No applications yet.</p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-2 mt-2 flex gap-2">
                <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => onApply( _id )}
                >
                    Apply
                </button>
                {userRole === 'Admin' && (
                    <>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => onEdit( _id )}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => onDelete( _id )}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default JobCard;
