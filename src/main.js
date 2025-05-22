import { createApp } from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';

Vue.use(VueGtag, { config: { id: 'G-asdasdasd' } });
createApp(App).mount('#app')
