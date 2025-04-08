<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-6 text-center text-green-600">Success! Your YouTube Channel is Ready</h1>
        
        <div class="mb-8 text-center">
          <div class="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-xl text-gray-700">
            Your YouTube channel has been successfully created and configured!
          </p>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 class="text-xl font-semibold mb-4">Channel Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Channel Name:</h3>
              <p class="text-lg">{{ channelName }}</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Niche:</h3>
              <p class="text-lg">{{ niche }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Logo:</h3>
              <img :src="logo" alt="Channel logo" class="w-32 h-32 object-contain border rounded">
            </div>
            
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Banner:</h3>
              <img :src="banner" alt="Channel banner" class="w-full h-auto object-contain border rounded">
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 class="text-xl font-semibold mb-4">Upload Status</h2>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <svg v-if="uploadStatus.logo" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Logo Upload: {{ uploadStatus.logo ? 'Successful' : 'Failed' }}</span>
            </div>
            
            <div class="flex items-center">
              <svg v-if="uploadStatus.banner" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Banner Upload: {{ uploadStatus.banner ? 'Successful' : 'Failed' }}</span>
            </div>
            
            <div class="flex items-center">
              <svg v-if="uploadStatus.description" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Description Upload: {{ uploadStatus.description ? 'Successful' : 'Failed' }}</span>
            </div>
            
            <div class="flex items-center">
              <svg v-if="uploadStatus.tags" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>SEO Tags Upload: {{ uploadStatus.tags ? 'Successful' : 'Failed' }}</span>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-6 rounded-lg mb-8">
          <h2 class="text-xl font-semibold mb-4">Next Steps</h2>
          
          <ol class="list-decimal pl-5 space-y-2">
            <li>Visit your YouTube Studio to see your new channel branding</li>
            <li>Start creating content for your channel</li>
            <li>Use the generated SEO tags for your videos to improve discoverability</li>
            <li>Engage with your audience to grow your channel</li>
          </ol>
        </div>
        
        <div class="flex justify-between pt-4">
          <router-link 
            to="/creator" 
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Back to Creator
          </router-link>
          
          <router-link 
            to="/" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Start New Channel
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  computed: {
    channelName() {
      return this.$store.state.channelNames[0] || 'CookingMasterClass';
    },
    niche() {
      return this.$store.state.userNiche || 'Cooking';
    },
    logo() {
      return this.$store.state.logos[0] || 'https://via.placeholder.com/200x200?text=Logo+1';
    },
    banner() {
      return this.$store.state.banners[0] || 'https://via.placeholder.com/1546x423?text=Banner+1';
    },
    uploadStatus() {
      return this.$store.state.uploadStatus;
    }
  }
}
</script>
