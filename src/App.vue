<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { Meal, FoodItem } from "./types";
import FoodRow from "./components/FoodRow.vue";

const food = ref<string>("");
const meal = ref<Meal>("早餐");
const saved = localStorage.getItem("foods");
const foods = ref<FoodItem[]>(
  saved
    ? JSON.parse(saved).map((item: FoodItem) => ({
        ...item,
        date: formatDate(item.id),
      }))
    : [],
);
const count = computed(() => foods.value.length);

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}
function addFood() {
  if (food.value.trim() === "") {
    return;
  }
  foods.value.push({
    id: Date.now(),
    date: formatDate(Date.now()),
    name: food.value.trim(),
    meal: meal.value,
  });
  food.value = "";
}

function removeFood(index: number) {
  foods.value.splice(index, 1);
}
watch(
  foods,
  () => {
    localStorage.setItem("foods", JSON.stringify(foods.value));
  },
  { deep: true },
);
</script>

<template>
  <div class="max-w-sm mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">今日飲食</h1>
    <form class="flex gap-2 mb-4" @submit.prevent="addFood">
      <select class="border p-2" v-model="meal">
        <option>早餐</option>
        <option>午餐</option>
        <option>點心</option>
        <option>晚餐</option>
        <option>宵夜</option>
      </select>
      <input class="border p-2 flex-1 min-w-0" v-model="food" />
      <button class="bg-gray-700 text-white p-2 border-2 rounded-md shrink-0">
        新增
      </button>
    </form>
    <p>總共 {{ count }} 筆</p>
    <ul>
      <FoodRow
        v-for="(item, i) in foods"
        :key="item.id"
        :item="item"
        @remove="removeFood(i)"
      />
    </ul>
  </div>
</template>
