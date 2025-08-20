<script setup>
import Heading from "./page/Heading.vue";
import Text from "./page/Text.vue";

const props = defineProps({
  name: {
    type: String,
    default: "Category",
  },
  value: {
    type: String,
    default: "Lorem Ipsum",
  },
});
</script>

<template>
  <div class="category">
    <Heading as="h4" class="category--name">
      {{ name }}
    </Heading>
    <Text class="category--text">
      {{ value }}
    </Text>
  </div>
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 10px $shadowColor;
  padding: 1rem;
  gap: 1rem;

  &--name {
    color: $primaryColor;
  }

  &--text {
    word-wrap: break-word;
    white-space: pre-wrap;
    line-height: 1.2;
  }
}
</style>
