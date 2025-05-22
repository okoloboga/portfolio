<template>
  <div class="chest" :style="{ left: `${x}px` }" :data-section="section" @click="open">
    <div class="chest-sprite" :class="{ opened: opened }"></div>
    <div class="pointer" v-if="!opened">
      <div class="pointer-sprite"></div>
      <span>{{ $t(`nav.${section}`) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PixelChest',
  props: {
    x: Number,
    section: String,
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    open() {
      if (!this.opened) {
        this.opened = true;
        this.$emit('open', this.section);
      }
    },
  },
};
</script>

<style>
.chest {
  position: absolute;
  bottom: 20px;
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
  transform: scale(2); /* Масштабирование в 2x */
}
.chest-sprite {
  width: 100%;
  height: 100%;
  background: url('/assets/chest/chest.png') no-repeat;
  background-size: 128px 32px; /* Предполагаем 4 кадра */
  image-rendering: pixelated;
}
.chest-sprite.opened {
  background-position: -32px 0; /* Второй кадр для открытого сундука */
}
.pointer {
  position: absolute;
  top: -20px;
  width: 32px;
  height: 16px;
  text-align: center;
  image-rendering: pixelated;
}
.pointer-sprite {
  width: 100%;
  height: 100%;
  background: url('/assets/ui/pointer.png') no-repeat;
  background-size: 32px 16px; /* Предполагаем одиночный кадр */
  image-rendering: pixelated;
}
.pointer span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #B0BEC5;
  font-family: 'VT323', monospace;
  font-size: 12px;
}
</style>
