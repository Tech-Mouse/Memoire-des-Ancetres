<script setup>
import { ref, onMounted } from "vue";

import Hero from "@/components/Hero.vue";
import PersonCard from "../components/PersonCard.vue";
import PersonCardCompact from "../components/PersonCardCompact.vue";
import Section from "../components/page/Section.vue";

const people = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/people");
    people.value = await res.json();
  } catch (e) {
    console.error("Error fetching people: " + e);
  }
});
</script>

<template>
  <Hero />
  <Section>
    <div class="person-cards">
      <PersonCard
        v-for="person in people"
        :key="person.person_id"
        :name="person.name + ' ' + person.surname"
        :birth="person.date_of_birth"
        :death="person.date_of_death"
        :photo="person.image"
        :link="person.person_id.toString()"
      />
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.person-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}
</style>
