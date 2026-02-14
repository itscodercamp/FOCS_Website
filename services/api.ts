// Centralized API Configuration
const getBaseUrl = () => {
  // Use environment variable if provided
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  // Automatically detect environment
  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    // Development fallback
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      return 'http://localhost:8000/api';
    }
    // Production fallback: Use sub-domain with same protocol as frontend (prevents mixed-content)
    return `${protocol}//apis.focsit.in/api`;
  }
  return 'https://apis.focsit.in/api';
};

const API_BASE_URL = getBaseUrl();

// Helper to handle responses and throw specific backend errors
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
};

// Check for mixed content issues
if (typeof window !== 'undefined' && window.location.protocol === 'https:' && API_BASE_URL.startsWith('http:')) {
  console.warn("Security Warning: You are accessing an insecure backend (HTTP) from a secure frontend (HTTPS). Browsers may block this connection.");
}

// Helper to get full file URL from relative backend path
export const getFileUrl = (path: string | undefined): string => {
  if (!path) return 'https://via.placeholder.com/800x600?text=No+Image';
  if (path.startsWith('http')) return path;

  // Remove /api from base URL to get the root server URL
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');

  // Clean the path to ensure it's not double-slashed
  let cleanPath = path;

  // If the path doesn't start with static/, and it's a relative path, 
  // we might need to prepend static/ depending on how the backend stores it.
  // But usually, the backend returns the full relative path from the app root.
  if (!cleanPath.startsWith('/') && !cleanPath.startsWith('http')) {
    cleanPath = `/${cleanPath}`;
  }

  return `${baseUrl}${cleanPath}`;
};

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
