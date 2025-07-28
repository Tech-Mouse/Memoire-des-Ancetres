<script setup>
import { ref, onMounted, computed } from 'vue';
import PersonRelation from './PersonRelation.vue';
import Category from './Category.vue';
import Link from './page/Link.vue';

const images = "../src/assets/img/";

const props = defineProps({
    person: Object,
    parents: Array,
    spouses: Array,
    children: Array,
    categories: Array
});

const dynamicFlex = computed(() => {
    return props.spouses.length > 0 ? 'none' : 'center'
})

props.person.photo ? props.person.photo : 'template_person.png';
</script>

<template>
    <section v-if="person">
        <div class="center">
            <div class="content">
                <main>
                    <PersonRelation :to-display="parents" to-display-info="Parents" />

                    <div :class="dynamicFlex" class="flex">

                        <div v-if="spouses && spouses.length" class="empty"></div>

                        <div class="flex-inside">
                            <div class="fit">
                                <img :src="images + (person.photo || 'template_person.png')" width="250" height="250">
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
                                </div>
                            </div>

                            <div v-if="spouses && spouses.length" class="spacer-line"></div>

                            <PersonRelation :to-display="spouses" to-display-info="Spouses"/>

                        </div>

                        
                    </div>

                    
                    
                        
                        <PersonRelation :to-display="children" to-display-info="Children" />
                    
                </main>
                <Category v-if="categories && categories.length" v-for="category in categories" :key="category.category_id" :name="category.name" :value="category.text" />
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
        width: 100%;
        gap: 3rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;

        @media (max-width: $mobileTreshold) {
            gap: 5rem;
        }
    }

    img {
        border-radius: 50%;
        max-width: 250px;
        max-height: 250px;
        width: 15vw;
        height: 15vw;
        border: 1px solid $lightHighlight;

        @media (max-width: $mobileTreshold) {
            max-width: 125px;
            max-height: 125px;
            min-width: 100px;
            min-height: 100px;
            width: 20vw;
            height: 20vw;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 1rem;
        margin: 0 2rem;
        width: 80%;

        @media (max-width: $mobileTreshold) {
            max-width: 90%;
        }
        
        &--info {
            margin-top: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            &--personal {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                &.person {
                    font-size: 15pt;

                    p {
                        color: $primaryColor;
                    }
                    
                }

                &--name {
                    font-size: 26pt;
                    text-align: center;
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

    .fit {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        padding: 0.5rem;
    }

    .flex {
        display: flex;
        width: 100%;
    }

    .flex-inside {
        display: flex;
    }

    .spacer-line {
        position: relative;
        flex-grow: 1;
        width: 20vw;
        min-width: 1%;
        height: 100%;
        display: flex;
        align-items: center;
        // padding: 0 1rem;

        &::before {
            content: "";
            height: 2px;
            border-top: 2px dashed $lightHighlight;
            width: 100%;
        }
    }

    .flex > * {
        min-width: 0;
    }

    .empty {
        width: 40%;
    }

    
</style>