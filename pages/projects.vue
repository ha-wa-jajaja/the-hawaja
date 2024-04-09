<template>
    <div class="p-10">
        <div
            class="px-5 py-6 flex items-center border-t border-black border-solid last:border-b"
            v-for="(value, key, index) in projects"
            :key="index"
        >
            <a
                :href="value.link"
                class="flex items-center mr-6 w-[30%] shrink-0"
                target="_blank"
            >
                <h1 class="text-[36px] font-bold mr-2">
                    {{ value.name }}
                </h1>
                <img src="/link-black.svg" alt="" class="w-5 h-5" />
            </a>

            <div class="grow">
                <div class="flex mb-4" v-if="value.github !== null">
                    <a :href="value.github" target="_blank">
                        <img src="/github-black.svg" alt="" class="w-5 h-5" />
                    </a>
                </div>
                <p class="text-[16px] mb-4">{{ value.description }}</p>
                <div class="flex">
                    <button
                        class="pointer-events-none p-2 rounded-lg bg-slate-300 text-slate-700 mr-2 font-thin"
                        v-for="(item, index) in value.techs"
                        :key="index"
                    >
                        {{ "#" + item }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { projects } from "@/assets/json/projects.json";
</script>
