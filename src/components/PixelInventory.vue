<template>
  <div class="inventory">
    <img class="grid" src="/assets/inventory/grid.png" />
    <div v-for="item in items" :key="item.id" class="item" :style="{ backgroundImage: `url(${item.icon})` }" @click="$emit('openModal', item)"></div>
  </div>
</template>

<script>
export default {
  name: 'PixelInventory',
  props: {
    items: Array,
  },
};
</script>

<style>
.inventory {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 96px;
  height: 96px;
  display: grid;
  grid-template: repeat(5, 16px) / repeat(5, 16px);
  gap: 3px; /* Учитываем отступы в сетке 96x96 */
  padding: 3px; /* Учитываем рамку */
  image-rendering: pixelated;
}
.grid {
  position: absolute;
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
  z-index: -1;
}
.item {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  cursor: pointer;
}
.item:hover {
  filter: brightness(1.2);
}
</style>
