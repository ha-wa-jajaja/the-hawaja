<script setup lang="ts">
import { GLTFModel, OrbitControls } from "@tresjs/cientos";
</script>

<template>
    <div class="bg-back">
        <TresCanvas clear-color="#0d0c0c" window-size>
            <TresPerspectiveCamera :position="[3, 2, 5]" />
            <OrbitControls />
            <Suspense>
                <GLTFModel path="/dust/scene.gltf" />
            </Suspense>
            <TresDirectionalLight
                :intensity="2"
                :position="[3, 3, 3]"
            />
            <TresAmbientLight :intensity="1" />
        </TresCanvas>
    </div>
</template>
