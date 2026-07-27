<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

defineProps<{ subtitle?: string, speaker?: string }>()

const { $slidev } = useSlideContext()
</script>

<template>
  <div class="slidev-layout a1-cover">
    <div class="a1-cover-head">
      <slot />
      <div v-if="speaker" class="a1-cover-speaker">{{ speaker }}</div>
    </div>
    <div class="a1-cover-meta">
      <div v-if="subtitle" class="a1-cover-event">{{ subtitle }}</div>
      <div v-if="$slidev.configs.eventDate" class="a1-cover-date">
        {{ $slidev.configs.eventDate }}
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.a1-cover {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--a1-cover-bg);
  color: var(--a1-cover-fg);
}

.slidev-layout.a1-cover::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1cqw;
  background: var(--a1-accent);
}

.slidev-layout.a1-cover h1 {
  margin: 0;
  color: var(--a1-cover-fg);
  font-size: var(--a1-cover-title-size);
  line-height: 1.25;
}

.a1-cover-speaker {
  margin-top: 4.5cqh;
  font-size: var(--a1-subtitle-size);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.a1-cover-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1cqh;
  text-align: right;
}

.a1-cover-event {
  opacity: 0.85;
  font-size: var(--a1-subtitle-size);
  letter-spacing: 0.04em;
}

.a1-cover-date {
  opacity: 0.6;
  font-size: var(--a1-caption-size);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
}
</style>
