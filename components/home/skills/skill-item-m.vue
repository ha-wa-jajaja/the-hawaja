<template>
    <div
        class="skill-item-m"
        ref="skillItemM"
        @click="doTrans"
        v-fade:up
    >
        <div
            class="color-layer-1 z-0"
            ref="layer1"
            :style="{
                'background-color': skillGradients[0],
            }"
        ></div>
        <div
            class="color-layer-2 z-[1]"
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
import gsap from "gsap";

const props = defineProps({
    skillObj: {
        type: Object,
        default: () => {},
    },
    isActive: {
        type: Boolean,
        default: false,
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
let ctx;
let tl;
function setupAnim() {
    ctx = gsap.context((self) => {
        const layer1 = self.selector(".color-layer-1");
        const layer2 = self.selector(".color-layer-2");
        const layer3 = self.selector(".color-layer-white");
        gsap.set(layer1, { opacity: 0, scale: 0.3 });
        gsap.set(layer2, { opacity: 0, scale: 0.3 });
        gsap.set(layer3, { opacity: 0 });

        tl = gsap
            .timeline({
                paused: true,
                defaults: {
                    ease: "power1.in",
                    duration: 0.5,
                },
            })
            .to(layer1, { opacity: 1, scale: 1 })
            .to(layer2, { opacity: 1, scale: 1 }, 0.2)
            .to(
                layer3,
                {
                    opacity: 1,
                    "--clip": "50%",
                    duration: 0.6,
                },
                0.3
            );
    }, skillItemM.value);
}

const layer1 = ref();
function doTrans(e) {
    emits("setActive", skillKey.value);
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    gsap.set(layer1.value, { top: x, left: y });
    tl.play();
}
watch(
    () => props.isActive,
    (val) => {
        if (!val) tl.reverse();
    }
);

const emits = defineEmits(["setActive"]);

onMounted(() => {
    setupAnim();
});
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/components/skill-item-m.scss");
</style>
