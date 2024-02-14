<template>
    <NuxtLayout id="nuxt-layout">
        <NuxtLoadingIndicator />
        <lenis>
            <NuxtPage />
        </lenis>
        <UiDsAppTransition />
        <UiDsPageLoader />
    </NuxtLayout>
</template>
<script lang="ts" setup>
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0);
});
</script>
<style></style>
