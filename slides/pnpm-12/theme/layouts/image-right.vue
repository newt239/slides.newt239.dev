<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'
</script>

<template>
  <div class="slidev-layout pn-image-right">
    <div class="pn-image-right-body">
      <slot />
    </div>
    <div class="pn-image-right-media">
      <slot name="media" />
    </div>
    <SlideFooter />
  </div>
</template>

<style>
.pn-image-right-body {
  max-width: 42cqw;
}

.pn-image-right-media {
  position: absolute;
  right: var(--pn-margin-x);
  top: 18cqh;
  width: 40.5cqw;
  height: 40.5cqw;
}

.pn-image-right-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
