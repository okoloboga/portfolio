<template>
  <div class="chest" :style="{ left: `${x}px` }" :data-section="section" @click="open">
    <img :src="chestSrc" />
    <div class="pointer" v-if="!opened">{{ $t(`nav.${section}`) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    x: Number,
    section: String,
  },
  data() {
    return {
      opened: false,
      chestSrc: '/assets/chest/chest.png',
    };
  },
  methods: {
    open() {
      if (!this.opened) {
        this.opened = true;
        this.chestSrc = '/assets/chest/chest.png'; // Update to open frame
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
}
.pointer {
  position: absolute;
  top: -20px;
  width: 32px;
  height: 16px;
  background: url('/assets/ui/pointer.png');
  color: #B0BEC5;
  font-family: 'VT323', monospace;
  text-align: center;
  image-rendering: pixelated;
}
</style>
