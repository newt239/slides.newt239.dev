<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev, $page } = useSlideContext()

const progress = computed(() => `${($page.value / $slidev.nav.total) * 100}%`)
const pageLabel = computed(() => String($page.value).padStart(2, '0'))
</script>

<template>
  <div class="a1-footer">
    <span class="a1-footer-title">{{ $slidev.configs.title }}</span>
    <span class="a1-footer-page">{{ pageLabel }}</span>
  </div>
  <div class="a1-progress">
    <div class="a1-progress-fill" :style="{ width: progress }" />
  </div>
</template>

<style>
.a1-footer {
  position: absolute;
  left: var(--a1-margin-x);
  right: var(--a1-margin-x);
  top: calc(var(--a1-footer-top) - var(--a1-footer-rule-gap));
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2cqw;
  padding-top: var(--a1-footer-rule-gap);
  border-top: 1px solid var(--a1-line);
  color: var(--a1-muted);
  font-weight: 500;
  font-size: var(--a1-footer-size);
  line-height: 1.2;
  pointer-events: none;
}

.a1-footer-title {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.a1-footer-page {
  flex: none;
  color: var(--a1-fg);
  font-weight: 700;
  font-size: 1.15em;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
}

.a1-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--a1-progress-h);
  background: var(--a1-line);
  pointer-events: none;
}

.a1-progress-fill {
  height: 100%;
  background: var(--a1-accent);
}
</style>
