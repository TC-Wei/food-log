<script setup lang="ts">
import { ref, watch } from "vue";
type Meal = "早餐" | "午餐" | "點心" | "晚餐" | "宵夜";
interface FoodItem {
  name: string;
  meal: Meal;
}

const food = ref<string>("");
const meal = ref<Meal>("早餐");
const saved = localStorage.getItem("foods");
const foods = ref<FoodItem[]>(saved ? JSON.parse(saved) : []);

function addFood() {
  if (food.value.trim() === "") {
    return;
  }
  foods.value.push({ name: food.value, meal: meal.value });
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
  <div class="max-w-lg mx-auto p-4">
    <h1 class="text-3xl font-bold">今日飲食</h1>
    <form @submit.prevent="addFood">
      <select class="border p-2" v-model="meal">
        <option>早餐</option>
        <option>午餐</option>
        <option>點心</option>
        <option>晚餐</option>
        <option>宵夜</option>
      </select>
      <input class="border p-2" v-model="food" />
      <button class="bg-gray-700 text-white p-2 border-2 rounded-md">
        新增
      </button>
    </form>
    <ul>
      <li v-for="(item, i) in foods" :key="i">
        {{ item.meal }}：{{ item.name }}
        <button
          class="bg-red-400 text-white p-2 border-2 rounded-md"
          @click="removeFood(i)"
        >
          刪除
        </button>
      </li>
    </ul>
  </div>
</template>
