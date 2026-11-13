<script setup lang="ts">
import type { FoodItem } from "../types";

defineProps<{ item: FoodItem }>();

const emit = defineEmits<{ remove: [] }>();
</script>

<template>
  <li class="flex justify-between items-center border-b py-[2px] gap-4">
    <span class="break-all"> {{ item.meal }}：{{ item.name }}</span>
    <button
      class="bg-red-400 text-white p-2 border-2 rounded-md shrink-0"
      @click="emit('remove')"
    >
      刪除
    </button>
  </li>
</template>
