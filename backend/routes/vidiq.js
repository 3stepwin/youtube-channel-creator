// VidIQ API routes
const express = require('express');
const router = express.Router();
const vidiqService = require('../services/vidiqService');

// Test VidIQ API connection
router.post('/test', async (req, res) => {
  try {
    const { apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'VidIQ API key is required' 
      });
    }
    
    // Test the API key by getting trending keywords
    await vidiqService.getTrendingKeywords('general', apiKey);
    
    res.status(200).json({
      success: true,
      message: 'VidIQ API key is valid'
    });
  } catch (error) {
    console.error('Error testing VidIQ API key:', error);
    res.status(500).json({
      success: false,
      message: 'Invalid VidIQ API key or API error'
    });
  }
});

// Get trending keywords
router.post('/trending-keywords', async (req, res) => {
  try {
    const { niche, apiKey } = req.body;
    
    if (!niche || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Niche and VidIQ API key are required' 
      });
    }
    
    const keywords = await vidiqService.getTrendingKeywords(niche, apiKey);
    
    res.status(200).json({
      success: true,
      keywords
    });
  } catch (error) {
    console.error('Error getting trending keywords:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get trending keywords'
    });
  }
});

// Analyze keywords
router.post('/analyze-keywords', async (req, res) => {
  try {
    const { keywords, apiKey } = req.body;
    
    if (!keywords || !keywords.length || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Keywords and VidIQ API key are required' 
      });
    }
    
    const analysis = await vidiqService.analyzeKeywords(keywords, apiKey);
    
    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Error analyzing keywords:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze keywords'
    });
  }
});

// Get recommended tags
router.post('/recommended-tags', async (req, res) => {
  try {
    const { niche, apiKey } = req.body;
    
    if (!niche || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Niche and VidIQ API key are required' 
      });
    }
    
    const tags = await vidiqService.getRecommendedTags(niche, apiKey);
    
    res.status(200).json({
      success: true,
      tags
    });
  } catch (error) {
    console.error('Error getting recommended tags:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get recommended tags'
    });
  }
});

module.exports = router;
