<template>
    <section class="my-projects" ref="my_projects">
        <main class="container flex items-center h-full">
            <!-- slider -->
            <section class="w-[540px] shrink-0">
                <SharedFlickingCore
                    ref="projects_flicking"
                    @send-index="getIndex"
                >
                    <div
                        v-for="(project, index) in projects"
                        :key="`project-${project.key}`"
                        class="bg-slate-400 w-full aspect-square"
                    >
                        <h1 class="text-h1">
                            {{ index }}
                        </h1>
                    </div>
                </SharedFlickingCore>
            </section>
            <section class="ml-16">
                <h1 class="text-h1">
                    {{ active_item?.name }}
                </h1>
                <p class="text-h4">
                    Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Iusto adipisci ea
                    facere ut eligendi, voluptatem
                    reiciendis officiis! Explicabo
                    consequuntur totam deserunt suscipit
                    eaque reprehenderit, repellendus, labore
                    qui odio eum rerum!
                </p>
                <button class="bg-white p-10">
                    view site
                </button>
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
const active_index = ref(0);
function getIndex(num) {
    active_index.value = num;
}
const active_item = computed(
    () => projects[active_index.value]
);

let tl;
function setupAnim() {
    tl = gsap.timeline({
        scrollTrigger: {
            trigger: my_projects.value,
            start: "top top",
            end: "bottom top",
            pin: true,
            scrub: true,
        },
    });
}

onMounted(async () => {
    await nextTick();
    setupAnim();
});
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
