<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
section {
  padding: 2rem 10rem;

  @media (max-width: $mobileTreshold) {
    padding: 2rem 2rem;
  }
}
</style>
