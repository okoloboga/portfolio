import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import '@fontsource/vt323';
import en from './i18n/en.json';
import ru from './i18n/ru.json';
import cn from './i18n/cn.json';
import jp from './i18n/jp.json';

// Отладка импорта
console.log('Imported translations:', { en, ru, cn, jp });

const i18n = createI18n({
  legacy: false, // Используем Composition API (Vue 3)
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
    cn,
    jp,
  },
  silentTranslationWarn: false,
  silentFallbackWarn: false,
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');

// Дополнительная отладка после инициализации
console.log('i18n locale:', i18n.global.locale.value); // Для Composition API
console.log('i18n messages:', i18n.global.messages.value); // Для Composition API
