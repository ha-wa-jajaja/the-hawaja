<template>
    <section class="my-projects" ref="my_projects">
        <HomeProjectsTrans />
        <div class="w-full relative max-md:overflow-hidden">
            <main class="w-screen container overflow-hidden">
                <div
                    class="w-full h-screen mb-16 flex flex-col justify-evenly relative max-2lg:justify-between"
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
                            :width="circleSize"
                            ref="circle"
                            :circle-id="'proj-bg'"
                        />
                    </UiRellaxEl>
                    <UiRellaxEl
                        class="absolute top-0 left-0 -translate-x-1/4"
                        :speed="-1"
                    >
                        <img
                            src="/cross-stroke.svg"
                            alt=""
                            class="w-[400px] scale-0 transition-transform duration-200 max-lg:w-[250px]"
                            :class="{
                                'scale-100': showCross,
                            }"
                            ref="cross"
                        />
                    </UiRellaxEl>
                    <HomeProjectsProjectBlock :project-data="projects[0]" />
                    <HomeProjectsProjectBlock
                        :project-data="projects[1]"
                        :left="false"
                    />
                </div>
                <div
                    class="w-full h-screen flex flex-col justify-evenly relative max-lg:justify-between"
                >
                    <HomeProjectsProjectBlock :project-data="projects[2]" />
                    <HomeProjectsProjectBlock
                        :project-data="projects[3]"
                        :left="false"
                    />
                </div>
                <NuxtLink :to="'/projects'" target="_blank">
                    <div
                        class="flex h-[64px] text-[64px] text-white roboto font-bold my-10 max-lg:text-[32px]"
                        ref="moreSection"
                    >
                        <UiRandomText
                            :target-text="'AND'"
                            class="mr-4"
                            ref="moreText"
                        />
                        <UiRandomText
                            :target-text="'MORE...'"
                            ref="moreText2"
                        />
                    </div>
                </NuxtLink>
            </main>
            <UiRellaxEl
                class="absolute bottom-0 right-0 translate-x-[20%]"
                :speed="2"
            >
                <img
                    src="/cross-fill.svg"
                    alt=""
                    class="w-[500px] max-lg:w-[250px]"
                />
            </UiRellaxEl>
        </div>
    </section>
</template>
<script setup>
import { projects } from "@/assets/json/main-projects.json";

const fillProgress = ref(100);
function fillText(progress) {
    fillProgress.value = 100 - 100 * progress;
}

const { min } = useMedia();
const circleSize = computed(() => (min("lg") ? 500 : 300));

const circle = ref();
function playCircle() {
    circle.value?.playAnim();
}

const cross = ref();
const showCross = ref(false);

const moreSection = ref();
const moreText = ref();
const moreText2 = ref();
const { currentLocale } = useLocale();

onMounted(() => {
    useObserver(cross, () => (showCross.value = true));
    useObserver(
        moreSection,
        () => {
            moreText.value.runEffect();
            if (currentLocale.value.code == "en") moreText2.value.runEffect();
        },
        true
    );
});
</script>
<style lang="scss" scoped>
.my-projects {
    .bg-text {
        @apply absolute bottom-0 left-0;

        font-size: 20vw;
        font-weight: 600;
        opacity: 0.5;
        line-height: 110%;

        @screen max-lg {
            font-size: 40vw;
        }

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
