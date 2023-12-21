<template>
  <div class="p-5">
    <h1 class="mt-3 mb-4 text-center text-sky-400 text-3xl font-semibold">Image search</h1>
    <form class="flex mx-auto max-w-md" @submit.prevent="fetchData(1)">
      <input class="flex-1 bg-gray-400 placeholder:text-slate-100 text-white rounded-l-md border-0 outline-0 px-4 py-2.5 md:px-6" v-model="input" placeholder="Search in here" type="text" />
      <button class="block px-3 py-1.5 rounded-r-md text-white bg-sky-400 md:px-6" type="submit">Search</button>
    </form>
    <div class="flex flex-col items-center h-full w-full">
      <ul class="columns-xs mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <img :src="`${data?.src?.large2x}`" alt="result image search" />
        </li>
      </ul>
      <div v-if="pending">loading...</div>
      <div v-if="error & input.length > 0">error</div>
    </div>
    <div v-if="isOpen">
      <button @click="loadMore" class="block mx-auto px-4 py-2 rounded-md bg-sky-400 text-white max-w-md" type="button">Load more?</button>
    </div>
  </div>
</template>

<style scoped>
  body{
    background-color: #f0f0f0;
  }
</style>

<script setup>
import { mergeProps } from "vue";

  const id = useRuntimeConfig().public.apiKey;
  let page = ref(1);
  const isOpen = ref(false);
  const input = ref('');
  const datas = ref([]);

  // buat inisialisasi asynchronous menggunakan asyncdata
  const { pending, data, error, execute } = useLazyAsyncData('fetchData', () =>
    $fetch(`https://api.pexels.com/v1/search?query=${input.value}&page=${page.value}`, {
      headers: {
        Authorization: id,
      },
    }),
  );

  // tambahkan watch untuk melihat perubahan
  watch(data, (newValue) => {
    if (page.value == 1) {
      // jika halaman masih 1
      datas.value = newValue?.photos;
    } else {
      // jika halaman lebih dari 1
      // tambahkan array sebelumnya dengan array baru menggunakan mergemodels dari Nuxt
      datas.value = mergeModels(datas.value, newValue?.photos);
    }
  });

  // tambahkan fungsi jika halaman masih 1
  function fetchData() {
    if (input.value) {
      datas.value = null;
      page.value = 1;
      data.value = null;
      error.value = null;
      pending.value = true;
      execute();
      // tambahkan isopen untuk merubah value
      isOpen.value = true;
    }
    console.log(data);
    console.log(datas);
  }
  
  // tambahkan fungsi jika halaman lebih 1
  function loadMore() {
    if (input.value) {
      // tambahkan halaman sebelum fetch data
      page.value++;
      error.value = null;
      pending.value = true;
      execute();
    }
    // tambahkan isopen untuk merubah value
    isOpen.value = true;
    console.log(data);
    console.log(datas);
  }
</script>
