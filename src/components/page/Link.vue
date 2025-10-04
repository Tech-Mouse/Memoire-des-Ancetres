<script setup>
import { computed } from "vue";

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

const isExternal = computed(() => {
  return (
    props.href.startsWith("http://") ||
    props.href.startsWith("https://") ||
    props.href.startsWith("mailto:")
  );
});
</script>

<template>
  <component
    :is="isExternal ? 'a' : 'router-link'"
    :to="isExternal ? null : href"
    :href="isExternal ? href : null"
    :target="isExternal ? '_blank' : '_self'"
    :class="variant"
    ><slot
  /></component>
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
