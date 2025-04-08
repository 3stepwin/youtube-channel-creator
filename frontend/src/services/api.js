// API service for connecting to backend
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Channel name generation
export const generateChannelNames = async (niche, apiKey) => {
  try {
    const response = await apiClient.post('/generate/channel-names', {
      niche,
      apiKey
    });
    return response.data;
  } catch (error) {
    console.error('Error generating channel names:', error);
    throw error;
  }
};

// Logo generation
export const generateLogos = async (niche, channelName, apiKey) => {
  try {
    const response = await apiClient.post('/generate/logos', {
      niche,
      channelName,
      apiKey
    });
    return response.data;
  } catch (error) {
    console.error('Error generating logos:', error);
    throw error;
  }
};

// Banner generation
export const generateBanners = async (niche, channelName, apiKey) => {
  try {
    const response = await apiClient.post('/generate/banners', {
      niche,
      channelName,
      apiKey
    });
    return response.data;
  } catch (error) {
    console.error('Error generating banners:', error);
    throw error;
  }
};

// SEO content generation
export const generateSeoContent = async (niche, channelName, apiKey, vidiqKey = null) => {
  try {
    const response = await apiClient.post('/generate/seo', {
      niche,
      channelName,
      apiKey,
      vidiqKey
    });
    return response.data;
  } catch (error) {
    console.error('Error generating SEO content:', error);
    throw error;
  }
};

// Upload to YouTube
export const uploadToYouTube = async (logo, banner, description, tags, apiKey) => {
  try {
    const response = await apiClient.post('/youtube/upload', {
      logo,
      banner,
      description,
      tags,
      apiKey
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading to YouTube:', error);
    throw error;
  }
};

// Test API keys
export const testOpenAIKey = async (apiKey) => {
  try {
    const response = await apiClient.post('/openai/test', { apiKey });
    return response.data;
  } catch (error) {
    console.error('Error testing OpenAI API key:', error);
    throw error;
  }
};

export const testYouTubeKey = async (apiKey) => {
  try {
    const response = await apiClient.post('/youtube/test', { apiKey });
    return response.data;
  } catch (error) {
    console.error('Error testing YouTube API key:', error);
    throw error;
  }
};

export const testVidIQKey = async (apiKey) => {
  try {
    const response = await apiClient.post('/vidiq/test', { apiKey });
    return response.data;
  } catch (error) {
    console.error('Error testing VidIQ API key:', error);
    throw error;
  }
};

export default {
  generateChannelNames,
  generateLogos,
  generateBanners,
  generateSeoContent,
  uploadToYouTube,
  testOpenAIKey,
  testYouTubeKey,
  testVidIQKey
};
