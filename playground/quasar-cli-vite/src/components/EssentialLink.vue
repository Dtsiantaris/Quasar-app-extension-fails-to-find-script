<template>
  <q-item
    tag="router-link"
    class="doc-item"
    :to="link"
    dense
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="sm" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label v-if="caption" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();


</script>

<style></style>
