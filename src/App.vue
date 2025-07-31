<template>
  <PixelHeader @scrollTo="scrollToSection" />
  <div class="container" ref="container" @scroll="updateScroll">
    <div class="scroll-content" :style="{ width: scrollWidth + 'px' }"></div>
    <ParallaxLayer :src="sky" class="sky" :speed="0.1" :zIndex="-4" :scrollWidth="scrollWidth" />
    <ParallaxLayer :images="mountainsPattern" class="mountains" :speed="0.3" :zIndex="-3" :scrollWidth="scrollWidth" />
    <ParallaxLayer :images="fieldAndForestPattern" class="field-forest" :speed="0.6" :zIndex="-2" :scrollWidth="scrollWidth" />
    <ParallaxLayer :src="header" class="header" :speed="0.8" :zIndex="-1" :scrollWidth="scrollWidth" />
    <PixelCharacter :isWalking="isWalking" :direction="direction" />
    <PixelChest v-for="chest in chests" :key="chest.id" :positionX="chest.positionX" :isOpen="chest.isOpen" :scrollX="scrollX" @open="handleChestOpen(chest)" />
    <PixelInventory v-if="activeInventory" :items="activeInventory.content.items" @openModal="openModal" @close="closePopups" />
    <PixelModal v-if="activeModalContent" :content="activeModalContent" @close="closeModal" />
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
import content from './data/content.json';

export default {
  components: { ParallaxLayer, PixelCharacter, PixelChest, PixelModal, PixelInventory, PixelHeader },
  data() {
    return {
      sky: '/assets/backgrounds/sky.png',
      mountains: '/assets/backgrounds/mountains.png',
      header: '/assets/header/header.png',
      scrollX: 0,
      scrollWidth: 25000, // Arbitrary width for scrolling
      fieldAndForestPattern: [],
      mountainsPattern: [],
      isWalking: false,
      direction: 'right',
      chests: [],
      activeModalContent: null,
      activeInventory: null,
    };
  },
  methods: {
    updateScroll() {
      this.closePopups();
      this.scrollX = this.$refs.container.scrollLeft;
      document.documentElement.style.setProperty('--scrollX', `${this.scrollX}px`);
    },
    handleKeyDown(event) {
      this.closePopups();
      if (!this.$refs.container) return;
      if (event.key === 'ArrowRight') {
        this.isWalking = true;
        this.direction = 'right';
        const scrollAmount = 15;
        this.$refs.container.scrollLeft += scrollAmount;
      } else if (event.key === 'ArrowLeft') {
        this.isWalking = true;
        this.direction = 'left';
        const scrollAmount = 15;
        this.$refs.container.scrollLeft -= scrollAmount;
      }
    },
    handleKeyUp(event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        this.isWalking = false;
      }
    },
    scrollToNextChest() {
      // Placeholder for chest scrolling logic
      const scrollAmount = 500;
      this.$refs.container.scrollLeft += scrollAmount;
    },
    scrollToSection(chestIndex) {
      if (chestIndex === -1) {
        this.$refs.container.scrollLeft = 0;
        return;
      }

      const chest = this.chests[chestIndex];
      if (chest) {
        const chestPosition = chest.positionX;
        // We scroll a bit before the chest to make it visible
        this.$refs.container.scrollLeft = chestPosition / 1.6 - 300;
      }
    },
    closeModal() {
      this.activeModalContent = null;
    },
    handleChestOpen(chest) {
      this.closePopups();
      chest.isOpen = true;
      if (chest.type === 'inventory') {
        this.activeInventory = chest;
      } else if (chest.type === 'modal') {
        this.activeModalContent = { chestId: chest.id, ...chest.content.items[0] };
      }
    },
    openModal(item) {
      this.activeModalContent = item;
      // We don't close the inventory here anymore, closePopups handles it
    },
    closeInventory() {
      if (this.activeInventory) {
        this.activeInventory.isOpen = false;
        this.activeInventory = null;
      }
    },
    closePopups() {
      this.closeInventory();
      if (this.activeModalContent) {
        // Find which chest was opened for this modal and close it
        const chestToClose = this.chests.find(c => c.id === this.activeModalContent.chestId);
        if (chestToClose) {
          chestToClose.isOpen = false;
        }
        this.activeModalContent = null;
      }
    },
  },
  created() {
    const pattern = [
      '/assets/backgrounds/field.png',
      '/assets/backgrounds/field.png',
      '/assets/backgrounds/field.png',
      '/assets/backgrounds/forest-1.png',
      '/assets/backgrounds/forest-1.png',
      '/assets/backgrounds/forest-1.png',
    ];
    const repetitions = Math.ceil(this.scrollWidth / (pattern.length * 1920)); // Assuming 1920px width per image
    this.fieldAndForestPattern = Array.from({ length: repetitions }, () => pattern).flat();

    const mountainsPattern = [
      '/assets/backgrounds/mountains_ob.png',
      ...Array(7).fill('/assets/backgrounds/mountains.png'),
    ];
    const mountainRepetitions = Math.ceil(this.scrollWidth / (mountainsPattern.length * 1920));
    this.mountainsPattern = Array.from({ length: mountainRepetitions }, () => mountainsPattern).flat();

    // Create an array of sections that includes their ID
    const chestSections = Object.keys(content).map(key => ({
      id: key,
      ...content[key]
    }));

    // Initialize chests
    const chestTypes = ['modal', 'inventory', 'inventory', 'modal', 'modal']; // 1,4,5=modal; 2,3=inventory
    for (let i = 0; i < 5; i++) {
      this.chests.push({ 
        id: i, 
        positionX: 2000 * (i + 1), 
        content: chestSections[i], 
        isOpen: false, 
        type: chestTypes[i] 
      });
    }
  },
  mounted() {
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);
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
