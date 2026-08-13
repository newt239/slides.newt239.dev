<script setup lang="ts">
withDefaults(defineProps<{ size?: string }>(), { size: '10cqw' })

const cells = ['gold', 'gold', 'gold', 'none', 'dim', 'gold', 'dim', 'dim', 'dim'] as const
</script>

<template>
  <div class="pn-mark" :style="{ '--mark-size': size }">
    <span v-for="(cell, i) in cells" :key="i" :class="`pn-mark-cell is-${cell}`" />
  </div>
</template>

<style>
.pn-mark {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(var(--mark-size) / 20);
  width: var(--mark-size);
  height: var(--mark-size);
}

.pn-mark-cell {
  display: block;
}

.pn-mark-cell.is-gold {
  background: var(--mark-gold, var(--pn-gold));
}

.pn-mark-cell.is-dim {
  background: var(--mark-dim, var(--pn-gray));
}
</style>
