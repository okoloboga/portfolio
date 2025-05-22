<template>
  <div class="layer" :style="layerStyle">
    <img :src="src" :style="{ width: `${width}px` }" />
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    speed: Number,
    offset: { type: Number, default: 0 },
  },
  computed: {
    layerStyle() {
      return {
        transform: `translateX(calc(-${this.$root.scrollX * this.speed}px + ${this.offset}px))`,
      };
    },
    width() {
      return this.src.includes('sky') ? 1920 : this.src.includes('mountains') ? 2000 : 2000;
    },
  },
};
</script>

<style>
.layer {
  position: absolute;
  image-rendering: pixelated;
}
</style>
