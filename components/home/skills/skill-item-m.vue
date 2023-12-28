<template>
    <div class="skill-item-m" ref="skillItemM">
        <div
            class="color-layer-1 z-0"
            ref="layer1"
            :style="{
                'background-color': skillGradients[0],
            }"
        ></div>
        <div
            class="color-layer-2 z-[1]"
            ref="layer2"
            :style="{
                'background-color': skillGradients[1],
            }"
        ></div>
        <div class="color-layer-white z-[5] bg-[#ECECEC]">
            <div
                class="layer-white-content"
                :style="{
                    width: `${width}px`,
                    height: `${height}px`,
                }"
            >
                <p class="skill-name tusker font-bold">
                    {{ skillName.toUpperCase() }}
                </p>
                <div class="colored-icon-frame">
                    <img
                        :src="`/icons/${skillIcon}`"
                        alt=""
                        class="h-full w-auto"
                    />
                </div>
            </div>
        </div>
        <div class="icon-frame h-full w-fit">
            <img
                :src="`/wires/${skillIcon}`"
                alt=""
                class="h-full w-auto"
            />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    skillObj: {
        type: Object,
        default: () => {},
    },
});
const skillName = computed(() => props.skillObj?.name);
const skillKey = computed(() => props.skillObj?.key);
const skillIcon = computed(() => props.skillObj?.icon);
const skillGradients = computed(
    () => props.skillObj?.gradients
);

const skillItemM = ref();
const { width, height } = useElementBounding(skillItemM);
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/components/skill-item-m.scss");
</style>
