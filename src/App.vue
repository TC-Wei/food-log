<script setup lang="ts">
import { ref } from "vue"

const food = ref<string>("")
const foods = ref<string[]>([])

function addFood() {
  if (food.value.trim() === '') {
    return
  }
  foods.value.push(food.value)
  food.value = ''
}
</script>

<template>
  <h1 class="text-3xl font-bold">今日飲食</h1>
  <input class="border p-2" v-model="food">
  <button class="bg-red-500 text-white p-2 border-2 rounded-md" @click="addFood">新增</button>
  <ul>
    <li v-for="(item, i) in foods" :key="i">{{ item }}</li>
  </ul>
</template>
