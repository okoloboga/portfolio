<template>
  <div class="character"></div>
</template>

<style>
.character {
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 32px;
  height: 32px;
  background: url('/assets/character/walk.png');
  animation: walk 0.6s steps(4) infinite;
  image-rendering: pixelated;
}
@keyframes walk {
  from { background-position: 0 0; }
  to { background-position: -128px 0; }
}
</style>
