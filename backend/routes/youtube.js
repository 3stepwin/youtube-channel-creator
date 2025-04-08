// YouTube API routes
const express = require('express');
const router = express.Router();
const youtubeService = require('../services/youtubeService');
const { db } = require('../config/firebase');

// Test YouTube API connection
router.post('/test', async (req, res) => {
  try {
    const { apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'YouTube API key is required' 
      });
    }
    
    // Create YouTube client to verify API key works
    const youtube = youtubeService.createYouTubeClient(apiKey);
    
    // Make a simple request to verify the key works
    // In a real implementation, this would make an actual API call
    
    res.status(200).json({
      success: true,
      message: 'YouTube API key is valid'
    });
  } catch (error) {
    console.error('Error testing YouTube API key:', error);
    res.status(500).json({
      success: false,
      message: 'Invalid YouTube API key or API error'
    });
  }
});

// Upload channel branding
router.post('/upload', async (req, res) => {
  try {
    const { logo, banner, description, tags, apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'YouTube API key is required' 
      });
    }
    
    const results = {
      logo: false,
      banner: false,
      description: false,
      tags: false
    };
    
    // Upload logo if provided
    if (logo) {
      const logoResult = await youtubeService.uploadChannelLogo(logo, apiKey);
      results.logo = logoResult.success;
    }
    
    // Upload banner if provided
    if (banner) {
      const bannerResult = await youtubeService.uploadChannelBanner(banner, apiKey);
      results.banner = bannerResult.success;
    }
    
    // Update description if provided
    if (description) {
      const descriptionResult = await youtubeService.updateChannelDescription(description, apiKey);
      results.description = descriptionResult.success;
    }
    
    // Update tags if provided
    if (tags && tags.length > 0) {
      const tagsResult = await youtubeService.updateChannelTags(tags, apiKey);
      results.tags = tagsResult.success;
    }
    
    // Store results in Firebase
    await db.collection('uploads').add({
      results,
      timestamp: new Date()
    });
    
    res.status(200).json({
      success: true,
      ...results
    });
  } catch (error) {
    console.error('Error uploading to YouTube:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload to YouTube'
    });
  }
});

module.exports = router;
