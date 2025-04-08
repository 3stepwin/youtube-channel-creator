<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-2xl font-bold mb-6">API Settings</h1>
        
        <div class="mb-8">
          <p class="text-gray-700 mb-4">
            To use the YouTube Channel Creator, you'll need to provide your own API keys. These keys are stored locally and are never sent to our servers.
          </p>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p class="text-yellow-700">
              Your API keys are required to generate content and upload to YouTube. We do not store these keys.
            </p>
          </div>
        </div>
        
        <form @submit.prevent="saveApiKeys" class="space-y-6">
          <div>
            <label for="openai" class="block text-sm font-medium text-gray-700 mb-1">OpenAI API Key</label>
            <input 
              id="openai" 
              v-model="openaiKey" 
              type="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="sk-..."
              required
            >
            <p class="mt-1 text-sm text-gray-500">Required for generating channel names, descriptions, and images</p>
          </div>
          
          <div>
            <label for="youtube" class="block text-sm font-medium text-gray-700 mb-1">YouTube Data API Key</label>
            <input 
              id="youtube" 
              v-model="youtubeKey" 
              type="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="AIza..."
              required
            >
            <p class="mt-1 text-sm text-gray-500">Required for uploading content to your YouTube channel</p>
          </div>
          
          <div>
            <label for="vidiq" class="block text-sm font-medium text-gray-700 mb-1">VidIQ API Key (Optional)</label>
            <input 
              id="vidiq" 
              v-model="vidiqKey" 
              type="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional - for enhanced SEO"
            >
            <p class="mt-1 text-sm text-gray-500">Optional: Enhances SEO keyword suggestions</p>
          </div>
          
          <div class="flex justify-between pt-4">
            <router-link 
              to="/" 
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Back
            </router-link>
            
            <button 
              type="submit" 
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiSettings',
  data() {
    return {
      openaiKey: '',
      youtubeKey: '',
      vidiqKey: ''
    }
  },
  created() {
    // Load saved API keys from store if available
    this.openaiKey = this.$store.state.apiKeys.openai || '';
    this.youtubeKey = this.$store.state.apiKeys.youtube || '';
    this.vidiqKey = this.$store.state.apiKeys.vidiq || '';
  },
  methods: {
    saveApiKeys() {
      this.$store.commit('setApiKey', { service: 'openai', key: this.openaiKey });
      this.$store.commit('setApiKey', { service: 'youtube', key: this.youtubeKey });
      this.$store.commit('setApiKey', { service: 'vidiq', key: this.vidiqKey });
      
      // Navigate to the channel creator page
      this.$router.push('/creator');
    }
  }
}
</script>
