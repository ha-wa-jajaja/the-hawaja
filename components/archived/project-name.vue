<template>
    <div
        ref="proj_name"
        class="proj-name p-6 relative w-fit h-fit"
        :class="isRtl ? 'ltr' : 'rtl'"
    >
        <div
            class="w-full h-full bg-black inset-0 absolute cover"
            :class="isRtl ? 'rtl' : 'ltr'"
        ></div>
        <h1
            class="text-white text-[72px] dm-sans font-semibold"
        >
            {{ displayingTitleName.toUpperCase() }}
        </h1>
    </div>
</template>
<script setup>
import gsap from "gsap";

const props = defineProps({
    currentProjName: {
        type: String,
        default: "",
    },
    rtl: {
        type: Boolean,
        default: false,
    },
});

const displayingTitleName = ref("");
const isRtl = ref(false);
watch(
    () => props.currentProjName,
    (val) => {
        isRtl.value = props.rtl;
        textChangeAnim(val);
    }
);
function textChangeAnim(val) {
    gsap.timeline({
        defaults: {
            ease: "power2.inOut",
            duration: 0.3,
        },
    })
        .to(".proj-name .cover", {
            "--clip": "0%",
        })
        .to(".proj-name", {
            "--clip": "100%",
        })
        .call(() => {
            displayingTitleName.value = val;
            isRtl.value = !isRtl.value;
        })
        .to(".proj-name", {
            "--clip": "0%",
        })
        .to(".proj-name .cover", {
            "--clip": "100%",
        });
}

onMounted(async () => {
    await nextTick();
    displayingTitleName.value = props.currentProjName;
});
</script>
<style lang="scss" scoped>
.proj-name {
    --clip: 0%;
    -webkit-clip-path: inset(0 0 0 var(--clip));
    clip-path: inset(0 0 0 var(--clip));
    &.rtl {
        -webkit-clip-path: inset(0 0 0 var(--clip));
        clip-path: inset(0 0 0 var(--clip));
    }
    &.ltr {
        -webkit-clip-path: inset(0 var(--clip) 0 0);
        clip-path: inset(0 var(--clip) 0 0);
    }

    .cover {
        --clip: 100%;
        &.rtl {
            -webkit-clip-path: inset(0 0 0 var(--clip));
            clip-path: inset(0 0 0 var(--clip));
        }
        &.ltr {
            -webkit-clip-path: inset(0 var(--clip) 0 0);
            clip-path: inset(0 var(--clip) 0 0);
        }
    }
}
</style>
