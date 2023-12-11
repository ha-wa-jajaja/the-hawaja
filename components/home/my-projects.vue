<template>
    <section class="my-projects" ref="my_projects">
        <main class="container flex items-center h-full">
            <!-- slider -->
            <section class="w-[540px] shrink-0 relative">
                <div
                    class="absolute top-0 left-0 -translate-y-1/2 -translate-x-12 z-10"
                >
                    <HomeProjectsProjectName
                        :current-proj-name="
                            active_item?.name
                        "
                        :rtl="moveDir === 'NEXT'"
                    />
                </div>
                <SharedFlickingCore ref="projects_flicking">
                    <div
                        v-for="(project, index) in projects"
                        :key="`project-${project.key}`"
                        class="bg-slate-400 w-full aspect-square flex items-center justify-center"
                    >
                        <h1 class="text-h1">
                            {{ index }}
                        </h1>
                    </div>
                </SharedFlickingCore>
            </section>
            <section class="ml-16">
                <p class="text-h4 mb-10">
                    Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Iusto adipisci ea
                    facere ut eligendi, voluptatem
                    reiciendis officiis! Explicabo
                    consequuntur totam deserunt suscipit
                    eaque reprehenderit, repellendus, labore
                    qui odio eum rerum!
                </p>
                <UiButton />
            </section>
        </main>

        <!-- https://digisalad-b79baffa0895.herokuapp.com/ -->
        <!-- https://github.com/boss006133/digiSalad/tree/master -->
    </section>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { projects } from "~/assets/json/projects.json";

const my_projects = ref(null);

const projects_flicking = ref(null);
const active_index = computed(
    () => projects_flicking.value?.slideIdx
);
const moveDir = computed(
    () => projects_flicking.value?.moveDir
);

const active_item = computed(
    () => projects[active_index.value]
);
</script>
<style lang="scss" scoped>
.my-projects {
    @apply w-screen h-screen;
    background: rgb(78, 38, 113);
    background: radial-gradient(
        circle,
        rgba(78, 38, 113, 1) 40%,
        rgba(0, 0, 0, 1) 100%
    );
}
</style>
