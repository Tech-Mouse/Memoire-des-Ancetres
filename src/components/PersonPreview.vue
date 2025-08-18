<script setup>
import Link from './page/Link.vue';
import Text from './page/Text.vue';

const images = "src/assets/img/";

const props = defineProps({
    photo: {
        type: String,
        default: 'template_person.png'
    },
    name: {
        type: String
    },
    birth: {
        type: [String, Number]
    },
    death: {
        type: [String, Number]
    },
    info: {
        type: String
    },
    link: {
        type: String
    }
});

</script>

<template>
        <Link :href="'/person/' + link" class="person">
            <img class="person--photo" :src="images + photo" width="100" height="100">
            <div class="person--details">
                <Text>{{ name }}</Text>
                <div class="person--details--year">
                    <span v-if="birth && birth.length" class="person--details--year--birth">{{ birth }}</span>
                    <span v-if="death && death.length" class="person--details--year--death">{{ death }}</span>
                </div>
                <div class="person--details--about">{{ info }}</div>
            </div>
        </Link>
</template>

<style lang="scss" scoped>

    .person {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 28%;
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 10%;
        background-color: $secondaryColor;
        box-shadow: 1px 1px 3px $lightHighlight, 
                  -1px -1px 3px $lightHighlight;
        gap: 0.5rem;

        &:hover {
            box-shadow: 1px 1px 3px $darkHighlight, 
                  -1px -1px 3px $darkHighlight;
        }

        @media (max-width: $mobileTreshold) {
            width: 90%;
            border-radius: 10%;
        }

        @media (min-width: ($mobileTreshold - 100px) ) {
            border-radius: 5%;
        }

        &--photo {
            border-radius: 50%;
            align-self: flex-start;
            border: 1px solid $lightHighlight;
        }

        &--details {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 0.5rem;
            align-items: flex-start;
            max-width: 75%;
            
            p {
                font-size: 17pt;
            }

            &--year {
                display: flex;
                justify-content: space-around;
                padding: 0.5rem;
                gap: 0.5rem;

                span {
                    position: relative;
                    font-size: 18pt;
                    display: flex;
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

            &--about {
                word-wrap: break-word;
                white-space: pre-wrap;
                word-break: break-all;
            }
        }
    }
</style>