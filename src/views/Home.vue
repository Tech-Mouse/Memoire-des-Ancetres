<script setup>
import { ref, onMounted } from "vue";
import { getAllPeople } from "../../backend/server.js";

import Hero from "@/components/Hero.vue";
import PersonCard from "../components/PersonCard.vue";
import Section from "../components/page/Section.vue";

const people = ref([]);

onMounted(async () => {
  try {
    people.value = await getAllPeople();
  } catch (e) {
    console.error("Error fetching people: " + e);
  }
});
</script>

<template>
  <Hero text="Informations concernant les personnes inhumées ici"/>
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
