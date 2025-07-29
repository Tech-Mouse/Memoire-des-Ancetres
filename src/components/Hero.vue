<script setup>

const props = defineProps({
    imageSrc: {
        type: String,
        default: '/src/assets/img/template_bcg.png'
    },
    text: {
        type: String,
        default: 'Bienvenue!'
    }
});
</script>

<template>
    <section class="hero" :style="{ backgroundImage: `url(${imageSrc})`}">
        <div class="hero--contents">
            <h1 class="hero--contents--page-head">{{ text }}</h1>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.hero {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8rem 0;
    background: center/cover no-repeat;
    box-shadow: 0 2px 6px rgb(117, 105, 87);
    margin-bottom: 2rem;

    &--contents {
        color: white;
        text-align: center;
        font: 24pt bold;
        text-shadow: 1px 1px 4px black;

        &--page-head {
            font: 62pt bolder;
            margin: 0 2rem;

            @media (max-width: $mobileTreshold) {
                font: 50pt bolder;
            }
        }
    }
}
</style>