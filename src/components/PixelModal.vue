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
  padding: 50px; /* Increased padding for visual space */
  color: #B0BEC5;
  font-family: 'VT323', monospace;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
}
.close {
  position: absolute;
  top: 50px;
  right: 45px;
  width: 32px;
  height: 32px;
  background: url('/assets/ui/close.png') no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  cursor: pointer;
}

/* Text Type */
.text {
  text-align: center;
  white-space: normal;
  width: 85%; /* Constrain text width to prevent overflow */
  margin: 0 auto; /* Center the constrained block */
}
.text h2 {
  font-size: var(--font-size-large-title);
}
.text p {
  font-size: var(--font-size-body);
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
