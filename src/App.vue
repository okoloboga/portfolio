<template>
  <PixelHeader @scrollTo="scrollToSection" />
  <div class="container" ref="container" @scroll="updateScroll">
    <div class="scroll-content" :style="{ width: scrollWidth + 'px' }"></div>
    <!-- Background Layers -->
    <ParallaxLayer :src="sky" class="sky" :speed="0.1" :zIndex="-4" :scrollWidth="scrollWidth" />
    <ParallaxLayer :images="mountainsPattern" class="mountains" :speed="0.3" :zIndex="-3" :scrollWidth="scrollWidth" />
    <ParallaxLayer :images="fieldAndForestPattern" class="field-forest" :speed="0.6" :zIndex="-2" :scrollWidth="scrollWidth" />
    <ParallaxLayer :src="header" class="header" :speed="0.8" :zIndex="-1" :scrollWidth="scrollWidth" />
    <!-- Game Elements -->
    <PixelCharacter :isWalking="isWalking" :direction="direction" />
    <PixelChest v-for="chest in chests" :key="chest.id" :positionX="chest.positionX" :isOpen="chest.isOpen" :scrollX="scrollX" @open="handleChestOpen(chest)" />
    
    <!-- UI Modals -->
    <PixelInventory v-if="activeInventory" :content="activeInventory.content" @openModal="openL2Modal" @close="closeEverything" />
    <PixelStack v-if="activeStackContent" :content="activeStackContent.content" @itemClick="openL2Modal" @close="closeEverything" />
    <PixelModal v-if="activeModalContent" :content="activeModalContent" @close="closeEverything" />
    <PixelModal v-if="activeL2ModalContent" :content="activeL2ModalContent" @close="closeL2Modal" />

    <button class="arrow" @click="scrollToNextChest"></button>
  </div>
</template>

<script>
import ParallaxLayer from './components/ParallaxLayer.vue';
import PixelCharacter from './components/PixelCharacter.vue';
import PixelChest from './components/PixelChest.vue';
import PixelModal from './components/PixelModal.vue';
import PixelInventory from './components/PixelInventory.vue';
import PixelHeader from './components/PixelHeader.vue';
import PixelStack from './components/PixelStack.vue'; // Import new component
import content from './data/content.json';
import { FONT_SIZES } from './styles/typography.js';

export default {
  components: { ParallaxLayer, PixelCharacter, PixelChest, PixelModal, PixelInventory, PixelHeader, PixelStack },
  data() {
    return {
      sky: '/assets/backgrounds/sky.png',
      mountains: '/assets/backgrounds/mountains.png',
      header: '/assets/header/header.png',
      scrollX: 0,
      scrollWidth: 25000,
      fieldAndForestPattern: [],
      mountainsPattern: [],
      isWalking: false,
      direction: 'right',
      chests: [],
      activeInventory: null,
      activeStackContent: null, // New state for the stack list
      activeModalContent: null, // For simple L1 modals
      activeL2ModalContent: null, // For detail modals
    };
  },
  methods: {
    // --- Navigation and Movement ---
    updateScroll() {
      this.closeEverything();
      this.scrollX = this.$refs.container.scrollLeft;
      document.documentElement.style.setProperty('--scrollX', `${this.scrollX}px`);
    },
    handleKeyDown(event) {
      this.closeEverything();
      if (!this.$refs.container) return;
      const scrollAmount = 15;
      if (event.key === 'ArrowRight') {
        this.isWalking = true;
        this.direction = 'right';
        this.$refs.container.scrollLeft += scrollAmount;
      } else if (event.key === 'ArrowLeft') {
        this.isWalking = true;
        this.direction = 'left';
        this.$refs.container.scrollLeft -= scrollAmount;
      }
    },
    handleKeyUp(event) {
      if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
        this.isWalking = false;
      }
    },
    scrollToNextChest() {
      this.$refs.container.scrollLeft += 500;
    },
    scrollToSection(chestIndex) {
      if (chestIndex === -1) {
        this.$refs.container.scrollLeft = 0;
        return;
      }
      const chest = this.chests[chestIndex];
      if (chest) {
        this.$refs.container.scrollLeft = chest.positionX / 1.6 - 300;
      }
    },

    // --- Modal and Content Logic ---
    handleChestOpen(chest) {
      this.closeEverything();
      chest.isOpen = true;
      switch (chest.type) {
        case 'inventory':
          this.activeInventory = chest;
          break;
        case 'list':
          this.activeStackContent = chest;
          break;
        case 'modal':
          this.activeModalContent = { ...chest.content.items[0], chestId: chest.id };
          break;
      }
    },
    openL2Modal(item) {
      this.activeL2ModalContent = item;
    },
    closeL2Modal() {
      this.activeL2ModalContent = null;
    },
    closeEverything() {
      if (this.activeInventory) this.activeInventory.isOpen = false;
      if (this.activeStackContent) this.activeStackContent.isOpen = false;
      if (this.activeModalContent) {
        const chestToClose = this.chests.find(c => c.id === this.activeModalContent.chestId);
        if (chestToClose) chestToClose.isOpen = false;
      }
      this.activeInventory = null;
      this.activeStackContent = null;
      this.activeModalContent = null;
      this.activeL2ModalContent = null; // Also close L2 modals on major actions
    },
  },
  created() {
    // --- Background Patterns ---
    const fieldPattern = ['/assets/backgrounds/field.png', '/assets/backgrounds/field.png', '/assets/backgrounds/field.png', '/assets/backgrounds/forest-1.png', '/assets/backgrounds/forest-1.png', '/assets/backgrounds/forest-1.png'];
    const fieldRepetitions = Math.ceil(this.scrollWidth / (fieldPattern.length * 1920));
    this.fieldAndForestPattern = Array.from({ length: fieldRepetitions }, () => fieldPattern).flat();
    const mountainsPattern = ['/assets/backgrounds/mountains_ob.png', ...Array(7).fill('/assets/backgrounds/mountains.png')];
    const mountainRepetitions = Math.ceil(this.scrollWidth / (mountainsPattern.length * 1920));
    this.mountainsPattern = Array.from({ length: mountainRepetitions }, () => mountainsPattern).flat();

    // --- Chests Initialization ---
    const chestSections = Object.keys(content).map(key => ({ id: key, ...content[key] }));
    const chestTypes = ['modal', 'list', 'inventory', 'modal', 'modal']; // Matched to content.json order
    
    this.chests = chestSections.map((section, i) => ({
      id: i,
      positionX: 2000 * (i + 1),
      content: section,
      isOpen: false,
      type: chestTypes[i],
    }));
  },
  mounted() {
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);

    // Set font size CSS variables
    for (const [key, value] of Object.entries(FONT_SIZES)) {
      const cssVarName = `--font-size-${key.toLowerCase().replace(/_/g, '-')}`;
      document.documentElement.style.setProperty(cssVarName, value);
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.boundHandleKeyDown);
    window.removeEventListener('keyup', this.boundHandleKeyUp);
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
}
.scroll-content {
  height: 1px;
}
</style>
