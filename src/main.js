import './assets/base.css';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);

app.mount('#app');
