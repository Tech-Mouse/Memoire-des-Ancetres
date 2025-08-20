<script setup>
import { ref, onMounted } from "vue";
import Link from "./page/Link.vue";
import Heading from "./page/Heading.vue";

const people = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/people");
    people.value = await res.json();
  } catch (e) {
    console.error("Error fetching people: " + e);
  }
});

const show = ref(false);

const toggle = (event) => {
  show.value = !show.value;
};
</script>

<template>
  <nav :class="{ open: show }" class="navbar">
    <Link href="/" class="navbar--logo">
      <Heading as="h1" innerClass="navbar--logo--house">⌂</Heading>
    </Link>

    <!-- <But text="☰" class="navbar--menu" @click="toggle" /> -->
  </nav>
  <!-- <nav :class="{ open: show }" class="navigation">
    <ul class="navigation--links">
      <li><Link href="/" variant="nav">Home</Link></li>
      <li v-for="person in people" :key="person.person_id">
        <Link
          :href="'/person/' + person.person_id"
          :state="[person]"
          variant="nav"
          >{{ person.name + " " + person.surname }}</Link
        >
      </li>
    </ul>
  </nav> -->
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 2rem 0 2.5rem;
  position: relative;
  transition: justify-content 0.5s ease-in-out;
  background: $primaryColor;
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
      color: $lightText;
      text-shadow: 1px 1px 4px black;
      margin-left: 0;

      &:hover {
        color: $tertiaryColor;
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
    color: $lightText;
    text-shadow: 1px 1px 4px black;
    font-size: 3.2em;
    padding: 0.5rem;

    &:hover {
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
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out,
    visibility 0.4s ease-in-out;
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
    }
  }
}
</style>
