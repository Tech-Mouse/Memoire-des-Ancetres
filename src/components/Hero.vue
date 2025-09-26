<script setup>
import Heading from "./page/Heading.vue";
import Text from "./page/Text.vue";

const props = defineProps({
  imageSrc: {
    type: String,
    default: "/src/assets/img/template_bcg.png",
  },
  header: {
    type: String,
    default: "FAMILLE HAUTIER - ROUSSEL",
  },
  text: {
    type: String,
  }
});
</script>

<template>
  <section class="hero">
    <div class="hero--contents">
      <Heading as="h1" class="hero--contents--page-head">{{ header }}</Heading>
      <Heading as="h3" v-if="text" class="hero--contents--text">{{ text }}</Heading>
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

    &--text {
      padding-top: 2rem;
    }
  }
}
</style>
