<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Hero from '@/components/Hero.vue';
    import PersonDetails from '@/components/PersonDetails.vue';

    const route = useRoute();
    const person_id = ref(route.params.person_id);

    let person = ref(null);

    onMounted( async () => {
        try {
            const res = await fetch('http://localhost:3000/api/people/' + person_id.value);
            person.value = await res.json();
        } catch (e) {
            console.error("Error fetching person: " + e);
        }
    });

</script>

<template>
    <div v-if="person">
        <Hero :text="person.name + ' ' + person.surname"/>
        <PersonDetails :person_id="person_id"/>
    </div>
</template>