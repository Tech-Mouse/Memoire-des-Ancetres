<script setup>
const props = defineProps({
  boxColor: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});
</script>

<template>
  <div class="legend">
    <div class="legend--box" :style="{ backgroundColor: boxColor }" />
    <Text>{{ text }}</Text>
  </div>
</template>

<style lang="scss" scoped>
.legend {
  display: flex;
  align-items: center;

  &--box {
    width: 30px;
    height: 30px;
    margin: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 0 5px $shadowColor;
  }
}
</style>
