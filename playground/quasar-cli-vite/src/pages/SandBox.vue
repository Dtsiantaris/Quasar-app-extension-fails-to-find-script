<template>
  <q-page class="q-pa-md" v-if="isInsideIframe()">
    <component
      v-if="matchedRoute?.meta.render"
      :is="matchedRoute?.meta.render"
      v-bind:args="args"
    />
    <component v-else :is="matchedRoute?.meta.metaComponent" v-bind="args" />
  </q-page>
  <IFrameRenderer
    v-else-if="iframepath"
    :iframe-path="iframepath"
    :height="`${computedIframeHeight}px`"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Dark, Screen } from "quasar";
// components
import IFrameRenderer from "src/docs/components/renderers/iframe/IFrameRenderer.vue";
// utils
import { useRoute } from "vue-router";
import { isInsideIframe } from "src/docs/utils/routingTools";
import { sandboxEntries } from "src/docs/storyRoutes";

const route = useRoute();

const iframepath = ref<string>();
const matchedRoute = sandboxEntries.find((r) => {
  if (r.path === route.fullPath) {
    iframepath.value = r.path;
    return r;
  }
  return false;
});

const args = ref(matchedRoute?.meta.args);

const computedIframeHeight = computed(() => {
  const screenHeight = Screen.height;

  return screenHeight - 50;
});

const handleMessage = (event: MessageEvent) => {
  if (event.data?.type === "update-args") {
    args.value = event.data.payload;
  } else if (event.data?.type === "update-dark-mode") {
    Dark.set(event.data.payload);
  }
};

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
</script>

<style scoped></style>
