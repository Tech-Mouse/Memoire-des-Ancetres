<script setup>

import { computed } from 'vue'
import Link from './page/Link.vue';

const images = "../src/assets/img/";

const props = defineProps({
    toDisplayInfo: String,
    toDisplay: Array
});

const dynamicFlex = computed(() => {
    if (props.toDisplayInfo == "Parents" || props.toDisplayInfo == "Children") {
        return props.toDisplay.length === 1 ? 'flex-start' : 'flex-around'
    }
    return 'flex-column'
})

const dynamicCenter = computed(() => {
    if (props.toDisplayInfo == "Spouses") {
        return 'fit'
    }
    return 'none'
})

</script>

<template>
    <section v-if="toDisplay && toDisplay.length" :class="dynamicCenter">
        <div :class="dynamicFlex">
            <Link :href="'/person/' + (oneInstance.person_id).toString()" v-if="toDisplay && toDisplay.length" class="content--info--personal" v-for="oneInstance in toDisplay" :key="oneInstance.person_id">
                <img :src="images + (oneInstance.photo || 'template_person.png')" width="80" height="80">
                <div class="flex">
                    <div class="content--info--personal--name">
                        {{ oneInstance.name + ' ' + oneInstance.surname }}
                    </div>
                    <div class="content--info--personal--dates">
                        <span v-if="oneInstance.date_of_birth && oneInstance.date_of_birth.length" class="content--info--personal--dates--birth">{{ oneInstance.date_of_birth }}</span>
                    </div>
                </div>
                
            </Link>
        </div>
        
    </section>
</template>

<style lang="scss" scoped>

    a {
        width: fit-content;
        padding: 0.5rem;
    }

    section {
        width: 100%;
    }

    img {
        border-radius: 50%;
        border: 1px solid $lightHighlight;
        max-width: 80px;
        max-height: 80px;
        width: 5vw;
        height: 5vw;

        @media (max-width: $mobileTreshold) {
            max-width: 60px;
            max-height: 60px;
            min-width: 40px;
            min-height: 40px;
            width: 8vw;
            height: 8vw;
        }
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
                width: fit-content;
                align-items: center;

                &.person {
                    font-size: 15pt;

                    p {
                        color: $primaryColor;
                    }
                    
                }

                &--name {
                    font-size: 10pt;
                    text-align: center;
                }

                &--dates {
                    display: flex;
                    padding: 0.5rem 0;
                    justify-content: center;

                    span {
                        font-size: 10pt;
                        display: flex;
                        position: relative;
                    }

                    &--birth::before {
                        content: 'né(e)';
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

    div.flex {
        display: flex;
    }

    div.flex-start {
        justify-content: flex-start;
    }

    div.flex-around {
        display: flex;
        justify-content: space-around;
    }

    div.flex-column {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        height: 100%;
        width: fit-content;
        overflow-y: auto;
    }

    div.flex {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        align-items: center;
    }

    section.fit {
        width: fit-content;
    }


</style>