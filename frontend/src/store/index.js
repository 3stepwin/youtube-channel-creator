import { createStore } from 'vuex'
import api from '../services/api'

export default createStore({
  state: {
    userNiche: '',
    apiKeys: {
      openai: '',
      youtube: '',
      vidiq: ''
    },
    channelNames: [],
    logos: [],
    banners: [],
    seoDescription: '',
    seoTags: [],
    loading: false,
    error: null,
    currentStep: 1,
    uploadStatus: {
      logo: false,
      banner: false,
      description: false,
      tags: false
    },
    selectedChannelName: ''
  },
  mutations: {
    setUserNiche(state, niche) {
      state.userNiche = niche;
    },
    setApiKey(state, { service, key }) {
      state.apiKeys[service] = key;
    },
    setChannelNames(state, names) {
      state.channelNames = names;
    },
    setLogos(state, logos) {
      state.logos = logos;
    },
    setBanners(state, banners) {
      state.banners = banners;
    },
    setSeoDescription(state, description) {
      state.seoDescription = description;
    },
    setSeoTags(state, tags) {
      state.seoTags = tags;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, error) {
      state.error = error;
    },
    setCurrentStep(state, step) {
      state.currentStep = step;
    },
    setUploadStatus(state, { item, status }) {
      state.uploadStatus[item] = status;
    },
    setSelectedChannelName(state, name) {
      state.selectedChannelName = name;
    }
  },
  actions: {
    async generateChannelNames({ commit, state }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const response = await api.generateChannelNames(
          state.userNiche,
          state.apiKeys.openai
        );
        
        if (response.success) {
          commit('setChannelNames', response.names);
        } else {
          throw new Error(response.message || 'Failed to generate channel names');
        }
        
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message || 'An error occurred while generating channel names');
        commit('setLoading', false);
      }
    },
    async generateLogos({ commit, state }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const response = await api.generateLogos(
          state.userNiche,
          state.selectedChannelName,
          state.apiKeys.openai
        );
        
        if (response.success) {
          commit('setLogos', response.logos);
        } else {
          throw new Error(response.message || 'Failed to generate logos');
        }
        
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message || 'An error occurred while generating logos');
        commit('setLoading', false);
      }
    },
    async generateBanners({ commit, state }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const response = await api.generateBanners(
          state.userNiche,
          state.selectedChannelName,
          state.apiKeys.openai
        );
        
        if (response.success) {
          commit('setBanners', response.banners);
        } else {
          throw new Error(response.message || 'Failed to generate banners');
        }
        
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message || 'An error occurred while generating banners');
        commit('setLoading', false);
      }
    },
    async generateSeoContent({ commit, state }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const response = await api.generateSeoContent(
          state.userNiche,
          state.selectedChannelName,
          state.apiKeys.openai,
          state.apiKeys.vidiq
        );
        
        if (response.success) {
          commit('setSeoDescription', response.description);
          commit('setSeoTags', response.tags);
        } else {
          throw new Error(response.message || 'Failed to generate SEO content');
        }
        
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message || 'An error occurred while generating SEO content');
        commit('setLoading', false);
      }
    },
    async uploadToYouTube({ commit, state }, { logo, banner, description, tags }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const response = await api.uploadToYouTube(
          logo,
          banner,
          description,
          tags,
          state.apiKeys.youtube
        );
        
        if (response.success) {
          commit('setUploadStatus', { item: 'logo', status: response.logo });
          commit('setUploadStatus', { item: 'banner', status: response.banner });
          commit('setUploadStatus', { item: 'description', status: response.description });
          commit('setUploadStatus', { item: 'tags', status: response.tags });
        } else {
          throw new Error(response.message || 'Failed to upload to YouTube');
        }
        
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message || 'An error occurred while uploading to YouTube');
        commit('setLoading', false);
      }
    },
    async testApiKeys({ commit, state }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        let results = {
          openai: false,
          youtube: false,
          vidiq: false
        };
        
        if (state.apiKeys.openai) {
          try {
            const openaiResponse = await api.testOpenAIKey(state.apiKeys.openai);
            results.openai = openaiResponse.success;
          } catch (error) {
            console.error('OpenAI API key test failed:', error);
          }
        }
        
        if (state.apiKeys.youtube) {
          try {
            const youtubeResponse = await api.testYouTubeKey(state.apiKeys.youtube);
            results.youtube = youtubeResponse.success;
          } catch (error) {
            console.error('YouTube API key test failed:', error);
          }
        }
        
        if (state.apiKeys.vidiq) {
          try {
            const vidiqResponse = await api.testVidIQKey(state.apiKeys.vidiq);
            results.vidiq = vidiqResponse.success;
          } catch (error) {
            console.error('VidIQ API key test failed:', error);
          }
        }
        
        commit('setLoading', false);
        return results;
      } catch (error) {
        commit('setError', error.message || 'An error occurred while testing API keys');
        commit('setLoading', false);
        return {
          openai: false,
          youtube: false,
          vidiq: false
        };
      }
    }
  },
  getters: {
    isComplete: state => {
      return state.uploadStatus.logo && 
             state.uploadStatus.banner && 
             state.uploadStatus.description && 
             state.uploadStatus.tags;
    }
  }
})
