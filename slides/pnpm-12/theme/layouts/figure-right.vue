<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'
</script>

<template>
  <div class="slidev-layout pn-default pn-figure-right">
    <slot />
    <div class="pn-figure-right-media">
      <slot name="media" />
    </div>
    <SlideFooter />
  </div>
</template>

<style>
.pn-figure-right > ul,
.pn-figure-right > ol,
.pn-figure-right > p {
  max-width: 44cqw;
}

.pn-figure-right-media {
  position: absolute;
  right: var(--pn-margin-x);
  top: 18cqh;
}

.pn-figure-right-media img {
  display: block;
  border: 1px solid var(--pn-line);
}
</style>
