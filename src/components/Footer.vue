<script setup>
import Link from "./page/Link.vue";
import Text from "./page/Text.vue";
import Heading from "./page/Heading.vue";
</script>

<template>
  <footer>
    <Text
      >This page has been created in memory of all ancestors of the Seguin
      family.</Text
    >
    <Text
      >Dating back a few centuries, it contains all important information that
      has been carefully pieced together by the loving members.</Text
    >
    <Text>Always in our hearts.</Text>
    <Heading as="h3" pb="1">Famille Seguin</Heading>
    <Text>© 2025</Text>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: 1.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px black;
  background-color: $secondaryColor;
  line-height: 2rem;
  color: $lightText;
}
</style>
