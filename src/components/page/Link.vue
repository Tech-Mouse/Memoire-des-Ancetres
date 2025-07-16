<script setup>
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        href: {
            type: String,
            default: "/"
        },
        variant: {
            type: String,
            default: "default"
        },
    });
</script>

<template>
    <router-link :to="href" :class="variant"><slot /></router-link>
</template>

<style lang="scss" scoped>

    .default {
        color: black;
        text-decoration: none;

        &:visited {
            color: black;
            text-decoration: none;
        }
    }

    .nav {
        color: white;
        text-decoration: none;

        &:hover {
            color: $lightHighlight;
            cursor: pointer;
        }
    }

    .footer {
        color: rgb(180, 180, 180);
        text-decoration: none;
    }

</style>