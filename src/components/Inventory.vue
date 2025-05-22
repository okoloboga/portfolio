<template>
  <div class="inventory">
    <img class="grid" src="/assets/inventory/grid.png" />
    <div v-for="item in items" :key="item.id" class="item" :style="{ backgroundImage: `url(${item.icon})` }" @click="$emit('openModal', item)"></div>
  </div>
</template>

<script>
export default {
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
}
.grid {
  position: absolute;
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
}
.item {
  position: absolute;
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}
</style>
