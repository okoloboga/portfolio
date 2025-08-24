<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PixelProject',
  props: {
    content: Object, // Expects the 'projects' object from content.json
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
  <div class="project-modal">
    <img class="frame" :src="frameSrc" />
    <div class="content">
      <h2>{{ t('nav.projects') }}</h2>
      <div class="project-grid">
        <div v-for="project in content.items" :key="project.id" class="project-card">
          <div class="card-media">
            <img v-if="project.screenshots && project.screenshots.length" :src="project.screenshots[0]" class="screenshot" />
          </div>
          <div class="card-text">
            <h3>{{ t(`${project.id}.title`) }}</h3>
            <p>{{ t(`${project.id}.description`) }}</p>
            <div class="links">
              <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank">{{ t(link.label) }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="close" @click="$emit('close')"></div>
    </div>
  </div>
</template>

<style scoped>
.project-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1200px;
  height: 90vh;
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
  padding: 40px;
  height: 100%;
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

.project-grid {
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  padding: 10px;
}

.project-card {
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid #455A64;
  padding: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.card-media .screenshot {
  width: 100%;
  height: 200px;
  object-fit: cover;
  image-rendering: pixelated;
  margin-bottom: 15px;
}

.card-text h3 {
  font-size: var(--font-size-medium-title);
  margin: 0 0 10px 0;
}

.card-text p {
  font-size: var(--font-size-body);
  flex-grow: 1;
}

.links a {
  color: #4FC3F7;
  text-decoration: none;
  margin-right: 15px;
}
.links a:hover {
  text-decoration: underline;
}
</style>