<template>
    <div>
        <div class="bg-slate-800 w-[50vw] aspect-square">
            <SharedFlickingCore @send-index="getIdx">
                <div
                    v-for="(project, index) in projects"
                    :key="index"
                    class="border border-red-600 w-full aspect-square relative overflow-hidden flex items-center justify-center"
                >
                    <img
                        :src="`/project/${project?.key}.png`"
                        alt=""
                        class="h-full w-auto max-w-none pointer-events-none -translate-x-[10%] transition-transform duration-[1s] ease-in-out"
                        :class="{
                            'translate-x-0':
                                index === activeIndex,
                        }"
                    />
                </div>
            </SharedFlickingCore>
        </div>
    </div>
</template>
<script setup>
import { projects } from "@/assets/json/main-projects.json";

const activeIndex = ref(0);
function getIdx(idx) {
    activeIndex.value = idx;
}
</script>
<style lang=""></style>
