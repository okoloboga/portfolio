<template>
  <img v-if="isWalking" src="/assets/character/Pink_Monster_Walk_6.gif" class="character-gif" :style="characterStyle" />
  <div v-else class="character-static" :style="characterStyle"></div>
</template>

<script>
export default {
  name: 'PixelCharacter',
  props: {
    isWalking: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'right',
    },
  },
  computed: {
    characterStyle() {
      return {
        transform: this.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
      };
    },
  },
};
</script>

<style>
.character-static, .character-gif {
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 256px; /* 8x size */
  height: 256px; /* 8x size */
  image-rendering: pixelated;
  z-index: 10;
}

.character-static {
  background-image: url('/assets/character/walk.png');
  background-repeat: no-repeat;
  background-size: 256px 1536px; /* 256px width, 6 frames * 256px height */
  background-position: 0 0; /* Display the top-most frame */
}
</style>
