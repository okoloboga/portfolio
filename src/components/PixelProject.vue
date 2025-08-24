<script>
import { useI18n } from 'vue-i18n';
import ImageGallery from './ImageGallery.vue';

export default {
  name: 'PixelProject',
  components: {
    ImageGallery,
  },
  props: {
    content: Object, // Expects a single project item
  },
  data() {
    return {
      isGalleryOpen: false,
      galleryInitialIndex: 0,
    };
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  computed: {
    frameSrc() {
      return '/assets/windows/96x96_split.png';
    },
  },
  methods: {
    openGallery(index) {
      this.galleryInitialIndex = index;
      this.isGalleryOpen = true;
    },
    closeGallery() {
      this.isGalleryOpen = false;
    },
  },
};
</script>

<template>
  <div>
    <div class="project-modal">
      <img class="frame" :src="frameSrc" />
      <div class="content">
        <div class="text-content">
          <h2>{{ t(`${content.id}.title`) }}</h2>
          <p>{{ t(`${content.id}.description`) }}</p>
          <div class="links">
            <a v-for="link in content.links" :key="link.url" :href="link.url" target="_blank">{{ t(link.label) }}</a>
          </div>
        </div>
        <div class="media-content">
          <img v-for="(screenshot, index) in content.screenshots" :key="index" :src="screenshot" @click="openGallery(index)" style="cursor: pointer;" />
        </div>
        <div class="close" @click="$emit('close')"></div>
      </div>
    </div>
    <ImageGallery
      v-if="isGalleryOpen"
      :images="content.screenshots"
      :initial-index="galleryInitialIndex"
      @close="closeGallery"
    />
  </div>
</template>

<style scoped>
.project-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1000px;
  height: 80vh;
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
  padding: 80px;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;
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

.text-content {
  white-space: normal;
  overflow-y: auto;
  max-height: 100%;
}
.text-content h2 {
  font-size: var(--font-size-large-title);
  text-align: center;
}
.text-content p {
  font-size: var(--font-size-body);
}

.media-content {
  overflow-y: auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.media-content img {
  width: 100%;
  height: auto;
  image-rendering: auto; /* Changed from pixelated */
  cursor: pointer; /* Add cursor pointer */
}

.links {
  margin-top: 20px;
}
.links a {
  color: #4FC3F7;
  text-decoration: none;
  margin-right: 15px;
  font-size: var(--font-size-body);
}
.links a:hover {
  text-decoration: underline;
}
</style>
