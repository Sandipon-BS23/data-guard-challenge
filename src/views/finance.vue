<template>
    <div>
        <h1>Finance</h1>
        <!-- {{ axios }} -->
        {{ fakeData }}
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
const fakeData = ref([])
axios.get('/api/todos').then((response) => {
    console.log('response:', response)
    fakeData.value = response.data
})
onMounted(() => {
    console.log(`the component is now mounted.`)
})
</script>
<style lang=""></style>
