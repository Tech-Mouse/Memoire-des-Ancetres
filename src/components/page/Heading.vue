<script>
export default {
  props: {
    as: {
      type: String,
      required: true,
      default: "h1",
      validator: (value) =>
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value),
    },
    pb: {
      type: String,
      required: false,
      default: "0",
    },
    innerClass: {
      type: String,
      required: false,
    },
  },
};
</script>

<template>
  <component :is="as" :style="{ paddingBottom: `${pb}rem` }" :class="innerClass"
    ><slot
  /></component>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 4rem;

  @media (max-width: $mobileTreshold) {
    font-size: 3rem;
  }
}

h2 {
  font-size: 3rem;

  @media (max-width: $mobileTreshold) {
    font-size: 2rem;
  }
}

h3 {
  font-size: 2rem;

  @media (max-width: $mobileTreshold) {
    font-size: 1.5rem;
  }
}

h4 {
  font-size: 1.5rem;

  @media (max-width: $mobileTreshold) {
    font-size: 1.1rem;
  }
}

h5 {
  font-size: 1.15rem;

  @media (max-width: $mobileTreshold) {
    font-size: 1rem;
  }
}

h6 {
  font-size: 0.75rem;

  @media (max-width: $mobileTreshold) {
    font-size: 0.8rem;
  }
}
</style>
