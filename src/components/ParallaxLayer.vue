<template>
  <div class="parallax-layer" :style="layerStyle">
    <img :src="src" alt="Parallax Layer" />
  </div>
</template>

<script>
export default {
  name: 'ParallaxLayer',
  props: {
    src: String,
    speed: Number,
    offset: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: String,
      default: '-1',
    },
  },
  computed: {
    layerStyle() {
      return {
        transform: `translateX(${this.offset - this.$root.scrollX * this.speed}px)`, /* Учитываем offset */
        width: '100%',
        height: '100vh', /* Масштабируем до высоты экрана */
        position: this.src.includes('sky.png') ? 'fixed' : 'absolute',
        top: '0', /* Выравниваем по верхнему краю */
        left: '0',
        zIndex: this.zIndex,
        imageRendering: 'pixelated',
      };
    },
  },
};
</script>

<style>
.parallax-layer {
  flex-shrink: 0; /* Предотвращаем сжатие слоёв */
}
.parallax-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Масштабируем изображение */
  image-rendering: pixelated;
}
</style>
