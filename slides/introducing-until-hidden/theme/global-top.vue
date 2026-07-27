<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()
</script>

<template>
  <div class="a1-footer">
    <span>{{ $slidev.configs.eventDate }}</span>
    <span>{{ $slidev.nav.currentPage }}</span>
  </div>
</template>

<style>
.a1-footer {
  position: absolute;
  left: var(--a1-margin-x);
  right: var(--a1-margin-x);
  top: var(--a1-footer-top);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--a1-fg);
  font-family: var(--a1-font);
  font-weight: 500;
  font-size: var(--a1-footer-size);
  line-height: 1.2;
  pointer-events: none;
}
</style>
