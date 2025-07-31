<template>
  <div v-if="src" class="parallax-layer" :style="layerStyle"></div>
  <div v-else-if="images && images.length" class="parallax-layer-sequence" :style="sequenceStyle">
    <img v-for="(image, index) in images" :key="index" :src="image" :style="imageStyle()" />
  </div>
</template>

<script>
export default {
  name: 'ParallaxLayer',
  props: {
    src: String,
    images: Array,
    speed: Number,
    zIndex: {
      type: Number,
      default: -1,
    },
    scrollWidth: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    layerStyle() {
      const scrollX = this.$root.scrollX || 0;
      const positionX = -scrollX * this.speed;

      const baseStyle = {
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: this.zIndex,
        imageRendering: 'pixelated',
        backgroundImage: `url(${this.src})`,
      };

      if (this.speed === 0) {
        return {
          ...baseStyle,
          width: '100%',
          backgroundPosition: '0 0',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'fixed',
        };
      }

      return {
        ...baseStyle,
        width: `${this.scrollWidth}px`,
        backgroundPositionX: `${positionX}px`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100vh',
      };
    },
    sequenceStyle() {
      const scrollX = this.$root.scrollX || 0;
      const positionX = -scrollX * this.speed;
      return {
        transform: `translateX(${positionX}px)`,
        width: `${this.scrollWidth}px`,
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: this.zIndex,
        display: 'flex',
      };
    },
    imageStyle() {
      return () => ({
        width: '1920px',
        height: '100vh',
        objectFit: 'cover',
        imageRendering: 'pixelated',
      });
    },
  },
};
</script>

<style>
.parallax-layer {
  flex-shrink: 0;
}
</style>
