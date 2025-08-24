<template>
  <div class="image-gallery-overlay" @click.self="close">
    <button class="close-button" @click="close">×</button>
    <button class="prev-button" @click="prevImage">‹</button>
    <img :src="images[currentIndex]" class="gallery-image" />
    <button class="next-button" @click="nextImage">›</button>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    images: {
      type: Array,
      required: true,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentIndex: this.initialIndex,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.nextImage();
      } else if (e.key === 'ArrowLeft') {
        this.prevImage();
      } else if (e.key === 'Escape') {
        this.close();
      }
    });
  },
};
</script>

<style scoped>
.image-gallery-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.gallery-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  image-rendering: auto; /* Ensure smooth rendering */
}

.close-button, .prev-button, .next-button {
  position: absolute;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  user-select: none;
}

.close-button {
  top: 20px;
  right: 30px;
  font-size: 4rem;
}

.prev-button {
  left: 20px;
}

.next-button {
  right: 20px;
}
</style>
