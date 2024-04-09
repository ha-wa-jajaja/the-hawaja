<template>
    <a
        :href="skillLink"
        target="_blank"
        class="skill-item"
        ref="skillItem"
        @mouseenter="doTrans"
        @mouseleave="reverseTrans"
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
                <div
                    class="colored-icon-frame"
                    :class="{
                        'top-0': isHorizontal,
                        'bottom-0': !isHorizontal,
                    }"
                >
                    <img
                        :src="`/icons/${skillIcon}`"
                        alt=""
                        class="w-full h-auto"
                    />
                </div>
            </div>
        </div>

        <div
            class="icon-frame z-[4]"
            :class="{
                'top-0': isHorizontal,
                'bottom-0': !isHorizontal,
            }"
        >
            <img :src="`/wires/${skillIcon}`" alt="" class="w-full h-auto" />
        </div>
    </a>
</template>
<script setup>
import gsap from "gsap";

const props = defineProps({
    skillObj: {
        type: Object,
        default: () => {},
    },
});
const skillName = computed(() => props.skillObj?.name);
const skillKey = computed(() => props.skillObj?.key);
const skillIcon = computed(() => props.skillObj?.icon);
const skillGradients = computed(() => props.skillObj?.gradients);
const skillLink = computed(() => props.skillObj?.link);

const horizontalItems = ["gsap", "tailwind", "react", "python"];
const isHorizontal = computed(() => horizontalItems.includes(skillKey.value));

let ctx;
let tl;
const skillItem = ref();
const { width, height } = useElementBounding(skillItem);
function setupGsap() {
    ctx = gsap.context((self) => {
        const iconFrames = [
            self.selector(".icon-frame"),
            self.selector(".colored-icon-frame"),
        ];
        if (Object.prototype.hasOwnProperty.call(props.skillObj, "translate")) {
            let trans = props.skillObj.translate;
            iconFrames.forEach((el) => {
                gsap.set(el, {
                    xPercent: trans[0],
                    yPercent: trans[1],
                });
            });
        } else {
            iconFrames.forEach((el) => {
                gsap.set(el, {
                    xPercent: 20,
                    yPercent: 20,
                });
            });
        }

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
    }, skillItem.value);
}

const layer1 = ref();
function doTrans(e) {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    gsap.set(layer1.value, { top: x, left: y });
    tl.play();
}
function reverseTrans(e) {
    tl.reverse();
}

onMounted(() => {
    setupGsap();
});
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/components/skill-item.scss");
</style>
