<script setup>
import { ref, onMounted, watch } from "vue";
import { getSortedPeopleByCemeteryId, getAllFamilies, getPeopleByFamilyId, getCemeteriesByFamilyId } from "../../backend/server.js";

import Hero from "@/components/Hero.vue";
import PersonCard from "../components/PersonCard.vue";
import Section from "../components/page/Section.vue";
import Select from "../components/page/Select.vue";
import Legend from "../components/Legend.vue";

const people = ref([]);
const cemeteries = ref([]);
const selectedCemetery = ref();
const families = ref([]);
const selectedFamily = ref();

onMounted(async () => {
  try {
    families.value = await getAllFamilies();
  } catch (e) {
    console.error("Error fetching families: " + e);
  }
});



watch([selectedFamily, selectedCemetery], async ([newFamilyId, newCemeteryId]) => {
  if (!newFamilyId) return;
  if (!newCemeteryId) return;
  people.value = await getPeopleByFamilyId(newFamilyId);
  cemeteries.value = await getCemeteriesByFamilyId(newFamilyId);
  if (! cemeteries.value.some(cemetery => cemetery.cemetery_id === newCemeteryId)) {
    selectedCemetery.value = cemeteries.value.length > 0 ? cemeteries.value[0].cemetery_id : 1;
    return;
  } 
  people.value = await getSortedPeopleByCemeteryId(newCemeteryId, people.value);
}, {immediate: true}
);
</script>

<template>
  <Hero text="Informations concernant les personnes inhumées ici" />
  <Section class="selectors">
    <Select
      name="families"
      label="Famille"
      :options="families"
      valueKey="family_id"
      labelKey="family_name"
      modelValue="1"
      v-model="selectedFamily"
      class="cemetery--select"
    />
    <Select
      name="cemeteries"
      label="Cimetière"
      :options="cemeteries"
      valueKey="cemetery_id"
      labelKey="cemetery_name"
      :modelValue="selectedCemetery ? selectedCemetery.toString() :'1'"
      v-model="selectedCemetery"
      class="cemetery--select"
    />
    <Legend boxColor="#a9c2a7" text="Personnes dans la tombe sélectionée" />
    <Legend boxColor="#cfb5a9"text="Autres personnes" />

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
  }
}

.person-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.selectors {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
</style>
