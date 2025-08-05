<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getApiData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('src/assets/json/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    const allBooks = []
    authors.value.forEach(author => {
      author.famousWorks.forEach(book => {
        allBooks.push({
          ...book,
          author: author.name,
          authorId: author.id,
          genres: author.genres
        })
      })
    })
    
    apiResponse.value = {
      success: true,
      totalBooks: allBooks.length,
      books: allBooks,
      timestamp: new Date().toISOString()
    }
    
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.api-response {
  padding: 20px;
  font-family: monospace;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin: 20px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>