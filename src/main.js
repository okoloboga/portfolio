import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
// import VueGtag from 'vue-gtag';
import '@fontsource/vt323';
import en from './i18n/en.json';
import ru from './i18n/ru.json';
import cn from './i18n/cn.json';
import jp from './i18n/jp.json';

// Vue.use(VueGtag, { config: { id: 'G-asdasdasd' } });

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ru, cn, jp },
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
