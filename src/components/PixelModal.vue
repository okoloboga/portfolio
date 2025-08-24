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
    modalStyle() {
      const isProject = this.content.type === 'project';
      const framePath = isProject ? '/assets/windows/96x96_split.png' : '/assets/windows/64x64.png';
      const borderWidth = isProject ? '32px' : '24px'; // Adjusted for better visual fit
      const slice = isProject ? 32 : 24;

      return {
        borderImage: `url(${framePath}) ${slice} repeat`,
        borderWidth: borderWidth,
        padding: borderWidth, // Ensure padding matches border width
      };
    },
  },
};
</script>

<template>
  <div class="modal" :style="modalStyle">
    <div class="content" :class="{ split: content.type === 'project' }">
      <!-- Project Type -->
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

      <!-- Text/Default Type -->
      <div v-else class="text">
        <h2>{{ t(`${content.id}.title`) }}</h2>
        <img v-if="content.image" :src="content.image" class="modal-image" />
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
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  min-width: 320px;
  box-sizing: border-box;
  image-rendering: pixelated;
}
.content {
  width: 100%;
  height: 100%;
  color: #B0BEC5;
  font-family: 'VT323', monospace;
  overflow-y: auto;
}
.close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: url('/assets/ui/close.png') no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  cursor: pointer;
  z-index: 10;
}

/* Text Type */
.text {
  text-align: center;
  white-space: normal;
  width: 100%;
}
.text h2 {
  font-size: var(--font-size-large-title);
}
.text p {
  font-size: var(--font-size-body);
  text-align: left; /* Justify text for readability */
}
.modal-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  image-rendering: auto;
  margin-bottom: 15px;
}

/* Project Type */
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.media img {
  width: 100%;
  max-width: 400px;
  height: auto;
  image-rendering: pixelated;
}
</style>
