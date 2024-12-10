<template>
  <q-btn ref="innerQBtn" v-bind="actualProps">
    <!-- prettier-ignore -->
    <template v-for="(_, slotName) in ($slots as Readonly<typeof slots>)" #[slotName]>
        <slot :name="slotName" />
    </template>
  </q-btn>
</template>

<script setup lang="ts">
import { QBtn, QBtnProps, QBtnSlots } from "quasar";
import { computed, PropType, ref } from "vue";
import { PropOptions } from "../utils/tsHelpers";

type ButtonVariant = "solid" | "ghost";

const props = defineProps({
  ...(QBtn["props"] as PropOptions<QBtnProps>),
  variant: {
    type: String as PropType<ButtonVariant>,
    default: "solid",
  },
});

const slots = defineSlots<QBtnSlots>();

const innerQBtn = ref<QBtn | null>(null);

defineExpose({
  click: (e?: Event) => innerQBtn.value?.click(e),
});

const actualProps = computed((): QBtnProps => {
  return Object.assign({}, props, VARIANT_PROPS[props.variant]);
});

const VARIANT_PROPS: Record<ButtonVariant, QBtnProps> = {
  ghost: {
    flat: true,
    textColor: "primary",
  },
  solid: {
    outline: true,
  },
};
</script>
