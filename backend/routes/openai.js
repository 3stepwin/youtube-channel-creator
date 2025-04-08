// OpenAI routes
const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// Test OpenAI connection
router.post('/test', async (req, res) => {
  try {
    const { apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: 'OpenAI API key is required' 
      });
    }
    
    // Generate a simple test prompt to verify API key works
    const testPrompt = ['Create a simple test logo with text "Test"'];
    await openaiService.generateImages(testPrompt, apiKey);
    
    res.status(200).json({
      success: true,
      message: 'OpenAI API key is valid'
    });
  } catch (error) {
    console.error('Error testing OpenAI API key:', error);
    res.status(500).json({
      success: false,
      message: 'Invalid OpenAI API key or API error'
    });
  }
});

module.exports = router;
