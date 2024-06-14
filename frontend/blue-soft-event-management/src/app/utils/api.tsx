// utils/api.js

const API_URL = 'http://127.0.0.1:8000/api';

export const register = async (userData:any) => {
  const response = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

export const login = async (credentials:any) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};

export const createEvent = async (eventData:any, token:any) => {
  const response = await fetch(`${API_URL}/events/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
    },
    body: JSON.stringify(eventData),
  });
  return await response.json();
};

export const fetchEvents = async (token:any) => {
  const response = await fetch(`${API_URL}/events/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const fetchEvent = async (id:any, token:any) => {
  const response = await fetch(`${API_URL}/events/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const updateEvent = async (id:any, eventData:any, token:any) => {
  const response = await fetch(`${API_URL}/events/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  return await response.json();
};

export const deleteEvent = async (id:any, token:any) => {
  const response = await fetch(`${API_URL}/events/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
};
