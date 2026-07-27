<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'
</script>

<template>
  <div class="slidev-layout a1-image-right">
    <div class="a1-image-right-body">
      <slot />
    </div>
    <div class="a1-image-right-media">
      <slot name="media" />
    </div>
    <SlideFooter />
  </div>
</template>

<style>
.a1-image-right-body {
  max-width: 45cqw;
}

.a1-image-right-media {
  position: absolute;
  left: 55.5cqw;
  top: 17.5cqh;
  width: 37.5cqw;
  height: 37.5cqw;
}

.a1-image-right-media img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
