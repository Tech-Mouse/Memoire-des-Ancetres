<script setup>
  import { ref, onMounted } from 'vue';

  import PersonPreview from '@/components/PersonPreview.vue';
  import Hero from '@/components/Hero.vue';

  const people = ref([]);

  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/people');
      people.value = await res.json();
    } catch (e) {
      console.error("Error fetching people: " + e);
    }
    
  });

</script>

<template>
    <Hero />
    <section>
      <PersonPreview v-for="person in people" :name="person.name + ' ' + person.surname" :birth="person.date_of_birth" :death="person.date_of_death" :info="person.short_description" :photo="person.photo" :link="(person.person_id).toString()" />
    </section>
</template>

<style lang="scss" scoped>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

</style>

