<template>
<p><slot /></p>
</template>

<style lang="scss" scoped>
    p {
        font-size: 16pt;
        font-family: Arial, Helvetica, sans-serif;

        @media (max-width: $mobileTreshold) {
            font-size: 18pt;
        }
    }
</style>