<template>
    <div>
        <canvas ref="canvas" />
    </div>
</template>
<script setup lang="ts">
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    Fog,
    AmbientLight,
    DirectionalLight,
    HemisphereLight,
    PMREMGenerator,
    AnimationMixer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { useWindowSize } from "@vueuse/core";

const props = defineProps({
    rotateX: {
        type: Number,
        default: 0,
    },
});

const { width, height } = useWindowSize();
const aspectRatio = computed(() => {
    return width.value / height.value;
});

let renderer: WebGLRenderer;
let controls: OrbitControls;
const canvas: Ref<HTMLCanvasElement | null> = ref(null);

// const bgc = new Color("#000000");
const scene = new Scene();
// scene.fog = new Fog(bgc, 0.1, 75);
scene.background = null;

const camera = new PerspectiveCamera(
    75,
    aspectRatio.value,
    0.1,
    1000
);
camera.position.set(0, 2, 4);

scene.add(camera);
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const gltfLoader = new GLTFLoader();
gltfLoader.load("/dust/scene.gltf", (gltf) => {
    const mixer = new AnimationMixer(gltf.scene);

    mixer.clipAction(gltf.animations[0]).play();

    scene.add(gltf.scene);
});

function updateRenderer() {
    renderer.setSize(width.value, height.value);
    renderer.render(scene, camera);
}
function UpdateCamera() {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix();
}
watch(aspectRatio, () => {
    UpdateCamera();
    updateRenderer();
});

function setRenderer() {
    if (!canvas.value) return;
    renderer = new WebGLRenderer({
        canvas: canvas.value,
        alpha: true,
    });
    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );
    let pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    let neutralEnvironment = pmremGenerator.fromScene(
        new RoomEnvironment()
    ).texture;
    scene.environment = neutralEnvironment;

    controls = new OrbitControls(
        camera,
        renderer.domElement
    );
    updateRenderer();
}

onMounted(() => {
    setRenderer();
    loop();
});

function getFov() {
    return Math.floor(
        (2 *
            Math.atan(
                camera.getFilmHeight() /
                    2 /
                    camera.getFocalLength()
            ) *
            180) /
            Math.PI
    );
}

const rotateX = computed(() => props.rotateX);
watch(rotateX, () => {
    let currZoom = getFov();
    camera.fov = currZoom += 0.1;
    camera.updateProjectionMatrix();
    camera.rotation.x += 0.01;
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
};
</script>
<style lang=""></style>
