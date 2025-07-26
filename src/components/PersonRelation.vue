<script setup>

import Link from './page/Link.vue';

const props = defineProps({
    toDisplayInfo: String,
    toDisplay: Array
});

</script>

<template>
    <section>
        <p v-if="toDisplay && toDisplay.length"> {{ toDisplayInfo }}:</p>
        <div class="flex">
            <Link :href="'/person/' + (oneInstance.person_id).toString()" v-if="toDisplay && toDisplay.length" class="content--info--personal   spouse" v-for="oneInstance in toDisplay" :key="oneInstance.person_id">
                <div class="content--info--personal--name">
                    {{ oneInstance.name + ' ' + oneInstance.surname }}
                </div>
                <div class="content--info--personal--dates">
                    <span class="content--info--personal--dates--birth">{{ oneInstance.date_of_birth }}</span>
                    <span class="content--info--personal--dates--death">{{ oneInstance.date_of_death }}</span>
                </div>
            </Link>
        </div>
        
    </section>
</template>

<style lang="scss" scoped>

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

                &.person {
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

    div.flex {
        display: flex;
        gap: 5%;
    }


</style>