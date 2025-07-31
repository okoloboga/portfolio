<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PixelModal',
  props: {
    content: Object,
  },
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  computed: {
    frameSrc() {
      return this.content.type === 'project' ? '/assets/windows/96x96_split.png' : '/assets/windows/64x64.png';
    },
  },
};
</script>

<template>
  <div class="modal">
    <img class="frame" :src="frameSrc" />
    <div class="content" :class="{ split: content.type === 'project' }">
      <div v-if="content.type === 'project'" class="text">
        <h2>{{ t(`${content.id}.title`) }}</h2>
        <p>{{ t(`${content.id}.description`) }}</p>
        <div v-for="link in content.links" :key="link.url">
          <a :href="link.url">{{ t(`${link.label}.title`) }}</a>
        </div>
      </div>
      <div v-if="content.type === 'project'" class="media">
        <img v-for="src in content.screenshots" :key="src" :src="src" />
      </div>
      <div v-else class="text">
        <h2>{{ t(`${content.id}.title`) }}</h2>
        <p>{{ t(`${content.id}.description`) }}</p>
      </div>
      <div class="close" @click="$emit('close')"></div>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Responsive sizing */
  width: 80%;
  /* No fixed height - it will be determined by content */

  /* Constraints */
  max-width: 960px;
  max-height: 80vh; /* Max 80% of viewport height */
  min-width: 320px;
}
.frame {
  position: absolute;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
.content {
  position: relative;
  padding: 50px;
  color: #B0BEC5;
  font-family: 'VT323', monospace;
  overflow-y: auto; /* Add scrollbar if content overflows */
  max-height: calc(80vh - 80px); /* Match parent max-height minus padding */
}
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.text {
  overflow-y: auto;
  max-height: 500px;
  text-align: center;
  white-space: normal;
  width: 80%; /* Adjusted width */
  margin: 0 auto;
}

.text h2 {
  font-size: 24px; /* Increased title font size */
}

.text p {
  font-size: 20px; /* Increased content font size */
}
.media img {
  width: 400px;
  height: 300px;
  image-rendering: pixelated;
}
.close {
  position: absolute;
  top: 58px; /* Move down */
  right: 30px; /* Move left */
  width: 16px;
  height: 16px;
  background: url('/assets/ui/close.png') no-repeat center;
  background-size: 16px 16px;
  image-rendering: pixelated;
  cursor: pointer;
  transform: scale(2);
}
</style>
