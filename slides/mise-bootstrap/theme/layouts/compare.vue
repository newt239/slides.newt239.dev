<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'

defineProps<{ before?: string, after?: string, code?: string, wrap?: boolean }>()
</script>

<template>
  <div class="slidev-layout mb-default mb-compare">
    <slot />
    <div class="mb-compare-grid" :class="[code && `code-${code}`, wrap && 'code-wrap']">
      <section class="mb-compare-col mb-compare-before">
        <div class="mb-compare-label">
          <span class="mb-compare-tag">Before</span>
          <span class="mb-compare-file">{{ before }}</span>
        </div>
        <slot name="left" />
      </section>
      <section class="mb-compare-col mb-compare-after">
        <div class="mb-compare-label">
          <span class="mb-compare-tag">After</span>
          <span class="mb-compare-file">{{ after }}</span>
        </div>
        <slot name="right" />
      </section>
    </div>
    <SlideFooter />
  </div>
</template>

<style>
.mb-compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4cqw;
  align-items: start;
}

.mb-compare-col {
  display: flex;
  flex-direction: column;
  gap: 1.4cqh;
  min-width: 0;
}

.mb-compare-label {
  display: flex;
  align-items: center;
  gap: 1cqw;
  font-size: var(--mb-small-size);
}

.mb-compare-tag {
  padding: 0.15em 0.7em;
  border-radius: 999px;
  color: #fff;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.mb-compare-before .mb-compare-tag {
  background: var(--mb-before);
}

.mb-compare-after .mb-compare-tag {
  background: var(--mb-accent);
}

.mb-compare-file {
  color: var(--mb-muted);
  font-size: 0.85em;
}

.mb-compare-before pre.shiki {
  opacity: 0.85;
}

.mb-compare-col > p {
  margin-top: 1.4cqh;
  color: var(--mb-muted);
  font-size: var(--mb-small-size);
}
</style>
