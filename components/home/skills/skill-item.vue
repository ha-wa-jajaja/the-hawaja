<template>
    <div
        class="skill-item"
        ref="skillItem"
        @mouseenter="doTrans"
        @mouseleave="reverseTrans"
    >
        <p class="skill-name roboto font-semibold hidden">
            {{ skillName.toUpperCase() }}
        </p>

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
            <img
                :src="`/wires/${skillIcon}`"
                alt=""
                class="w-full h-auto"
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
});
const skillName = computed(() => props.skillObj?.name);
const skillKey = computed(() => props.skillObj?.key);
const skillIcon = computed(() => props.skillObj?.icon);
const skillGradients = computed(
    () => props.skillObj?.gradients
);

const horizontalItems = [
    "gsap",
    "tailwind",
    "react",
    "python",
];
const isHorizontal = computed(() =>
    horizontalItems.includes(skillKey.value)
);

let ctx;
let tl;
const skillItem = ref();
const { width, height } = useElementBounding(skillItem);
function setupGsap() {
    ctx = gsap.context((self) => {
        const iconFrame = self.selector(".icon-frame");
        const clrIconFrame = self.selector(
            ".color-layer-white .layer-white-content .colored-icon-frame"
        );
        if (
            Object.prototype.hasOwnProperty.call(
                props.skillObj,
                "translate"
            )
        ) {
            let trans = props.skillObj.translate;
            gsap.set(iconFrame, {
                xPercent: trans[0],
                yPercent: trans[1],
            });
            gsap.set(clrIconFrame, {
                xPercent: trans[0],
                yPercent: trans[1],
            });
        } else {
            gsap.set(iconFrame, {
                xPercent: 20,
                yPercent: 20,
            });
            gsap.set(clrIconFrame, {
                xPercent: 20,
                yPercent: 20,
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
const layer2 = ref();
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
