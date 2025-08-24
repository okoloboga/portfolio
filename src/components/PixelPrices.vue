<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PixelPrices',
  props: {
    content: Object, // Expects the 'prices' object from content.json
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
};
</script>

<template>
  <div class="prices-modal">
    <img class="frame" :src="frameSrc" />
    <div class="content">
      <h2>{{ t('nav.prices') }}</h2>
      <div class="list-container">
        <template v-for="item in content.items" :key="item.id">
          <div v-if="item.type === 'category'" class="category-header">
            <h3>{{ t(item.title) }}</h3>
          </div>
          <div v-if="item.type === 'price_item'" class="price-item">
            <img :src="item.icon" class="item-icon" />
            <div class="item-details">
              <span class="item-title">{{ t(item.title) }}</span>
              <span class="item-hours">{{ item.hours }} {{ t('prices.hours') }}</span>
            </div>
            <div class="item-pricing">
              <span class="item-hourly">{{ item.hourly_rate }}/{{ t('prices.hour') }}</span>
              <span class="item-total">{{ item.total }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="close" @click="$emit('close')"></div>
    </div>
  </div>
</template>

<style scoped>
.prices-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
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
}
.content {
  position: relative;
  padding: 70px;
  max-height: calc(80vh - 140px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
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
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
  text-align: left;
}

.category-header {
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #455A64;
  padding-bottom: 5px;
}
.category-header h3 {
  font-size: var(--font-size-medium-title);
  margin: 0;
}

.price-item {
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid rgba(70, 90, 100, 0.5);
}

.item-icon {
  width: 32px;
  height: 32px;
  margin-right: 15px;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.item-pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 120px;
}

.item-title, .item-hourly, .item-total {
  font-size: var(--font-size-body);
}

.item-hours {
  font-size: 16px;
  color: #78909C;
}

.item-total {
  font-weight: bold;
}
</style>
