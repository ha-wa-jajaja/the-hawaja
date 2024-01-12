<template>
    <section class="my-projects" ref="my_projects">
        <div
            class="w-full h-[50vh] container flex items-center"
            ref="titleGroup"
        >
            <UiTextRevealer
                class="translate-y-1/2"
                ref="title"
                :content="$t('projects')"
            />
        </div>
        <main class="w-screen container">
            <div
                class="w-full h-screen mb-16 flex flex-col justify-evenly relative"
            >
                <UiRellaxEl
                    class="bg-text tusker"
                    :speed="-2.5"
                    @do-with-progress="fillText"
                >
                    <div class="relative">
                        <p class="stroke">PROJECTS</p>
                        <p
                            class="fill"
                            :style="{
                                '--clip': `${fillProgress}%`,
                            }"
                        >
                            PROJECTS
                        </p>
                    </div>
                </UiRellaxEl>
                <UiRellaxEl
                    class="absolute bottom-0 right-0 translate-x-[20%]"
                    :speed="2.5"
                    @do-on-enter="playCircle"
                >
                    <UiExpandCircle
                        :width="500"
                        ref="circle"
                        :circle-id="'proj-bg'"
                    />
                </UiRellaxEl>
                <img
                    src="/cross-stroke.svg"
                    alt=""
                    class="absolute top-0 left-0 w-[400px] scale-0 transition-transform duration-200 -translate-x-1/4"
                    :class="{ 'scale-100': showCross }"
                    ref="cross"
                />
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
        <UiRellaxEl
            class="absolute bottom-0 right-0 translate-x-[20%]"
            :speed="2"
        >
            <img
                src="/cross-stroke.svg"
                alt=""
                class="w-[500px]"
            />
        </UiRellaxEl>
    </section>
</template>
<script setup>
import { projects } from "@/assets/json/main-projects.json";

const fillProgress = ref(100);
function fillText(progress) {
    fillProgress.value = 100 - 100 * progress;
}

const circle = ref();
function playCircle() {
    circle.value?.playAnim();
}

const titleGroup = ref();
const title = ref();
const cross = ref();
const showCross = ref(false);
onMounted(() => {
    useObserver(cross, () => (showCross.value = true));
    useObserver(titleGroup, () => title.value.playAnim());
});
</script>
<style lang="scss" scoped>
.my-projects {
    @apply relative overflow-hidden;
    .bg-text {
        @apply absolute bottom-0 left-0;

        font-size: 20vw;
        font-weight: 600;
        opacity: 0.5;
        line-height: 110%;

        .stroke {
            color: transparent;
            -webkit-text-stroke: 1px #71797e;
            text-stroke: 1px #71797e;
        }

        .fill {
            @apply absolute inset-0;
            -webkit-clip-path: inset(var(--clip) 0 0 0);
            clip-path: inset(var(--clip) 0 0 0);
            color: #71797e;
        }
    }
}
</style>
