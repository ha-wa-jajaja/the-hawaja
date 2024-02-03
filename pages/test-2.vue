<template>
    <div class="bg-black">
        <div class="w-screen h-screen bg-white">
            <LayoutEnterAnim />
        </div>

        <div class="w-screen h-screen bg-black">
            <div
                class="text-[100px] text-red-500"
                v-fade:left="'50%'"
            >
                ASDFG
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style lang=""></style>
