
// Centralized API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

// Helper to handle responses and throw specific backend errors
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
};

// Check for mixed content issues (HTTPS frontend calling HTTP backend)
if (typeof window !== 'undefined' && window.location.protocol === 'https:' && API_BASE_URL.startsWith('http:')) {
  console.warn("Security Warning: You are accessing an insecure backend (HTTP) from a secure frontend (HTTPS). Browsers may block this connection due to Mixed Content policies.");
}

export const api = {
  // --- 1. Contact Form ---
  submitContact: async (data: { name: string; email: string; type: string; message: string }) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // --- 2. Careers Application ---
  submitApplication: async (data: { name: string; email: string; resumeLink: string; coverLetter: string; jobRole: string }) => {
    const res = await fetch(`${API_BASE_URL}/careers/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // --- 3. AI Labs Partnership ---
  submitPartnership: async (data: { collegeName: string; email: string; phone: string }) => {
    const res = await fetch(`${API_BASE_URL}/academy/partnership`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // --- 4. Showcase Projects ---
  getProjects: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return await res.json();
    } catch (error) {
      // Silent fallback
      return null;
    }
  },

  createProject: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // --- 5. Events ---
  getEvents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return await res.json();
    } catch (error) {
      // Silent fallback
      return null;
    }
  },

  createEvent: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // --- 6. Jobs/Vacancies ---
  getJobs: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/vacancies`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      return await res.json();
    } catch (error) {
      // Silent fallback
      return null;
    }
  },

  createVacancy: async (data: { title: string; location: string; type: string; description: string; requirements: string[] }) => {
    const res = await fetch(`${API_BASE_URL}/vacancies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  }
};
