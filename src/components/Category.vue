<script setup>
    const props = defineProps({
        name: {
            type: String,
            default: 'Category'
        },
        value: {
            type: String,
            default: 'Lorem Ipsum'
        }
    });

</script>

<template>
        <div class="category">
            <div class="category--name">
                {{ name }}
            </div>
            <div class="category--text">
                {{ value }}
            </div>

        </div>
</template>

<style lang="scss" scoped>
    .category {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &--name {
            font-size: 16pt;
            color: $primaryColor;
        }

        &--text {
            font-size: 14pt;
            max-width: 100%;
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-all;
        }
    }
</style>