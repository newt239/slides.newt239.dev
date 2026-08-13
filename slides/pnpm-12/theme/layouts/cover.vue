<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import PnpmMark from '../components/PnpmMark.vue'

defineProps<{ subtitle?: string, speaker?: string }>()

const { $slidev } = useSlideContext()
</script>

<template>
  <div class="slidev-layout pn-cover">
    <PnpmMark size="34cqw" class="pn-cover-watermark" />
    <div class="pn-cover-head">
      <slot />
      <div v-if="speaker" class="pn-cover-speaker">{{ speaker }}</div>
    </div>
    <div class="pn-cover-meta">
      <div v-if="subtitle" class="pn-cover-event">{{ subtitle }}</div>
      <div v-if="$slidev.configs.eventDate" class="pn-cover-date">
        {{ $slidev.configs.eventDate }}
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.pn-cover {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--pn-cover-bg);
  color: var(--pn-cover-fg);
  font-family: var(--pn-heading-font);
}

.slidev-layout.pn-cover::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--pn-title-size);
  background: repeating-linear-gradient(
    to bottom,
    var(--pn-gold) 0 var(--pn-title-size),
    transparent var(--pn-title-size) calc(var(--pn-title-size) * 1.24)
  );
}

.pn-cover-watermark {
  position: absolute;
  right: var(--pn-margin-x);
  bottom: 9cqh;
  --mark-gold: rgb(250 247 242 / 9%);
  --mark-dim: rgb(250 247 242 / 9%);
}

.slidev-layout.pn-cover h1 {
  margin: 0;
  color: var(--pn-cover-fg);
  font-size: var(--pn-cover-title-size);
  line-height: 1.25;
}

.pn-cover-speaker {
  margin-top: 4.5cqh;
  font-size: var(--pn-subtitle-size);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.pn-cover-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1cqh;
  text-align: right;
}

.pn-cover-event {
  opacity: 0.85;
  font-size: var(--pn-subtitle-size);
  letter-spacing: 0.04em;
}

.pn-cover-date {
  padding-right: 0.4cqw;
  opacity: 0.6;
  font-size: var(--pn-caption-size);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
}
</style>
