<template>
  <div class="inventory">
    <img class="grid" src="/assets/inventory/grid.png" />
    <div class="close-inventory" @click="$emit('close')"></div>
    <div v-for="item in items" :key="item.id" class="item-cell" @click="$emit('openModal', item)">
      <img :src="item.icon" class="item-icon" />
    </div>
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
  width: 420px;
  height: 420px;
  display: grid;
  grid-template: repeat(5, 64px) / repeat(5, 64px);
  gap: 4px;
  padding: 0px; /* Corrected padding */
  justify-content: center; /* Center grid horizontally */
  align-content: center; /* Center grid vertically */
  image-rendering: pixelated;
}
.grid {
  position: absolute;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  z-index: -1;
}
.item-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translate(1px, 1px); /* Nudge the cell position */
}

.item-icon {
  width: 80%;
  height: 80%;
  object-fit: contain;
  image-rendering: pixelated;
}

.item-cell:hover .item-icon {
  filter: brightness(1.2);
}
.close-inventory {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 32px;
  height: 32px;
  background: url('/assets/ui/close.png') no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  cursor: pointer;
}
</style>
