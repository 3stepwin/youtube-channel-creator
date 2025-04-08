// OpenAI service configuration
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// Function to create OpenAI configuration with provided API key
const createOpenAIConfig = (apiKey) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  
  return new OpenAIApi(configuration);
};

// Generate channel names based on niche
const generateChannelNames = async (niche, apiKey) => {
  try {
    const openai = createOpenAIConfig(apiKey);
    
    const prompt = `Generate 30 unique, catchy, and engaging YouTube channel names for a channel about ${niche}. 
    The names should be memorable, relevant to the niche, and not already taken by popular channels. 
    Return only the names as a JSON array of strings.`;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    });
    
    // Parse the response to extract channel names
    const content = response.data.choices[0].text.trim();
    let channelNames = [];
    
    try {
      // Try to parse as JSON
      channelNames = JSON.parse(content);
    } catch (error) {
      // If not valid JSON, split by newlines and clean up
      channelNames = content.split('\n')
        .map(name => name.replace(/^[0-9]+\.\s*/, '').trim())
        .filter(name => name.length > 0);
    }
    
    return channelNames.slice(0, 30); // Ensure we return exactly 30 names
  } catch (error) {
    console.error('Error generating channel names:', error);
    throw new Error('Failed to generate channel names');
  }
};

// Generate SEO description with hashtags and emojis
const generateSEODescription = async (niche, channelName, apiKey) => {
  try {
    const openai = createOpenAIConfig(apiKey);
    
    const prompt = `Create a 100-word YouTube channel description for a channel named "${channelName}" about ${niche}.
    Include relevant emojis and hashtags. The description should be engaging, highlight the value proposition,
    and include SEO-friendly keywords. Format it to be visually appealing with emojis at appropriate places.`;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.7,
    });
    
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating SEO description:', error);
    throw new Error('Failed to generate SEO description');
  }
};

// Generate SEO tags based on niche and channel name
const generateSEOTags = async (niche, channelName, apiKey, vidiqKey = null) => {
  try {
    const openai = createOpenAIConfig(apiKey);
    
    // If VidIQ key is provided, we could enhance this with their API
    // For now, we'll use OpenAI to generate tags
    
    const prompt = `Generate 20 high-ranking SEO keywords and tags for a YouTube channel named "${channelName}" about ${niche}.
    These should be optimized for YouTube search and include a mix of broad and specific terms.
    Return only the tags as a JSON array of strings.`;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.7,
    });
    
    // Parse the response to extract tags
    const content = response.data.choices[0].text.trim();
    let seoTags = [];
    
    try {
      // Try to parse as JSON
      seoTags = JSON.parse(content);
    } catch (error) {
      // If not valid JSON, split by newlines and clean up
      seoTags = content.split('\n')
        .map(tag => tag.replace(/^[0-9]+\.\s*/, '').trim())
        .filter(tag => tag.length > 0);
    }
    
    return seoTags.slice(0, 20); // Ensure we return exactly 20 tags
  } catch (error) {
    console.error('Error generating SEO tags:', error);
    throw new Error('Failed to generate SEO tags');
  }
};

// Generate image prompts for DALL-E
const generateImagePrompts = async (niche, channelName, apiKey) => {
  try {
    const openai = createOpenAIConfig(apiKey);
    
    const prompt = `Generate 4 detailed prompts for DALL-E to create unique logo designs for a YouTube channel named "${channelName}" about ${niche}.
    Each prompt should describe a different style (e.g., minimalist, colorful, 3D, illustrated) and include specific visual elements
    that would make a great channel logo. Return only the prompts as a JSON array of strings.`;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    });
    
    // Parse the response to extract prompts
    const content = response.data.choices[0].text.trim();
    let imagePrompts = [];
    
    try {
      // Try to parse as JSON
      imagePrompts = JSON.parse(content);
    } catch (error) {
      // If not valid JSON, split by newlines and clean up
      imagePrompts = content.split('\n')
        .map(prompt => prompt.replace(/^[0-9]+\.\s*/, '').trim())
        .filter(prompt => prompt.length > 0);
    }
    
    return imagePrompts.slice(0, 4); // Ensure we return exactly 4 prompts
  } catch (error) {
    console.error('Error generating image prompts:', error);
    throw new Error('Failed to generate image prompts');
  }
};

// Generate images using DALL-E
const generateImages = async (prompts, apiKey) => {
  try {
    const openai = createOpenAIConfig(apiKey);
    const images = [];
    
    for (const prompt of prompts) {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      
      images.push(response.data.data[0].url);
    }
    
    return images;
  } catch (error) {
    console.error('Error generating images:', error);
    throw new Error('Failed to generate images');
  }
};

module.exports = {
  generateChannelNames,
  generateSEODescription,
  generateSEOTags,
  generateImagePrompts,
  generateImages
};
