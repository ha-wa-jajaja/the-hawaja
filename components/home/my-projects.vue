<template>
    <section
        class="my-projects flex items-center justify-center"
    >
        <h1 class="text-[72px] text-white font-bold">
            {{ $t("myProjects") }}
        </h1>
        <!-- https://digisalad-b79baffa0895.herokuapp.com/ -->
        <!-- https://github.com/boss006133/digiSalad/tree/master -->
    </section>
</template>
<script setup>
import { projects } from "~/assets/json/projects.json";
</script>
<style lang="scss" scoped>
.my-projects {
    @apply w-screen h-[100dvh];
    background: rgb(78, 38, 113);
    background: radial-gradient(
        circle,
        rgba(78, 38, 113, 1) 40%,
        rgba(0, 0, 0, 1) 100%
    );
}
</style>
