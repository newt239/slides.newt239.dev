<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'
</script>

<template>
  <div class="slidev-layout mb-default mb-figure-bottom">
    <slot />
    <div class="mb-figure-bottom-media">
      <slot name="media" />
    </div>
    <SlideFooter />
  </div>
</template>

<style>
.mb-figure-bottom-media {
  position: absolute;
  left: var(--mb-margin-x);
  right: var(--mb-margin-x);
  top: 38cqh;
  bottom: 11cqh;
}

.mb-figure-bottom-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
</style>
