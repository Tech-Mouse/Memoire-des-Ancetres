<script setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import { toUpperCaseFirstLetter } from "../../backend/utils.js";

import Link from "./page/Link.vue";
import Text from "./page/Text.vue";
import Heading from "./page/Heading.vue";

const route = useRoute();
const family_name = ref(toUpperCaseFirstLetter(route.params.family_name) || "Hautier & Seguin");
const familleText = ref(family_name.value.length < 10 ? "Famille" : "Familles");

watch(
  () => route.params.family_name,
  (newFamilyName) => {
    if (!newFamilyName)  {
      family_name.value = "Hautier & Seguin";
      familleText.value = "Familles";
    }
    else {
      family_name.value = toUpperCaseFirstLetter(newFamilyName);
      familleText.value = family_name.value.length < 10 ? "Famille" : "Familles";
    }
    
  }
);

</script>

<template>
  <footer>
    <Text
      >This page has been created in memory of all ancestors of the {{ family_name }}
      family.</Text
    >
    <Text
      >Dating back a few centuries, it contains all important information that
      has been carefully pieced together by the loving members.</Text
    >
    <Text>Always in our hearts.</Text>
    <Heading as="h3" pb="1">{{familleText}} {{ family_name }}</Heading>
    <Text
      >© {{ new Date().getFullYear() }},
      <Link href="https://github.com/Tech-Mouse" variant="nav"
        >Creator/Documentation</Link
      >,
      <Link href="mailto:erkseg1@gmail.com" variant="nav">Contact</Link></Text
    >
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
