<script setup>

    const props = defineProps({
        text: {
            type: String,
            default: ""
        }
    });
</script>

<template>

    <button>
        {{ text }}
    </button>

</template>