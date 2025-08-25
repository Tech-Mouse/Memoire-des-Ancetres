<script setup>
import Heading from "./page/Heading.vue";
import Link from "./page/Link.vue";
import Text from "./page/Text.vue";

const images = "/Memoire-des-Ancetres/img/people/";

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
  birth: {
    type: [String, Number],
  },
  death: {
    type: [String, Number],
  },
  link: {
    type: String,
  },
});
</script>

<template>
  <Link :href="'/person/' + link" class="person-card">
    <img
      :src="photo || images + 'template_person.svg'"
      :alt="alt"
      class="person-card--photo"
    />
    <div class="person-card--information">
      <Heading as="h5" pb="1.5" innerClass="person-card--header">{{
        name
      }}</Heading>
      <div class="person-card--year">
        <Text v-if="birth" class="person-card--year__dob">{{ birth }}</Text>
        <Text v-if="death" class="person-card--year__dod">{{ death }}</Text>
      </div>
    </div>
  </Link>
</template>

<style lang="scss" scoped>
.person-card {
  background-color: $tertiaryColor;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 10px $shadowColor;
  width: 380px;
  height: 100px;

  &:hover {
    box-shadow: 0 0 20px $shadowColor;
  }

  &--photo {
    max-width: 100px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &--information {
    padding: 1rem;
    color: $darkText;
  }

  &--header {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 230px;

    @media (max-width: $mobileTreshold) {
      width: 179px;
    }
  }

  &--year {
    position: relative;
    display: flex;
    gap: 1rem;

    &__dob:before {
      content: "né(e):";
      position: absolute;
      top: -15px;
      font-size: 10px;
    }

    &__dod:before {
      content: "déc.:";
      position: absolute;
      top: -15px;
      font-size: 10px;
    }
  }
}
</style>
