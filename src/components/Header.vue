<template>
  <div class="header">
    <div v-for="section in sections" :key="section" class="nav-item" @click="scrollToSection(section)">
      {{ $t(`nav.${section}`) }}
    </div>
    <div class="lang-switcher">
      <span v-for="lang in languages" :key="lang" @click="$i18n.locale = lang" :class="{ active: $i18n.locale === lang }">
        {{ lang.toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: ['about', 'stack', 'projects'],
      languages: ['ru', 'en', 'cn', 'jp'],
    };
  },
  methods: {
    scrollToSection(section) {
      const chest = document.querySelector(`.chest[data-section="${section}"]`);
      chest.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-family: 'VT323', monospace;
  color: #B0BEC5;
  z-index: 10;
}
.nav-item {
  cursor: pointer;
  margin-right: 20px;
}
.nav-item:hover {
  color: #FF5252;
}
.lang-switcher span {
  cursor: pointer;
  margin-left: 10px;
}
.lang-switcher .active {
  color: #FF5252;
}
</style>
