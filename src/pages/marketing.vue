<template>
    <div>
        <h1>Marketing</h1>
        <pre
            >{{ fakeTabData }}
        </pre>
        <hr />
        <hr />
        <hr />
        <pre> {{ fakeData }} </pre>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const fakeData = ref([])
const fakeTabData = ref()

/*
    api calls 
*/
axios.get('/api/tabdata').then((response) => {
    // console.log('response:', response)
    fakeTabData.value = response.data
})

// axios
//     .get('/api/tabdata/tab1', { data: 'something ! not sure what' })
//     .then((response) => {
//         console.log('response:', response)
//         fakeData.value = response.data
//     })
</script>
