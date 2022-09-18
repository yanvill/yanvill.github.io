import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const minesweeperEmitter = mitt();
const app = createApp(App);

app.config.globalProperties.minesweeperEmitter = minesweeperEmitter;

app.use(createPinia());
app.use(router);

app.mount("#app");

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    minesweeperEmitter: typeof minesweeperEmitter;
  }
}
