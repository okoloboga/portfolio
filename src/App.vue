<template>
  <div class="container" ref="container" @scroll="updateScroll">
    <ParallaxLayer :src="sky" class="sky" :speed="0" :zIndex="-4" />
    <ParallaxLayer :src="mountains" class="mountains" :speed="0.3" :zIndex="-3" />
    <ParallaxLayer :src="headerBg" class="header-bg" :speed="0.5" :zIndex="-2" />
    <ParallaxLayer
      v-for="(location, index) in locations"
      :key="index"
      :src="location.src"
      class="foreground"
      :speed="1"
      :offset="index * 1920"
      :zIndex="-1"
    />
    <PixelCharacter />
    <PixelChest
      v-for="(chest, index) in chests"
      :key="index"
      :x="chest.x"
      :section="chest.section"
      @open="openInventory"
    />
    <button class="arrow" @click="scrollToNextChest"></button>
    <PixelHeader />
    <PixelInventory v-if="activeInventory" :items="activeInventory.items" @openModal="openModal" />
    <PixelModal v-if="activeModal" :content="activeModal" @close="closeModal" />
  </div>
</template>

<script>
import ParallaxLayer from './components/ParallaxLayer.vue';
import PixelCharacter from './components/PixelCharacter.vue';
import PixelChest from './components/PixelChest.vue';
import PixelHeader from './components/PixelHeader.vue';
import PixelInventory from './components/PixelInventory.vue';
import PixelModal from './components/PixelModal.vue';
import content from './data/content.json';

export default {
  components: { ParallaxLayer, PixelCharacter, PixelChest, PixelHeader, PixelInventory, PixelModal },
  data() {
    return {
      sky: '/assets/backgrounds/sky.png',
      mountains: '/assets/backgrounds/mountains.png',
      headerBg: '/assets/header/header.png',
      locations: [
        { src: '/assets/backgrounds/field.png', length: 1920 },
        { src: '/assets/backgrounds/forest.png', length: 1920 },
      ],
      chests: [
        { x: 50, section: 'about' },
        { x: 100, section: 'stack' },
        { x: 250, section: 'projects' },
        { x: 300, section: 'certificates' },
        { x: 350, section: 'prices' },
        { x: 400, section: 'contacts' },
      ],
      activeInventory: null,
      activeModal: null,
      scrollX: 0,
    };
  },
  methods: {
    updateScroll() {
      this.scrollX = this.$refs.container.scrollLeft;
      document.documentElement.style.setProperty('--scrollX', `${this.scrollX}px`);
    },
    openInventory(section) {
      this.activeInventory = content[section];
    },
    openModal(item) {
      this.activeModal = item;
    },
    closeModal() {
      this.activeModal = null;
    },
    scrollToNextChest() {
      const nextChest = this.$refs.container.querySelector('.chest:not(.opened)');
      if (nextChest) {
        nextChest.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  overflow-y: hidden; /* Запрещаем вертикальную прокрутку */
}
.container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
  height: 100vh;
  position: relative;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: row;
}
</style>
