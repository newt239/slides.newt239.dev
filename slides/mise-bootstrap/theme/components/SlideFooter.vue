<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev, $page } = useSlideContext()

const pad = (value: number) => String(value).padStart(2, '0')
const pageLabel = computed(() => `${pad($page.value)} / ${pad($slidev.nav.total)}`)
</script>

<template>
  <div class="mb-footer">
    <span class="mb-footer-title">{{ $slidev.configs.title }}</span>
    <span class="mb-footer-page">{{ pageLabel }}</span>
  </div>
</template>

<style>
.mb-footer {
  position: absolute;
  left: var(--mb-margin-x);
  right: var(--mb-margin-x);
  top: var(--mb-footer-top);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--mb-muted);
  font-size: var(--mb-footer-size);
  line-height: 1;
  pointer-events: none;
}

.mb-footer-page {
  color: var(--mb-fg);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}
</style>
