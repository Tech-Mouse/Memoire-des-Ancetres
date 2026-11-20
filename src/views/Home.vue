<script setup>
import { ref, watch, computed } from "vue";
import { getSortedPeopleByCemeteryId, getAllFamilies, getPeopleByFamilyId, getCemeteriesByFamilyId, getAllPeopleUltimateInfo } from "../../backend/server.js";
import { useRoute, useRouter } from "vue-router";

import Hero from "@/components/Hero.vue";
import PersonCard from "../components/PersonCard.vue";
import Section from "../components/page/Section.vue";
import Select from "../components/page/Select.vue";
import Legend from "../components/Legend.vue";

const route = useRoute();
const family_name = ref(route.params.family_name || "hautier");
const router = useRouter();

const allPeople = ref([]);
const people = ref([]);
const cemeteries = ref([]);
const selectedCemetery = ref();
const families = ref([]);
const selectedFamily = ref();

let sortRequestId = 0;

// 1. Derive family people and unique cemeteries without extra watcher triggers
const familyPeople = computed(() => {
  if (!selectedFamily.value || !allPeople.value?.length) return [];
  return allPeople.value.filter((person) => person.family?.family_id === selectedFamily.value);
});

const availableCemeteries = computed(() => {
  const uniqueById = new Map();
  for (const person of familyPeople.value) {
    const cemetery = person.cemetery;
    if (cemetery?.cemetery_id && !uniqueById.has(cemetery.cemetery_id)) {
      uniqueById.set(cemetery.cemetery_id, cemetery);
    }
  }
  return Array.from(uniqueById.values());
});

// Keep cemeteries ref in sync only when availableCemeteries changes
watch(
  availableCemeteries,
  (nextCemeteries) => {
    cemeteries.value = nextCemeteries;

    if (!selectedCemetery.value) return;
    const exists = nextCemeteries.some((c) => c.cemetery_id === selectedCemetery.value);
    if (!exists) {
      selectedCemetery.value = nextCemeteries.length > 0 ? nextCemeteries[0].cemetery_id : 1;
    }
  },
  { immediate: true }
);

// 2. Sync family name and route only when selectedFamily or families changes
watch(
  [selectedFamily, families],
  ([newFamilyId, currentFamilies]) => {
    if (!newFamilyId || !currentFamilies?.length) return;

    const matchedFamily = currentFamilies.find((f) => f.family_id === newFamilyId);
    if (!matchedFamily?.family_name) return;

    const normalizedName = matchedFamily.family_name.toLowerCase();
    if (family_name.value?.toLowerCase() !== normalizedName) {
      family_name.value = matchedFamily.family_name;
      router.push({ path: `/${normalizedName}` });
    }
  },
  { immediate: true }
);

// 3. Initial load in parallel when families are empty
watch(
  families,
  async (currentFamilies) => {
    if (currentFamilies && currentFamilies.length > 0) return;

    const [loadedPeople, loadedFamilies] = await Promise.all([
      getAllPeopleUltimateInfo(),
      getAllFamilies(),
    ]);

    allPeople.value = loadedPeople;
    families.value = loadedFamilies;

    if (!loadedFamilies?.length) return;

    const targetName = family_name.value?.toLowerCase();
    const matched = targetName
      ? loadedFamilies.find((f) => f.family_name?.toLowerCase() === targetName)
      : undefined;

    selectedFamily.value = matched ? matched.family_id : loadedFamilies[0].family_id;
  },
  { immediate: true }
);

// 4. Sort only when cemetery or filtered familyPeople changes, ignoring stale responses
watch(
  [selectedCemetery, familyPeople],
  async ([newCemeteryId, currentFamilyPeople]) => {
    if (!newCemeteryId || !currentFamilyPeople.length) {
      people.value = currentFamilyPeople;
      return;
    }

    const requestId = ++sortRequestId;
    const sorted = await getSortedPeopleByCemeteryId(newCemeteryId, currentFamilyPeople);

    // Prevent older async responses from overwriting newer ones
    if (requestId === sortRequestId) {
      people.value = sorted;
    }
  },
  { immediate: true }
);

// watch([selectedFamily, selectedCemetery, families], async ([newFamilyId, newCemeteryId, newFamilies]) => {
//   if (!newFamilyId) return;
//   if (!newCemeteryId) return;
//   if (! families.value || families.value.length === 0) {
//     allPeople.value = await getAllPeopleUltimateInfo();
//     families.value = await getAllFamilies();
//     const family = families.value.find(f => f.family_name.toLowerCase() === family_name.value.toLowerCase());
//     selectedFamily.value = family ? family.family_id : families.value[0].family_id;
//     return;
//   }
//   people.value = allPeople.value.filter(person => person.family.family_id === newFamilyId);
//   cemeteries.value = Array.from(new Set(people.value.filter(person => person.cemetery.cemetery_id).map(person => person.cemetery)));

//   const oldFamilyName = families.value.find(f => f.family_id === newFamilyId)?.family_name;
//   if (family_name.value != oldFamilyName.toLowerCase()) {
//     const newFamilyName = families.value.find(f => f.family_id === newFamilyId)?.family_name;
//     family_name.value = newFamilyName;
//     router.push( {path: `/${newFamilyName.toLowerCase()}`} );
//   }
//   if (! cemeteries.value.some(cemetery => cemetery.cemetery_id === newCemeteryId)) {
//     selectedCemetery.value = cemeteries.value.length > 0 ? cemeteries.value[0].cemetery_id : 1;
//     return;
//   } 
//   people.value = await getSortedPeopleByCemeteryId(newCemeteryId, people.value);
// }, {immediate: true}
// );
</script>

<template>
  <Hero :header="'FAMILLE ' + (family_name.toLowerCase() == 'hautier' ? 'HAUTIER - ROUSSEL' : 'SEGUIN')" text="Informations concernant les personnes inhumées ici" />
  <Section class="selectors">
    <Select
      name="families"
      label="Famille"
      :options="families"
      valueKey="family_id"
      labelKey="family_name"
      :modelValue="selectedFamily ? selectedFamily.toString() : '1'"
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
        :query="{family: family_name ? family_name.toLowerCase() : 'hautier' }"
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
