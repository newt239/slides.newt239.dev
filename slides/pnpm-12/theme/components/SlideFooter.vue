<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev, $page } = useSlideContext()

const pad = (value: number) => String(value).padStart(2, '0')
const pageLabel = computed(() => `${pad($page.value)} / ${pad($slidev.nav.total)}`)
</script>

<template>
  <div class="pn-footer">
    <span class="pn-footer-title">{{ $slidev.configs.title }}</span>
    <span class="pn-footer-page">{{ pageLabel }}</span>
  </div>
</template>

<style>
.pn-footer {
  position: absolute;
  left: var(--pn-margin-x);
  right: var(--pn-margin-x);
  top: calc(var(--pn-footer-top) - var(--pn-footer-rule-gap));
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2cqw;
  padding-top: var(--pn-footer-rule-gap);
  border-top: 1px solid var(--pn-line);
  color: var(--pn-muted);
  font-weight: 500;
  font-size: var(--pn-footer-size);
  line-height: 1.25;
  pointer-events: none;
}

.pn-footer-title {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pn-footer-page {
  flex: none;
  color: var(--pn-fg);
  font-weight: 700;
  font-size: 1.25em;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
}
</style>
