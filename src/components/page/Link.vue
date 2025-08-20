<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  href: {
    type: String,
    default: "/",
  },
  variant: {
    type: String,
    default: "default",
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
  color: $lightText;
  text-decoration: none;

  &:hover {
    color: $tertiaryColor;
    cursor: pointer;
  }
}

.footer {
  color: $lightText;
  text-decoration: none;
}
</style>
