<template>
    <Flicking
        ref="flicking"
        class="w-full"
        :class="{ '!overflow-visible': overflowVisible }"
        :options="{
            circular: circular,
            horizontal: !vertical,
            moveType: 'snap',
            interruptable: false,
            bound: !circular,
            align: align,
            duration: duration,
        }"
        :hideBeforeInit="true"
        :plugins="plugins"
        @will-change="flickingChanged"
    >
        <slot></slot>
    </Flicking>
</template>
<script setup>
import Flicking from "@egjs/vue3-flicking";
import { Arrow, Perspective } from "@egjs/flicking-plugins";

const props = defineProps({
    circular: {
        type: Boolean,
        default: true,
    },
    totalItems: {
        type: Number,
        default: 0,
    },
    align: {
        type: String,
        default: "center",
    },
    overflowVisible: {
        type: Boolean,
        default: false,
    },
    navBtnClassName: {
        type: String,
        default: "",
    },
    duration: {
        type: Number,
        default: 300,
    },
    vertical: {
        type: Boolean,
        default: false,
    },
});

const flicking = ref(null);

const {
    slideIdx,
    moveDir,
    flickingChanged,
    flickingNavigateTo,
    notCircular,
    totalItems,
} = useFlickingCtrl();

const emit = defineEmits(["sendIndex"]);

watch(slideIdx, () => {
    emit("sendIndex", slideIdx.value);
});
// watch(movingDir,()=>{

// })

function navTo(idx) {
    flickingNavigateTo(flicking, idx);
}

defineExpose({
    navTo,
    flicking,
    slideIdx,
    moveDir,
});

const plugins = ref([]);
function setPlugins() {
    plugins.value = [];
    if (props.navBtnClassName) {
        plugins.value = [
            new Arrow({
                parentEl:
                    document.querySelector(
                        `.${props.navBtnClassName}-navBtn-wrap`
                    ) ?? "",
                prevElSelector: `.${props.navBtnClassName}-navBtn-L`,
                nextElSelector: `.${props.navBtnClassName}-navBtn-R`,
            }),
        ];
    }
}

onMounted(async () => {
    await nextTick();
    if (!props.circular) {
        notCircular.value = true;
        totalItems.value = props.totalItems;
    }
    setPlugins();
});
</script>
<style></style>
