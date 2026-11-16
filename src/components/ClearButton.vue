<script setup lang="ts">
defineProps<{ count: number }>();

const emit = defineEmits<{ clearAll: [] }>();
</script>

<template>
  <button
    class="bg-red-400 text-white p-2 border-2 rounded-md shrink-0 cursor-pointer"
    @click="emit('clearAll')"
    v-if="count > 0"
  >
    刪除全部 {{ count }} 筆
  </button>
</template>
