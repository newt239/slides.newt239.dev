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
  left: 51.951cqw;
  top: var(--a1-title-top);
  width: 41.173cqw;
  height: 41.173cqw;
}

.a1-image-right-media img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
