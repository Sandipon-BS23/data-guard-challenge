<template>
    <div>
        <h1>Personnel</h1>
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
axios
    .post('/api/tabdata/tab3', { type: 'inactive', value: 'plugin11' })
    .then((response) => {
        fakeData.value = response.data
    })
</script>
