<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-2xl font-bold mb-6">Create Your YouTube Channel</h1>
        
        <div class="mb-8">
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p class="text-blue-700">
              Step {{ currentStep }} of 4: {{ stepTitle }}
            </p>
          </div>
        </div>
        
        <!-- Step 1: Enter Niche -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div>
            <label for="niche" class="block text-sm font-medium text-gray-700 mb-1">What's your channel niche?</label>
            <input 
              id="niche" 
              v-model="niche" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Cooking, Gaming, Fitness, Tech Reviews"
              required
            >
            <p class="mt-1 text-sm text-gray-500">Be specific to get better results</p>
          </div>
          
          <div class="flex justify-between pt-4">
            <router-link 
              to="/api-settings" 
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Back
            </router-link>
            
            <button 
              @click="generateChannelNames" 
              :disabled="!niche || loading"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
            >
              <span v-if="loading">Generating...</span>
              <span v-else>Generate Channel Names</span>
            </button>
          </div>
        </div>
        
        <!-- Step 2: Select Channel Name -->
        <div v-if="currentStep === 2" class="space-y-6">
          <h2 class="text-xl font-semibold mb-4">Select your favorite channel name:</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="(name, index) in channelNames" 
              :key="index"
              @click="selectChannelName(name)"
              :class="['p-4 border rounded-lg cursor-pointer transition-colors', 
                      selectedChannelName === name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50']"
            >
              {{ name }}
            </div>
          </div>
          
          <div class="flex justify-between pt-4">
            <button 
              @click="goBack" 
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Back
            </button>
            
            <button 
              @click="generateLogosAndBanners" 
              :disabled="!selectedChannelName || loading"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
            >
              <span v-if="loading">Generating...</span>
              <span v-else>Generate Logos & Banners</span>
            </button>
          </div>
        </div>
        
        <!-- Step 3: Select Logo and Banner -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold mb-4">Select your logo:</h2>
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div 
                v-for="(logo, index) in logos" 
                :key="'logo-'+index"
                @click="selectLogo(logo)"
                :class="['border rounded-lg overflow-hidden cursor-pointer transition-colors', 
                        selectedLogo === logo ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200']"
              >
                <img :src="logo" alt="Logo option" class="w-full h-auto">
              </div>
            </div>
            
            <h2 class="text-xl font-semibold mb-4">Select your banner:</h2>
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="(banner, index) in banners" 
                :key="'banner-'+index"
                @click="selectBanner(banner)"
                :class="['border rounded-lg overflow-hidden cursor-pointer transition-colors', 
                        selectedBanner === banner ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200']"
              >
                <img :src="banner" alt="Banner option" class="w-full h-auto">
              </div>
            </div>
          </div>
          
          <div class="flex justify-between pt-4">
            <button 
              @click="goBack" 
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Back
            </button>
            
            <button 
              @click="generateSeoContent" 
              :disabled="!selectedLogo || !selectedBanner || loading"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
            >
              <span v-if="loading">Generating...</span>
              <span v-else>Generate SEO Content</span>
            </button>
          </div>
        </div>
        
        <!-- Step 4: Review and Upload -->
        <div v-if="currentStep === 4" class="space-y-6">
          <h2 class="text-xl font-semibold mb-4">Review your channel:</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Channel Name:</h3>
              <p class="text-lg">{{ selectedChannelName }}</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Logo:</h3>
              <img :src="selectedLogo" alt="Selected logo" class="w-32 h-32 object-contain border rounded">
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="font-medium text-gray-700 mb-2">Banner:</h3>
            <img :src="selectedBanner" alt="Selected banner" class="w-full h-auto object-contain border rounded">
          </div>
          
          <div class="mb-6">
            <h3 class="font-medium text-gray-700 mb-2">Channel Description:</h3>
            <textarea 
              v-model="seoDescription" 
              rows="4" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div class="mb-6">
            <h3 class="font-medium text-gray-700 mb-2">SEO Tags:</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(tag, index) in seoTags" 
                :key="index"
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex justify-between pt-4">
            <button 
              @click="goBack" 
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Back
            </button>
            
            <button 
              @click="uploadToYouTube" 
              :disabled="loading"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
            >
              <span v-if="loading">Uploading...</span>
              <span v-else>Upload to YouTube</span>
            </button>
          </div>
        </div>
        
        <!-- Loading Indicator -->
        <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-xl">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-center text-gray-700">{{ loadingMessage }}</p>
          </div>
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelCreator',
  data() {
    return {
      niche: '',
      selectedChannelName: '',
      selectedLogo: null,
      selectedBanner: null,
      loadingMessage: 'Processing...',
      
      // Mock data for development (would be replaced with API calls)
      mockChannelNames: [
        'CookingMasterClass', 'ChefSecrets', 'KitchenWisdom', 'FlavorFusion',
        'CulinaryJourney', 'TastyTechniques', 'GourmetGatherings', 'RecipeRevolution',
        'FoodieFinesse', 'DishDelight', 'SavorySensations', 'CookingConfidential',
        'MealMagic', 'PantryPro', 'CulinaryCanvas', 'TasteTemptations'
      ],
      mockLogos: [
        'https://via.placeholder.com/200x200?text=Logo+1',
        'https://via.placeholder.com/200x200?text=Logo+2',
        'https://via.placeholder.com/200x200?text=Logo+3',
        'https://via.placeholder.com/200x200?text=Logo+4'
      ],
      mockBanners: [
        'https://via.placeholder.com/1546x423?text=Banner+1',
        'https://via.placeholder.com/1546x423?text=Banner+2',
        'https://via.placeholder.com/1546x423?text=Banner+3',
        'https://via.placeholder.com/1546x423?text=Banner+4'
      ],
      mockDescription: '🍳 Welcome to CookingMasterClass! 🥘 Your ultimate destination for delicious recipes, cooking tips, and culinary inspiration. From beginner basics to advanced techniques, we share step-by-step guides to help you create amazing meals at home. Join our community of food lovers and elevate your cooking skills! #cooking #recipes #foodie #homecooking #culinary #chef #kitchentips',
      mockTags: [
        'cooking', 'recipes', 'food', 'chef', 'homecooking', 
        'culinary', 'kitchentips', 'mealprep', 'foodie', 'baking',
        'healthyeating', 'cookingchannel', 'cookingvideo', 'cookingtutorial',
        'easyrecipes', 'quickmeals', 'foodhacks', 'cookingbasics', 'gourmet', 'tasty'
      ]
    }
  },
  computed: {
    currentStep() {
      return this.$store.state.currentStep;
    },
    stepTitle() {
      const titles = [
        'Enter Your Channel Niche',
        'Select Channel Name',
        'Choose Logo & Banner',
        'Review & Upload'
      ];
      return titles[this.currentStep - 1];
    },
    channelNames() {
      return this.$store.state.channelNames.length > 0 
        ? this.$store.state.channelNames 
        : this.mockChannelNames;
    },
    logos() {
      return this.$store.state.logos.length > 0 
        ? this.$store.state.logos 
        : this.mockLogos;
    },
    banners() {
      return this.$store.state.banners.length > 0 
        ? this.$store.state.banners 
        : this.mockBanners;
    },
    seoDescription: {
      get() {
        return this.$store.state.seoDescription || this.mockDescription;
      },
      set(value) {
        this.$store.commit('setSeoDescription', value);
      }
    },
    seoTags() {
      return this.$store.state.seoTags.length > 0 
        ? this.$store.state.seoTags 
        : this.mockTags;
    },
    loading() {
      return this.$store.state.loading;
    },
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    generateChannelNames() {
      this.loadingMessage = 'Generating channel names...';
      this.$store.commit('setUserNiche', this.niche);
      
      // Use the real API call
      this.$store.dispatch('generateChannelNames').then(() => {
        if (!this.$store.state.error) {
          this.$store.commit('setCurrentStep', 2);
        }
      });
    },
    selectChannelName(name) {
      this.selectedChannelName = name;
      this.$store.commit('setSelectedChannelName', name);
    },
    generateLogosAndBanners() {
      this.loadingMessage = 'Generating logos and banners...';
      
      // Use the real API calls
      Promise.all([
        this.$store.dispatch('generateLogos'),
        this.$store.dispatch('generateBanners')
      ]).then(() => {
        if (!this.$store.state.error) {
          this.$store.commit('setCurrentStep', 3);
        }
      });
    },
    selectLogo(logo) {
      this.selectedLogo = logo;
    },
    selectBanner(banner) {
      this.selectedBanner = banner;
    },
    generateSeoContent() {
      this.loadingMessage = 'Generating SEO content...';
      
      // Use the real API call
      this.$store.dispatch('generateSeoContent').then(() => {
        if (!this.$store.state.error) {
          this.$store.commit('setCurrentStep', 4);
        }
      });
    },
    uploadToYouTube() {
      this.loadingMessage = 'Uploading to YouTube...';
      
      // Use the real API call
      this.$store.dispatch('uploadToYouTube', {
        logo: this.selectedLogo,
        banner: this.selectedBanner,
        description: this.seoDescription,
        tags: this.seoTags
      }).then(() => {
        if (!this.$store.state.error && this.$store.getters.isComplete) {
          // Navigate to results page
          this.$router.push('/results');
        }
      });
    },
    goBack() {
      this.$store.commit('setCurrentStep', this.currentStep - 1);
    }
  },
  created() {
    // Reset step when component is created
    this.$store.commit('setCurrentStep', 1);
  }
}
</script>
