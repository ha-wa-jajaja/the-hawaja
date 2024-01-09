<template>
    <section class="my-projects">
        <div class="w-full h-[80vh] container">
            <UiRellaxEl :speed="-1">
                <img src="/cross-fill.svg" alt="" />
            </UiRellaxEl>
            <div class="text-black roboto text-[64px]">
                HIHIHIHI
            </div>
        </div>
        <main class="w-screen container">
            <div
                class="w-full h-screen mb-16 flex flex-col justify-evenly relative"
            >
                <UiRellaxEl
                    class="bg-text tusker"
                    :speed="-0.8"
                >
                    <p>PROJECTS</p>
                </UiRellaxEl>
                <HomeProjectsProjectBlock
                    :project-data="projects[0]"
                />
                <HomeProjectsProjectBlock
                    :project-data="projects[1]"
                    :left="false"
                />
            </div>
            <div
                class="w-full h-screen flex flex-col justify-evenly relative"
            >
                <HomeProjectsProjectBlock
                    :project-data="projects[2]"
                />
                <HomeProjectsProjectBlock
                    :project-data="projects[3]"
                    :left="false"
                />
            </div>
        </main>
    </section>
</template>
<script setup>
import { projects } from "@/assets/json/main-projects.json";
</script>
<style lang="scss" scoped>
.my-projects {
    .bg-text {
        @apply absolute bottom-0 left-0;
        color: transparent;
        -webkit-text-stroke: 1px #71797e;
        text-stroke: 1px #71797e;
        font-size: 20vw;
        font-weight: 600;
        opacity: 0.5;
    }
}
</style>
