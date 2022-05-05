# Vue 3 + TypeScript + Vite

This is a Vue 3 and TypeScript project done with Vite. The project uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more. Also, it uses [miragejs](https://miragejs.com/) to serve mock APIs.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Run Steps

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `npm i`
2. Run `npm run dev`

## Demo Link

Heroku Demo [Link](https://data-guard-challenge-sandipon.herokuapp.com/)
