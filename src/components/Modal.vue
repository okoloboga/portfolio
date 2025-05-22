<template>
  <div class="modal">
    <img class="frame" :src="frameSrc" />
    <div class="content" :class="{ split: content.type === 'project' }">
      <div v-if="content.type === 'project'" class="text">
        <h2>{{ $t(`content.${content.id}.title`) }}</h2>
        <p>{{ $t(`content.${content.id}.description`) }}</p>
        <div v-for="link in content.links" :key="link.url">
          <a :href="link.url">{{ link.label }}</a>
        </div>
      </div>
      <div v-if="content.type === 'project'" class="media">
        <img v-for="src in content.screenshots" :key="src" :src="src" />
      </div>
      <div v-else class="text">
        <h2>{{ $t(`content.${content.id}.title`) }}</h2>
        <p>{{ $t(`content.${content.id}.description`) }}</p>
      </div>
      <div class="close" @click="$emit('close')"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: Object,
  },
  computed: {
    frameSrc() {
      return this.content.type === 'project' ? '/assets/windows/96x96_split.png' : '/assets/windows/64x64.png';
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
  height: 540px;
}
.frame {
  position: absolute;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
.content {
  position: relative;
  padding: 20px;
  color: #B0BEC5;
  font-family: 'VT323', monospace;
}
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.text {
  overflow-y: auto;
  max-height: 500px;
}
.media img {
  width: 400px;
  height: 300px;
  image-rendering: pixelated;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  background: url('/assets/ui/close.png');
  image-rendering: pixelated;
  cursor: pointer;
}
</style>
