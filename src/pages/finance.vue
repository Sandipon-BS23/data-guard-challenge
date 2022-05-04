<template>
    <div>
        <h1>Finance</h1>
        <pre
            >{{ fakeData }}
        </pre>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const fakeData = ref([])

/*
    api calls 
*/
axios.get('/api/plugins').then((response) => {
    // console.log('response:', response)
    fakeData.value = response.data
})
</script>
