<template>
    <div>
        <h1>Finance</h1>
        <!-- {{ axios }} -->
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
axios.get('/api/todos').then((response) => {
    console.log('response:', response)
})
onMounted(() => {
    console.log(`the component is now mounted.`)
})
</script>
<style lang=""></style>
