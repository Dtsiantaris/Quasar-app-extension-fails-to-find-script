import { boot } from "quasar/wrappers";
// components
import BButton from "../components/BButton.vue";


export default boot(({ app }) => {
  // components
  app.component("BButton", BButton);
});
