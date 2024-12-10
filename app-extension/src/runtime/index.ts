import { GlobalComponentConstructor, QBtnSlots } from "quasar";
import { ComponentPublicInstance } from "vue";
import {
  ComponentExposed,
  ComponentProps,
} from "./utils/tsHelpers";

// components
import BButton from "./components/BButton.vue";


// BButton
export interface BButtonProps extends ComponentProps<typeof BButton> {}

export interface BButtonSlots extends QBtnSlots {}
export interface BButtonExposed extends ComponentExposed<typeof BButton> {}

export interface BButton
  extends ComponentPublicInstance<BButtonProps, BButtonExposed> {}
export { BButton };


/** ============== Module declaration ============== */
declare module "vue" {
  interface GlobalComponents {
    /**
     * Button component
     */
    BButton: GlobalComponentConstructor<BButtonProps, BButtonSlots>;
   
  }
}
