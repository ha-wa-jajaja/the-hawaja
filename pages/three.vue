<script setup lang="ts">
import {
    GLTFModel,
    OrbitControls,
    useAnimations,
    useGLTF,
    Environment,
} from "@tresjs/cientos";

// import { PMREMGenerator } from "three";
// import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
// let pmremGenerator = new PMREMGenerator(renderer);
// let neutralEnvironment = pmremGenerator.fromScene(
//     new RoomEnvironment()
// ).texture;

// const { scene } = await useGLTF(
//     "/dark_mystery_effect/scene.gltf"
// );

// const { actions, mixer } = useAnimations(animations, scene);
// actions[0].play;

// const { actions, mixer } = useAnimations(animations, model)
</script>

<template>
    <div class="bg-white">
        <ClientOnly>
            <Environment preset="city" />
            <TresCanvas clear-color="#d3d3d3" window-size>
                <TresPerspectiveCamera
                    :position="[3, 2, 5]"
                />
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
                <TresAmbientLight
                    :intensity="0.5"
                    color="#FFFFFF"
                />
            </TresCanvas>
        </ClientOnly>
    </div>
</template>
