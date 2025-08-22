// API utility functions for frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiService {
  // Helper method for making requests
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Remove Content-Type for FormData
    if (options.body instanceof FormData) {
      const headers = config.headers as Record<string, string>;
      delete headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Profile methods
  async getProfile() {
    return this.request('/profile');
  }

  async updateProfile(profileData: any) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Projects methods
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(projectData: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (key === 'technologies' && Array.isArray(projectData[key])) {
        formData.append(key, projectData[key].join(', '));
      } else {
        formData.append(key, projectData[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request('/projects', {
      method: 'POST',
      body: formData,
    });
  }

  async updateProject(id: string, projectData: any, imageFile?: File) {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (key === 'technologies' && Array.isArray(projectData[key])) {
        formData.append(key, projectData[key].join(', '));
      } else {
        formData.append(key, projectData[key]);
      }
    });
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Experience methods
  async getExperience() {
    return this.request('/experience');
  }

  async createExperience(experienceData: any) {
    return this.request('/experience', {
      method: 'POST',
      body: JSON.stringify(experienceData),
    });
  }

  async updateExperience(id: string, experienceData: any) {
    return this.request(`/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experienceData),
    });
  }

  async deleteExperience(id: string) {
    return this.request(`/experience/${id}`, {
      method: 'DELETE',
    });
  }

  // File upload methods
  async uploadCV(file: File) {
    const formData = new FormData();
    formData.append('cv', file);

    return this.request('/upload-cv', {
      method: 'POST',
      body: formData,
    });
  }

  // Contact form method
  async sendContactMessage(messageData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // Utility methods
  async healthCheck() {
    return this.request('/health');
  }

  // Get full URL for uploaded files
  getFileUrl(relativePath: string) {
    if (!relativePath) return null;
    if (relativePath.startsWith('http')) return relativePath;
    return `${relativePath}`;
  }
}

export const apiService = new ApiService();
export default apiService;
