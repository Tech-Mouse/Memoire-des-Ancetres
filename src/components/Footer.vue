<script setup>
    import Link from './page/Link.vue';
</script>

<template>
    <footer>
        <ul>
            <li>Created in 2025</li>
            <li><Link href="/about" class="link" variant="footer">About this page</Link></li>
        </ul>
    </footer>
</template>

<style lang="scss" scoped>

$textColor: rgb(180, 180, 180);

footer {
    padding: 1.5rem;
    text-align: center;
    text-shadow: 1px 1px 2px black;
    background: rgb(5,12,13);
    background: linear-gradient(90deg, rgba(5,12,13,1) 0%, rgba(25,34,34,1) 9%, rgba(32,38,37,1) 16%, rgba(53,54,50,1) 23%, rgba(58,60,53,1) 37%, rgba(74,68,56,1) 48%, rgba(51,52,46,1) 56%, rgba(58,55,48,1) 65%, rgba(42,46,42,1) 76%, rgba(37,44,41,1) 84%, rgba(34,42,41,1) 91%, rgba(10,18,17,1) 100%);
    margin-top: 2rem;

    ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        justify-content: center;
        list-style: none;

        li {
            color: $textColor;
        }
    }
}

</style>