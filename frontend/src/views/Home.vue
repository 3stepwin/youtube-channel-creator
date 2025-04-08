<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">AI-Powered YouTube Channel Creator</h1>
        <p class="text-xl text-gray-700 mb-8 text-center">
          Create your YouTube channel in minutes with AI-generated names, logos, banners, and SEO optimization
        </p>
        
        <div class="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <div class="bg-blue-50 p-6 rounded-lg shadow-md flex-1">
            <h3 class="text-xl font-semibold mb-3 text-blue-700">Channel Names</h3>
            <p class="text-gray-700">Generate 30 unique, engaging channel names based on your niche</p>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg shadow-md flex-1">
            <h3 class="text-xl font-semibold mb-3 text-blue-700">Logos & Banners</h3>
            <p class="text-gray-700">Create 4 logo options & 4 banners optimized for all devices</p>
          </div>
          
          <div class="bg-blue-50 p-6 rounded-lg shadow-md flex-1">
            <h3 class="text-xl font-semibold mb-3 text-blue-700">SEO Optimization</h3>
            <p class="text-gray-700">Generate descriptions with hashtags & 20 high-ranking keywords</p>
          </div>
        </div>
        
        <div class="text-center">
          <router-link 
            to="/api-settings" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
          >
            Get Started
          </router-link>
          
          <p class="mt-4 text-gray-600">First, you'll need to set up your API keys</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
