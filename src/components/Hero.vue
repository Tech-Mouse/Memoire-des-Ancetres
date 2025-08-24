<script setup>
import Heading from "./page/Heading.vue";

const props = defineProps({
  imageSrc: {
    type: String,
    default: "/src/assets/img/template_bcg.png",
  },
  text: {
    type: String,
    default: "Bienvenue",
  },
});
</script>

<template>
  <section class="hero">
    <div class="hero--contents">
      <Heading as="h1" class="hero--contents--page-head">{{ text }}</Heading>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8rem 0;
  background: center/cover no-repeat;
  background-color: $secondaryColor;

  &--contents {
    color: $lightText;
    text-align: center;
    text-shadow: 1px 1px 4px black;

    &--page-head {
      margin: 0 2rem;
    }
  }
}
</style>
