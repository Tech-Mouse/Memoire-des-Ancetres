<script setup>
import { ref, onMounted, computed } from "vue";
import Text from "./page/Text.vue";
import PersonCardCompact from "./PersonCardCompact.vue";

const images = "/Memoire-des-Ancetres/img/people/";

const props = defineProps({
  person: Object,
  parents: Array,
  spouses: Array,
  children: Array,
  categories: Array,
});

const dynamicFlex = computed(() => {
  return props.spouses.length > 0 ? "none" : "center";
});
</script>

<template>
  <div v-if="person" class="person">
    <!-- Parents of person -->
    <div class="person--parents">
      <Text>Parents:</Text>
      <div v-if="parents.length > 0" class="person--parents--cards">
        <PersonCardCompact
          v-for="oneInstance in parents"
          :key="oneInstance.person_id"
          :photo="oneInstance.image"
          alt=""
          :name="oneInstance.name + ' ' + oneInstance.surname"
          :link="oneInstance.person_id.toString()"
        />
      </div>
      <Text v-else>Pas d'information sur les parents</Text>
    </div>
    <!-- Person with spouses -->
    <div class="person-with-spouses">
      <!-- Person -->
      <div class="person--box">
        <div class="person--card">
          <img
            :src="person.image || images + 'template_person.svg'"
            alt=""
            class="person--card--photo"
          />
          <Text class="person--card--name">{{
            person.name + " " + person.surname
          }}</Text>
          <div
            v-if="
              (person.date_of_birth && person.date_of_birth.length > 0) ||
              (person.date_of_death && person.date_of_death.length > 0)
            "
            class="person--card--year"
          >
            <Text
              v-if="person.date_of_birth && person.date_of_birth.length > 0"
              class="person--card--year__dob"
              >{{ person.date_of_birth }}</Text
            >
            <Text
              v-if="person.date_of_death && person.date_of_death.length > 0"
              class="person--card--year__dod"
              >{{ person.date_of_death }}</Text
            >
          </div>
        </div>
      </div>
      <!-- Spouses -->
      <div class="person--spouses">
        <Text>Conjoint(e):</Text>
        <div class="person--spouses--cards">
          <PersonCardCompact
            v-for="oneInstance in spouses"
            :key="oneInstance.person_id"
            :photo="oneInstance.image"
            alt=""
            :name="oneInstance.name + ' ' + oneInstance.surname"
            :link="oneInstance.person_id.toString()"
          />
        </div>
      </div>
    </div>
    <!-- Persons children -->
    <div class="person--children">
      <Text>Enfant(s):</Text>
      <div class="person--children--cards">
        <PersonCardCompact
          v-for="oneInstance in children"
          :key="oneInstance.person_id"
          :photo="oneInstance.image"
          alt=""
          :name="oneInstance.name + ' ' + oneInstance.surname"
          :link="oneInstance.person_id.toString()"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.person {
  border-radius: 10px;
  box-shadow: 0 0 10px $shadowColor;
  padding: 0 1rem;

  &--parents {
    border-bottom: 1px solid $secondaryColor;
    padding: 1rem 0;

    &--cards {
      padding-top: 1rem;
      display: flex;
      justify-content: space-around;
    }
  }

  &-with-spouses {
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid $secondaryColor;

    @media (max-width: $mobileTreshold) {
      flex-wrap: wrap;
    }
  }

  &--box {
    border-right: 1px solid $secondaryColor;
    width: 80%;
    display: grid;
    place-items: center;

    @media (max-width: $mobileTreshold) {
      border-bottom: 1px solid $secondaryColor;
      border-right: none;
      width: 100%;
    }
  }

  &--card {
    display: block;
    background-color: $tertiaryColor;
    border-radius: 10px;
    box-shadow: 0 0 10px $shadowColor;
    margin: 1rem;
    max-width: 75%;

    &:hover {
      .person-compact-card--name {
        overflow: visible;
        white-space: normal;
        height: auto;
      }
    }

    &--photo {
      object-fit: cover;
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &--name {
      text-align: center;
      padding: 0.3rem;
      color: $darkText;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--year {
      display: flex;
      justify-content: center;
      gap: 1rem;
      position: relative;
      margin-top: 1rem;
      font-size: 16px;

      &__dob:before {
        content: "né(e):";
        position: absolute;
        top: -15px;
        font-size: 10px;
      }

      &__dod:before {
        content: "déc.:";
        position: absolute;
        top: -15px;
        font-size: 10px;
      }
    }
  }

  &--spouses {
    padding: 1rem;

    &--cards {
      padding-top: 1rem;
      display: grid;
      gap: 1rem;
    }
  }

  &--children {
    padding: 1rem 0;

    &--cards {
      padding-top: 1rem;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
