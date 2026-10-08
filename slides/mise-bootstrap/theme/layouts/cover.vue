<script setup lang="ts">
defineProps<{ speaker?: string }>()
</script>

<template>
  <div class="slidev-layout mb-cover">
    <slot />
    <div v-if="speaker" class="mb-cover-speaker">{{ speaker }}</div>
  </div>
</template>

<style>
.slidev-layout.mb-cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 0;
}

.slidev-layout.mb-cover::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.6cqh;
  background: var(--mb-accent);
}

.slidev-layout.mb-cover h1 {
  display: block;
  margin: 0;
  font-size: var(--mb-cover-title-size);
  line-height: 1.3;
}

.slidev-layout.mb-cover h1::before {
  content: none;
}

.mb-cover-speaker {
  margin-top: 6cqh;
  font-size: var(--mb-subtitle-size);
  font-weight: 700;
}
</style>
