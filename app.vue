<template>
  <div class="mx-5">
    <form class="flex mx-auto max-w-md">
      <input class="flex-1 bg-gray-400 placeholder:text-slate-100 text-white rounded-l-xl border-0 outline-0 px-4 py-2.5 md:px-6" v-model="input" placeholder="Search by city name" type="text" />
      <button @click="fetchData" class="block px-3 py-1.5 rounded-r-xl text-white bg-sky-400 md:px-6" type="button">Search</button>
    </form>
    <div class="flex flex-col items-center">
      <ul class="tes mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <img :src="`${data?.src?.large2x}`" alt="result image search" />
        </li>
      </ul>
    </div>
    <p>{{ datas }}</p>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<style scoped>
  .tes {
    columns: 5 340px;
  }
</style>

<script setup>
  const id = useRuntimeConfig().public.apiKey;
  const input = ref('');
  const datas = ref();
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchData() {
    isLoading.value = true;
    error.value = null;
    const response = await useLazyFetch(`https://api.pexels.com/v1/search?query=${input.value}`, {
      headers: {
        Authorization: id,
      },
    });
    datas.value = response.data.value?.photos;
    console.log(datas);
  }
</script>
