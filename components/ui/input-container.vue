<template>
    <div
        class="roboto relative w-fit border-b-4 border-b-black pb-2 pt-4"
    >
        <!-- placeholder: active -->
        <div
            class="pointer-events-none absolute left-0 top-0 -translate-y-1/2 overflow-hidden"
        >
            <p
                class="font-semibold transition-all delay-100 duration-200 ease-easeInOutSine"
                :class="
                    moveLabel
                        ? 'translate-x-0 '
                        : '-translate-x-full '
                "
            >
                {{ props.placeholder }}
            </p>
        </div>
        <!-- placeholder: inactive -->
        <div
            class="pointer-events-none absolute bottom-2 left-0 overflow-hidden"
        >
            <p
                class="font-semibold transition-all duration-200 ease-easeInOutSine"
                :class="
                    moveLabel
                        ? '-translate-x-full'
                        : 'translate-x-0 '
                "
            >
                {{ props.placeholder }}
            </p>
        </div>

        <input
            v-model="input_val"
            type="text"
            class="bg-transparent focus:outline-none"
            @focus="input_focus = true"
            @blur="input_focus = false"
        />
    </div>
</template>
<script setup>
const props = defineProps({
    placeholder: {
        type: String,
        default: "placeholder",
    },
});

let input_focus = ref(false);
let input_val = ref("");

const moveLabel = computed(() => {
    return input_val.value !== "" || input_focus.value;
});
</script>
<style scoped></style>
