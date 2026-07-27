<script setup lang="ts">
defineProps<{ subtitle?: string }>()
</script>

<template>
  <div class="slidev-layout a1-cover">
    <slot />
    <div v-if="subtitle" class="a1-cover-subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>

<style>
.a1-cover h1 {
  font-size: var(--a1-cover-title-size);
}

.a1-cover-subtitle {
  position: absolute;
  right: var(--a1-margin-x);
  bottom: var(--a1-subtitle-bottom);
  font-size: var(--a1-subtitle-size);
  text-align: right;
}
</style>
