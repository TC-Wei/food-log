<script setup lang="ts">
import { ref, watch, computed } from "vue";
type Meal = "早餐" | "午餐" | "點心" | "晚餐" | "宵夜";
interface FoodItem {
  id: number;
  name: string;
  meal: Meal;
}

const food = ref<string>("");
const meal = ref<Meal>("早餐");
const saved = localStorage.getItem("foods");
const foods = ref<FoodItem[]>(saved ? JSON.parse(saved) : []);
const count = computed(() => foods.value.length);

function addFood() {
  if (food.value.trim() === "") {
    return;
  }
  foods.value.push({
    id: Date.now(),
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
      <li
        class="flex justify-between items-center border-b py-[2px] gap-4"
        v-for="(item, i) in foods"
        :key="item.id"
      >
        <span class="break-all"> {{ item.meal }}：{{ item.name }}</span>
        <button
          class="bg-red-400 text-white p-2 border-2 rounded-md shrink-0"
          @click="removeFood(i)"
        >
          刪除
        </button>
      </li>
    </ul>
  </div>
</template>
