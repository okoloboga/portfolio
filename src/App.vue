<template>
  <div class="container" ref="container" @scroll="updateScroll">
    <ParallaxLayer :src="sky" class="sky" :speed="0" />
    <ParallaxLayer :src="mountains" class="mountains" :speed="0.5" />
    <ParallaxLayer :src="headerBg" class="header-bg" :speed="0.5" />
    <ParallaxLayer
      v-for="(location, index) in locations"
      :key="index"
      :src="location.src"
      class="foreground"
      :speed="1"
      :offset="index * 2000"
    />
    <Character />
    <Chest
      v-for="(chest, index) in chests"
      :key="index"
      :x="chest.x"
      :section="chest.section"
      @open="openInventory"
    />
    <button class="arrow" @click="scrollToNextChest">→</button>
    <Header />
    <Inventory v-if="activeInventory" :items="activeInventory.items" @openModal="openModal" />
    <Modal v-if="activeModal" :content="activeModal" @close="closeModal" />
  </div>
</template>

<script>
import ParallaxLayer from './components/ParallaxLayer.vue';
import Character from './components/Character.vue';
import Chest from './components/Chest.vue';
import Header from './components/Header.vue';
import Inventory from './components/Inventory.vue';
import Modal from './components/Modal.vue';
import content from './data/content.json';

export default {
  components: { ParallaxLayer, Character, Chest, Header, Inventory, Modal },
  data() {
    return {
      sky: '/assets/backgrounds/sky.png',
      mountains: '/assets/backgrounds/mountains.png',
      headerBg: '/assets/header/header.png',
      locations: [
        { src: '/assets/backgrounds/field.png', length: 2000 },
        { src: '/assets/backgrounds/forest.png', length: 2000 },
      ],
      chests: [
        { x: 500, section: 'about' },
        { x: 1000, section: 'stack' },
        { x: 2500, section: 'projects' },
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
        nextChest.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style>
.container {
  overflow-x: auto;
  white-space: nowrap;
  width: 4000px;
  height: 100vh;
  position: relative;
}
.sky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
.mountains {
  position: absolute;
  top: 0;
  height: 200px;
  image-rendering: pixelated;
}
.header-bg {
  position: absolute;
  top: 0;
  height: 16px;
  image-rendering: pixelated;
}
.foreground {
  position: absolute;
  bottom: 0;
  height: 128px;
  image-rendering: pixelated;
}
.arrow {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 16px;
  background: url('/assets/ui/arrow.png');
  image-rendering: pixelated;
  border: none;
  cursor: pointer;
}
</style>
