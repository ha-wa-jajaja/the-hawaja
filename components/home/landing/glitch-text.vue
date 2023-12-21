<template>
    <div
        class="w-fit h-fit relative landing-title-wrapper"
        ref="titleWrapper"
    >
        <div
            class="w-full h-full absolute inset-0 bg-black overlay z-10"
            ref="overlay"
        ></div>
        <div
            class="roboto z-0 glitch font-semibold w-fit"
            :class="
                $useMedia.min('lg')
                    ? 'text-[10vw]'
                    : 'text-[68px]'
            "
            :data-text="props.content"
        >
            {{ props.content }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    content: {
        type: String,
        default: "",
    },
});
</script>

<style lang="scss" scoped>
.landing-title-wrapper {
    --clip: 100%;
    -webkit-clip-path: inset(0 var(--clip) 0 0);
    clip-path: inset(0 var(--clip) 0 0);

    .overlay {
        --clip: 0%;
        -webkit-clip-path: inset(0 0 0 var(--clip));
        clip-path: inset(0 0 0 var(--clip));
    }
}

.glitch {
    color: white;
    position: relative;
    margin: 0 auto;
    font-size: min(10vw, 192px);

    @screen max-lg {
        font-size: 14vw;
    }

    @screen max-sm {
        font-size: 68px;
    }
}

@keyframes noise-anim {
    $steps: 20;
    @for $i from 0 through $steps {
        #{percentage($i*(1/$steps))} {
            clip: rect(
                random(100) + px,
                9999px,
                random(100) + px,
                0
            );
        }
    }
}
.glitch:after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 red;
    top: 0;
    color: white;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear
        alternate-reverse;
}

@keyframes noise-anim-2 {
    $steps: 20;
    @for $i from 0 through $steps {
        #{percentage($i*(1/$steps))} {
            clip: rect(
                random(150) + px,
                9999px,
                random(150) + px,
                0
            );
        }
    }
}
.glitch:before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 blue;
    top: 0;
    color: white;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear
        alternate-reverse;
}
</style>
