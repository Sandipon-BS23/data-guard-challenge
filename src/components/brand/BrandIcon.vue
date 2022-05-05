<template>
    <bars v-bind="$attrs" v-if="name == 'bars'" />
    <logo v-bind="$attrs" v-if="name == 'logo'" />

    <!-- icons for the bottom toggling button-->
    <checkCircle v-bind="$attrs" v-if="name == 'checkCircle'" />
    <cross-circle v-bind="$attrs" v-if="name == 'cross-circle'" />

    <!-- icons for side bar menu section -->
    <qrcode v-bind="$attrs" v-if="name == 'icon-marketing'" />
    <euro v-bind="$attrs" v-if="name == 'icon-finance'" />
    <check v-bind="$attrs" v-if="name == 'icon-people'" />
</template>

<script setup lang="ts">
import logo from './icons/logo.vue'
import qrcode from './icons/qrcode.vue'

import euro from './icons/euro.vue'
import check from './icons/check.vue'
import bars from './icons/bars.vue'

import checkCircle from './icons/checkCircle.vue'
import crossCircle from './icons/crossCircle.vue'

const props = defineProps({
    name: String,
})
</script>

<style lang="stylus" scoped></style>
