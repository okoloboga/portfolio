<template>
  <header class="pixel-header">
    <button v-for="button in navButtons" :key="button.label" @click="scrollTo(button.target)">
      {{ button.label }}
    </button>
    <button @click="cycleLanguage">{{ currentLocale.toUpperCase() }}</button>
  </header>
</template>

<script>
export default {
  name: 'PixelHeader',
  data() {
    return {
      navButtons: [
        { label: 'begin', target: -1 },
        { label: 'about', target: 0 },
        { label: 'stack', target: 1 },
        { label: 'projects', target: 2 },
        { label: 'price', target: 3 },
        { label: 'contact', target: 4 },
      ],
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    availableLocales() {
      return this.$i18n.availableLocales;
    },
  },
  methods: {
    scrollTo(targetIndex) {
      this.$emit('scrollTo', targetIndex);
    },
    cycleLanguage() {
      const currentIndex = this.availableLocales.indexOf(this.currentLocale);
      const nextIndex = (currentIndex + 1) % this.availableLocales.length;
      const nextLocale = this.availableLocales[nextIndex];
      console.log('Switching to:', nextLocale, 'Available locales:', this.availableLocales);
      this.$i18n.locale = nextLocale;
    },
  },
};
</script>

<style>
.pixel-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 1000;
}

.pixel-header button {
  flex-grow: 1;
  background: none;
  border: none;
  color: white;
  padding: 15px 0;
  font-family: 'VT323', monospace;
  font-size: var(--font-size-large-title);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.pixel-header button:hover {
  transform: scale(1.1);
}
</style>
