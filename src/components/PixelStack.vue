<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PixelStack',
  props: {
    content: Object,
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  computed: {
    frameSrc() {
      return '/assets/windows/96x96.png'; // Using a large frame
    },
  },
};
</script>

<template>
  <div class="stack-modal">
    <img class="frame" :src="frameSrc" />
    <div class="content">
      <h2>{{ t('nav.stack') }}</h2>
      <div class="list-container">
        <div v-for="item in content.items" :key="item.id" class="list-item" @click="$emit('itemClick', item)">
          <img :src="item.icon" class="list-item-icon" />
          <span class="list-item-title">{{ t(`${item.id}.title`) }}</span>
        </div>
      </div>
      <div class="close" @click="$emit('close')"></div>
    </div>
  </div>
</template>

<style scoped>
.stack-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px; /* Adjusted for a better list view */
  max-height: 80vh;
  min-width: 320px;
  color: #B0BEC5;
  font-family: 'VT323', monospace;
}
.frame {
  position: absolute;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  z-index: -1;
  border-image: url('/assets/windows/96x96.png') 32 repeat;
  border-width: 32px;
  box-sizing: border-box;
}
.content {
  position: relative;
  padding: 40px;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
  text-align: center;
}
.content h2 {
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 20px;
}
.close {
  position: absolute;
  top: 45px;
  right: 45px;
  width: 32px;
  height: 32px;
  background: url('/assets/ui/close.png') no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  cursor: pointer;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}
.list-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.2s;
}
.list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.list-item-icon {
  width: 32px;
  height: 32px;
  margin-right: 15px;
  image-rendering: pixelated;
}
.list-item-title {
  font-size: 22px;
}
</style>
