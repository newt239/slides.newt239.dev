<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'
</script>

<template>
  <div class="slidev-layout mb-default mb-image-right">
    <div class="mb-image-right-body">
      <slot />
    </div>
    <div class="mb-image-right-media">
      <slot name="media" />
    </div>
    <SlideFooter />
  </div>
</template>

<style>
.mb-image-right-body {
  max-width: 50cqw;
}

.mb-image-right-media {
  position: absolute;
  right: var(--mb-margin-x);
  top: 50%;
  translate: 0 -50%;
  width: 30cqw;
  height: 30cqw;
}

.mb-image-right-media img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 0.6cqw var(--mb-accent-soft);
}
</style>
