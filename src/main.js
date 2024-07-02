import './assets/base.css';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation';
import VueGtag from 'vue-gtag';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);
app.use(VueGtag, {
  config: { id: 'G-7VBM3JEFJY' },
});

app.mount('#app');
