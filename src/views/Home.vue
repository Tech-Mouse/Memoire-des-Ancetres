<script setup>
import { ref, onMounted } from "vue";
import { getAllCemeteries, getAllPeople } from "../../backend/server.js";

import Hero from "@/components/Hero.vue";
import PersonCard from "../components/PersonCard.vue";
import Section from "../components/page/Section.vue";
import Select from "../components/page/Select.vue";

const people = ref([]);
const cemeteries = ref([]);
const selectedCemetery = ref();

onMounted(async () => {
  try {
    people.value = await getAllPeople();
    cemeteries.value = await getAllCemeteries();
  } catch (e) {
    console.error("Error fetching people/cemeteries: " + e);
  }
});
</script>

<template>
  <Hero text="Informations concernant les personnes inhumées ici" />
  <Section>
    <Select
      name="cemeteries"
      label="Cimetière"
      :options="cemeteries"
      valueKey="cemetery_id"
      labelKey="cemetery_name"
      modelValue="1"
      v-model="selectedCemetery"
      class="cemetery--select"
    />
    <div class="person-cards">
      <PersonCard
        v-for="person in people"
        :key="person.person_id"
        :name="person.name + ' ' + person.surname"
        :birth="person.date_of_birth"
        :death="person.date_of_death"
        :photo="person.image"
        :link="person.person_id.toString()"
        :selectedCemetery="selectedCemetery"
      />
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.cemetery {
  &--select {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.person-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}
</style>
