<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          v-if="$q.screen.lt.md"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title shrink>
          <router-link to="/" draggable="false">
            <div class="flex no-wrap gap-2 ml-3">
              <q-img
                src="/blazar-logo.png"
                class="rounded-full"
                width="40px"
                loading-show-delay="300"
                loading="eager"
              />
              <span class="text-h4 font-mono">Blazar Playground</span>
            </div>
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="p-2 flex sticky"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      :overlay="false"
      :style="{
        height: `${$q.screen.height - 50}px !important`,
      }"
    >
      <q-list padding class="flex flex-col gap-2">
        <EssentialLink
          v-for="link in routes"
          :key="link.path"
          title="Home"
          :link="link.path"
          icon="sym_o_home"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { QLayout, scroll, useQuasar } from "quasar";
import { computed, nextTick, onMounted, ref, watch } from "vue";
// types
// components
import EssentialLink from "src/components/EssentialLink.vue";
// utils
import { useRoute } from "vue-router";
import routes from "src/router/routes";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const $q = useQuasar();
const route = useRoute();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
<style lang="scss"></style>
