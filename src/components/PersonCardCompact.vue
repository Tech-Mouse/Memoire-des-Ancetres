<script setup>
import Heading from "./page/Heading.vue";
import Link from "./page/Link.vue";
import Text from "./page/Text.vue";

const images = "/Memoire-des-Ancetres/src/assets/img/people/";

const props = defineProps({
  photo: {
    type: String,
  },
  alt: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});
</script>

<template>
  <Link :href="'/person/' + link" class="person-compact-card">
    <img
      :src="photo || images + 'template_person.svg'"
      :alt="alt"
      class="person-compact-card--photo"
    />
    <Text class="person-compact-card--name">{{ name }}</Text>
  </Link>
</template>

<style lang="scss" scoped>
.person-compact-card {
  display: block;
  background-color: $tertiaryColor;
  border-radius: 10px;
  box-shadow: 0 0 10px $shadowColor;
  width: 100px;

  &:hover {
    box-shadow: 0 0 20px $shadowColor;

    .person-compact-card--name {
      overflow: visible;
      white-space: normal;
      height: auto;
    }
  }

  &--photo {
    object-fit: cover;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &--name {
    text-align: center;
    font-size: 14px;
    padding: 0.3rem;
    color: $darkText;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100px - 0.3rem - 0.3rem);
  }
}
</style>
