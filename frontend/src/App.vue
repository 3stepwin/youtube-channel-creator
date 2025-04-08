<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold">YouTube Channel Creator</h1>
        <p class="text-lg">AI-powered channel setup in minutes</p>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4 text-center">
        <p>© 2025 YouTube Channel Creator - AI-powered channel generation</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
