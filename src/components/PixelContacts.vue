<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PixelContacts',
  props: {
    content: Object, // Expects the 'contacts' object from content.json
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  computed: {
    frameSrc() {
      return '/assets/windows/96x96.png';
    },
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<template>
  <div class="contacts-modal">
    <img class="frame" :src="frameSrc" />
    <div class="content">
      <h2>{{ t('nav.contacts') }}</h2>
      <div class="list-container">
        <div v-for="item in content.items" :key="item.id" class="contact-item" @click="openLink(item.url)">
          <img :src="item.icon" class="item-icon" />
          <span class="item-title">{{ t(item.title) }}</span>
        </div>
      </div>
      <div class="close" @click="$emit('close')"></div>
    </div>
  </div>
</template>

<style scoped>
.contacts-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  max-height: 80vh;
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
  max-height: calc(80vh - 80px);
  text-align: center;
  display: flex;
  flex-direction: column;
}
.content h2 {
  font-size: var(--font-size-large-title);
  margin-top: 0;
  margin-bottom: 20px;
  flex-shrink: 0;
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
  overflow-y: auto;
  flex-grow: 1;
}
.contact-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.2s;
}
.contact-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.item-icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
  image-rendering: pixelated;
}
.item-title {
  font-size: var(--font-size-medium-title);
}
</style>
