<script setup>
import { ref, onMounted, watch } from "vue";
import { getAllCemeteries, getSortedPeopleByCemeteryId } from "../../backend/server.js";

import Hero from "@/components/Hero.vue";
import PersonCard from "../components/PersonCard.vue";
import Section from "../components/page/Section.vue";
import Select from "../components/page/Select.vue";
import Legend from "../components/Legend.vue";

const people = ref([]);
const cemeteries = ref([]);
const selectedCemetery = ref();

onMounted(async () => {
  try {
    people.value = await getSortedPeopleByCemeteryId(selectedCemetery.value);
    cemeteries.value = await getAllCemeteries();
  } catch (e) {
    console.error("Error fetching people/cemeteries: " + e);
  }
});

watch(selectedCemetery, async (newCemeteryId) => {
  if (!newCemeteryId) return;
  people.value = await getSortedPeopleByCemeteryId(newCemeteryId);
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
    <Legend boxColor="#a9c2a7" text="Personnes dans la tombe sélectionée" />
    <Legend
      boxColor="#cfb5a9"
      text="Personnes dans les tombes non sélectionées"
    />
  </Section>
</template>

<style lang="scss" scoped>
.cemetery {
  &--select {
    text-align: center;
  }
}

.person-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
}
</style>
