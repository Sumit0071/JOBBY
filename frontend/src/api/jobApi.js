import axios from 'axios';

const BaseUrl = import.meta.env.VITE_BACKEND_URL;

export const getJobs = async (token) => {
    return axios.get(`${BaseUrl}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createJob = async (jobData, token) => {
    return axios.post(`${BaseUrl}/api/jobs`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const applyForJob = async (jobId, token) => {
    return axios.post(`${BaseUrl}/api/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateJob = async (jobId, jobData, token) => {
    return axios.post(`${BaseUrl}/api/jobs/${jobId}/`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteJob = async (jobId, token) => {
    return axios.post(`${BaseUrl}/api/jobs/${jobId}/delete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
