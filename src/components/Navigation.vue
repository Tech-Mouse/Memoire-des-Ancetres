<script setup>
import { ref, onMounted } from 'vue';
import Link from './page/Link.vue';
import But from './page/Button.vue';

const people = ref([]);

  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/people');
      people.value = await res.json();
    } catch (e) {
      console.error("Error fetching people: " + e);
    }
    
  });

const show = ref(false);

const toggle = (event) => {
    show.value = ! show.value;
};

</script>

<template>
    <nav :class="{'open': show}" class="navbar">
        <Link href="/" class="navbar--logo" :class="{'on-left': show}">
            <h1 class="navbar--logo--house" :class="{'on-left': show}">⌂</h1>
        </Link>

        <But text="☰" class="navbar--menu" @click="toggle" />
    </nav>
    <nav :class="{'open': show }" class="navigation">
        <ul class="navigation--links">
            <li><Link href="/" variant="nav">Home</Link></li>
            <li v-for="person in people" :key="person.person_id"><Link  :href="'/person/' + person.name + ' ' + person.surname" :state="[person]" variant="nav">{{person.name + ' ' + person.surname}}</Link></li>
        </ul>
    </nav>
    

</template>

<style lang="scss" scoped>

.navbar {
    display: flex;
    align-items: center;
    padding: 2rem 0 2.5rem;
    position: relative;
    transition: justify-content 0.5s ease-in-out;
    background: rgb(5,12,13);
    background: linear-gradient(90deg, rgba(5,12,13,1) 0%, rgba(25,34,34,1) 9%, rgba(32,38,37,1) 16%, rgba(53,54,50,1) 23%, rgba(58,60,53,1) 37%, rgba(74,68,56,1) 48%, rgba(51,52,46,1) 56%, rgba(58,55,48,1) 65%, rgba(42,46,42,1) 76%, rgba(37,44,41,1) 84%, rgba(34,42,41,1) 91%, rgba(10,18,17,1) 100%); 
    z-index: 10;

    &.open {
        justify-content: flex-start;
    }

    &--logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        transition: left 0.4s ease-in-out, transform 0.4s ease-in-out;

        &.on-left {
            left: 0.2rem;
            transform: translateX(0);
        }

        &--house {
            color: white;
            text-shadow: 1px 1px 4px black;
            margin-left: 0;

            &:hover {
                color: $lightHighlight;
            }

            &.on-left {
                margin-left: 1rem;
            }
        }
    }

    &--menu {
        position: absolute;
        margin: 0.2rem 0;
        right: 0rem;
        background: none;
        border: none;
        color: white;
        text-shadow: 1px 1px 4px black;
        font-size: 3.2em;
        padding: 0.5rem;

        &:hover {
            color: $lightHighlight;
            cursor: pointer;
        }

        &:focus {
            outline: none;
        }
    }
}

.navigation {
    position: absolute;
    top: 4.5rem;
    left: 0;
    right: 0;
    padding: 0;
    background: #1a1f1e;
    transform: translateY(-100%);
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
    visibility: hidden;
    opacity: 1;
    z-index: 1;

    &.open {
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
    }

    &--links {
        list-style: none;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.1rem;
        z-index: 2;

        li {
            padding: 1rem;
            font-size: 20pt;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }

    }
}

</style>