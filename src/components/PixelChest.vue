<template>
  <div class="chest-container" :style="containerStyle" @click="onChestClick">
    <img :src="imageSrc" class="chest-image" />
  </div>
</template>

<script>
export default {
  name: 'PixelChest',
  props: {
    positionX: {
      type: Number,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    scrollX: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    containerStyle() {
      const speed = 0.6; // This MUST match the speed of the field/forest layer
      const transformX = this.positionX - this.scrollX * speed;
      return {
        transform: `translateX(${transformX}px)`,
        bottom: '20px',
      };
    },
    imageSrc() {
      return this.isOpen ? '/assets/chest/chest-open.png' : '/assets/chest/chest-close.png';
    },
  },
  methods: {
    onChestClick() {
      if (!this.isOpen) {
        this.$emit('open');
      }
    },
  },
};
</script>

<style>
.chest-container {
  position: absolute;
  width: 256px;
  height: 256px;
  cursor: pointer;
  z-index: 5;
}

.chest-image {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
</style>