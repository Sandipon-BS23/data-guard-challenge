<template>
    <bars v-bind="$attrs" v-if="name == 'bars'" />
    <logo v-bind="$attrs" v-if="name == 'logo'" />
    <qrcode v-bind="$attrs" v-if="name == 'qrcode'" />
    <euro v-bind="$attrs" v-if="name == 'euro'" />
    <check v-bind="$attrs" v-if="name == 'check'" />
</template>

<script setup lang="ts">
import logo from './icons/logo.vue'
import qrcode from './icons/qrcode.vue'

import euro from './icons/euro.vue'
import check from './icons/check.vue'
import bars from './icons/bars.vue'

const props = defineProps({
    name: String,
})
</script>

<style lang="stylus" scoped></style>
