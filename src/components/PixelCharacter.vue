<template>
  <div class="character"></div>
</template>

<script>
export default {
  name: 'PixelCharacter',
};
</script>

<style>
.character {
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 32px;
  height: 32px;
  background: url('/assets/character/walk.png') no-repeat;
  background-size: 128px 32px; /* 4 кадра по 32px */
  animation: walk 0.6s steps(4) infinite;
  image-rendering: pixelated;
  transform: scale(2); /* Масштабирование в 2x */
}
@keyframes walk {
  from { background-position: 0 0; }
  to { background-position: -128px 0; }
}
</style>
