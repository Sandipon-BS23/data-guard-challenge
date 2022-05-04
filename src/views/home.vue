<template>
    <div>
        <h1>home</h1>
    </div>
</template>
<script setup lang="ts">
import axios from 'src/lib/axios'
import { onMounted } from 'vue'
// onMounted(() => {
axios.get('/todos').then((response) => {
    console.log('response:', response)
})
console.log(`the component is now mounted.`)
// })
</script>
<style lang=""></style>
