<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import Hero from "@/components/Hero.vue";
import PersonDetails from "@/components/PersonDetails.vue";
import Section from "../components/page/Section.vue";

const route = useRoute();
const person_id = ref(route.params.person_id);

const person = ref(null);
const parents = ref([]);
const spouses = ref([]);
const categories = ref([]);
const children = ref([]);

const fetchPerson = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/people/${id}`);
    if (res.ok) {
      person.value = await res.json();
    } else {
      throw "Person with id " + id + " not found";
    }

    const resParents = await fetch(
      `http://localhost:3000/api/people/${id}/parents`
    );
    parents.value = await resParents.json();

    const resSpouses = await fetch(
      `http://localhost:3000/api/people/${id}/spouses`
    );
    if (resSpouses.ok) {
      spouses.value = (await resSpouses.json()).filter((s) => s.person_id);
    } else {
      spouses.value = [];
    }

    const resCategories = await fetch(
      `http://localhost:3000/api/people/${id}/categories`
    );
    categories.value = await resCategories.json();

    const resChildren = await fetch(
      `http://localhost:3000/api/people/${id}/children`
    );
    children.value = await resChildren.json();
  } catch (e) {
    console.error("Error fetching person: " + e);
  }
};

onMounted(() => {
  fetchPerson(person_id.value);
});

// Re-fetch if the route param changes
watch(
  () => route.params.person_id,
  (newId) => {
    person_id.value = newId;
    fetchPerson(newId);
  }
);
</script>

<template>
  <div v-if="person">
    <Hero :text="person.name + ' ' + person.surname" />
    <Section>
      <PersonDetails
        :person="person"
        :parents="parents"
        :spouses="spouses"
        :categories="categories"
        :children="children"
      />
    </Section>
  </div>
  <div v-else>Unknown error</div>
</template>
