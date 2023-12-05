<script setup lang="ts">
import {
    GLTFModel,
    OrbitControls,
    useAnimations,
    useGLTF,
} from "@tresjs/cientos";

// const { scene } = await useGLTF(
//     "/dark_mystery_effect/scene.gltf"
// );

// const { actions, mixer } = useAnimations(animations, scene);
// actions[0].play;

// const { actions, mixer } = useAnimations(animations, model)
</script>

<template>
    <div class="bg-back">
        <TresCanvas clear-color="#0d0c0c" window-size>
            <TresPerspectiveCamera :position="[3, 2, 5]" />
            <OrbitControls />
            <Suspense>
                <GLTFModel
                    path="/spinning_top/scene.gltf"
                />
            </Suspense>
            <TresDirectionalLight
                :intensity="2"
                :position="[3, 3, 3]"
            />
            <TresAmbientLight :intensity="1" />
        </TresCanvas>
    </div>
</template>
