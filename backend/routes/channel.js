// Channel generation routes
const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');
const youtubeService = require('../services/youtubeService');
const vidiqService = require('../services/vidiqService');
const { db } = require('../config/firebase');

// Generate channel names
router.post('/channel-names', async (req, res) => {
  try {
    const { niche, apiKey } = req.body;
    
    if (!niche || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Niche and OpenAI API key are required' 
      });
    }
    
    const channelNames = await openaiService.generateChannelNames(niche, apiKey);
    
    // Store in Firebase
    const docRef = await db.collection('channelNames').add({
      niche,
      names: channelNames,
      createdAt: new Date()
    });
    
    res.status(200).json({
      success: true,
      names: channelNames,
      id: docRef.id
    });
  } catch (error) {
    console.error('Error generating channel names:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate channel names'
    });
  }
});

// Generate logos
router.post('/logos', async (req, res) => {
  try {
    const { niche, channelName, apiKey } = req.body;
    
    if (!niche || !channelName || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Niche, channel name, and OpenAI API key are required' 
      });
    }
    
    // Generate prompts for logos
    const imagePrompts = await openaiService.generateImagePrompts(niche, channelName, apiKey);
    
    // Generate images using DALL-E
    const logoUrls = await openaiService.generateImages(imagePrompts, apiKey);
    
    // Store in Firebase
    const docRef = await db.collection('logos').add({
      niche,
      channelName,
      logoUrls,
      createdAt: new Date()
    });
    
    res.status(200).json({
      success: true,
      logos: logoUrls,
      id: docRef.id
    });
  } catch (error) {
    console.error('Error generating logos:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate logos'
    });
  }
});

// Generate banners
router.post('/banners', async (req, res) => {
  try {
    const { niche, channelName, apiKey } = req.body;
    
    if (!niche || !channelName || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Niche, channel name, and OpenAI API key are required' 
      });
    }
    
    // Generate prompts for banners
    const bannerPrompts = imagePrompts = await openaiService.generateImagePrompts(
      `YouTube banner for ${niche} channel`, 
      channelName, 
      apiKey
    );
    
    // Generate images using DALL-E
    const bannerUrls = await openaiService.generateImages(bannerPrompts, apiKey);
    
    // Store in Firebase
    const docRef = await db.collection('banners').add({
      niche,
      channelName,
      bannerUrls,
      createdAt: new Date()
    });
    
    res.status(200).json({
      success: true,
      banners: bannerUrls,
      id: docRef.id
    });
  } catch (error) {
    console.error('Error generating banners:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate banners'
    });
  }
});

// Generate SEO content
router.post('/seo', async (req, res) => {
  try {
    const { niche, channelName, apiKey, vidiqKey } = req.body;
    
    if (!niche || !channelName || !apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'Niche, channel name, and OpenAI API key are required' 
      });
    }
    
    // Generate SEO description
    const description = await openaiService.generateSEODescription(niche, channelName, apiKey);
    
    // Generate SEO tags
    let tags = [];
    
    // If VidIQ key is provided, use it to enhance SEO tags
    if (vidiqKey) {
      const recommendedTags = await vidiqService.getRecommendedTags(niche, vidiqKey);
      tags = [...recommendedTags];
    } else {
      tags = await openaiService.generateSEOTags(niche, channelName, apiKey);
    }
    
    // Store in Firebase
    const docRef = await db.collection('seoContent').add({
      niche,
      channelName,
      description,
      tags,
      createdAt: new Date()
    });
    
    res.status(200).json({
      success: true,
      description,
      tags,
      id: docRef.id
    });
  } catch (error) {
    console.error('Error generating SEO content:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate SEO content'
    });
  }
});

module.exports = router;
