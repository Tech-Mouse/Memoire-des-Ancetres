<script setup>
import { ref, onMounted } from 'vue';
import Category from './Category.vue';

const images = "../src/assets/img/";

const props = defineProps({
    person_id: {
        type: String
    }
});

let categories = ref(null);
let spouses = ref(null);
let person = ref(null);

onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/people/' + props.person_id);
      person.value = await res.json();
    } catch (e) {
      console.error("Error fetching person: " + e);
    }

    try {
      const res = await fetch('http://localhost:3000/api/people/' + props.person_id + '/categories');
      categories.value = await res.json();
    } catch (e) {
      console.error("Error fetching categories: " + e);
    }

    try {
      const res = await fetch('http://localhost:3000/api/people/' + props.person_id + '/spouses');
      spouses.value = await res.json();
    } catch (e) {
      console.error("Error fetching spouses: " + e);
    }

    person.photo ? person.photo : 'template_person.png';
  });
</script>

<template>
    <section v-if="person">
        <div class="center">
            <div class="content">
                <main>
                    <img :src="images + (person.photo || 'template_person.png')" width="225" height="225">
                    <div class="content--info">
                        <div class="content--info--personal">
                            <div class="content--info--personal--name">
                                {{ person.name + ' ' + person.surname }}
                            </div>
                            <div class="content--info--personal--dates">
                                <span class="content--info--personal--dates--birth">{{ person.date_of_birth }}</span>
                                <span class="content--info--personal--dates--death">{{ person.date_of_death }}</span>
                            </div>
                        </div>
                        <div v-if="spouses" class="content--info--personal spouse" v-for="spouse in spouses" :key="spouse.person_id">
                            <p>Spouse:</p>
                            <div class="content--info--personal--name">
                                {{ spouse.name + ' ' + spouse.surname }}
                            </div>
                            <div class="content--info--personal--dates">
                                <span class="content--info--personal--dates--birth">{{ spouse.date_of_birth }}</span>
                                <span class="content--info--personal--dates--death">{{ spouse.date_of_death }}</span>
                            </div>
                        </div>
                    </div>
                </main>
                <Category v-if="categories" v-for="category in categories" :key="category.category_id" :name="category.name" :value="category.text" />
            </div>    
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    main {
        display: flex;
        justify-content: center;
        gap: 10rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        @media (max-width: $mobileTreshold) {
            gap: 5rem;
        }
    }

    img {
        border-radius: 50%;
        align-self: flex-start;
        border: 1px solid $lightHighlight;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 1rem;
        max-width: 60%;

        @media (max-width: $mobileTreshold) {
            max-width: 90%;
        }
        
        &--info {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            &--personal {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                &.spouse {
                    font-size: 15pt;

                    p {
                        color: $primaryColor;
                    }
                    
                }

                &--name {
                    font-size: 26pt;
                }

                &--dates {
                    display: flex;
                    justify-content: space-around;
                    padding: 0.5rem 0;

                    span {
                        font-size: 18pt;
                        display: flex;
                        position: relative;
                    }

                    &--birth::before {
                        content: 'née';
                        position: absolute;
                        top: -10px;
                        left: -10px;
                        font-size: 8pt;
                    }

                    &--death::before {
                        content: 'déc';
                        position: absolute;
                        top: -10px;
                        left: -10px;
                        font-size: 8pt;
                    }
                }
            }
        }

    }

    
</style>