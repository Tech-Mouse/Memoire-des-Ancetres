<script setup>
    import Text from '../components/page/Text.vue';
</script>

<template>
    <section>
        <Text>This page has been created in memory of all ancestors of the Seguin family.</Text>
        <Text>Dating back a few centuries, it contains all important information that has been carefully pieced together by the loving members.</Text>
        <Text class="spaced">Always in our hearts.</Text>
        <Text class="goodbye">Famille Seguin</Text>
    </section>
</template>

<style lang="scss" scoped>
    section {
        margin-top: 2rem;
        font-size: 15pt;
    }

    p {
        text-align: center;
        margin-bottom: 0.1rem;
    }

    .spaced {
        margin-top: 1rem;
    }

    .goodbye {
        margin-top: 0.5rem;
        font-family: "Kunstler Script";
        font-size: 30pt;
    }

</style>