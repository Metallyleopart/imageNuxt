<template>
  <div class="mx-5">
    <form class="flex mx-auto max-w-md" @submit.prevent="tes">
      <input class="flex-1 bg-gray-400 placeholder:text-slate-100 text-white rounded-l-xl border-0 outline-0 px-4 py-2.5 md:px-6" v-model="input" placeholder="Search by city name" type="text" />
      <button class="block px-3 py-1.5 rounded-r-xl text-white bg-sky-400 md:px-6" type="submit">Search</button>
    </form>
    <div class="flex flex-col items-center">
      <ul class="columns-xs mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <img :src="`${data?.src?.large2x}`" alt="result image search" />
        </li>
      </ul>
    </div>
    <!-- <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error }}</div> -->
  </div>
</template>
<script setup>
  const id = useRuntimeConfig().public.apiKey;
  const input = ref('');
  const datas = ref();

  const { pending, error, data, execute } = await useLazyAsyncData('fetchData', () => $fetch(`https://api.pexels.com/v1/search?query=${input.value}`), {
    headers: {
      Authorization: id,
    },
  });

  watch(data, (newData) => {
    datas.value = newData?.photos;
    console.log(data);
    console.log(datas);
  });

  function tes() {
    execute();
  }
</script>
