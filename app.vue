<template>
  <Head>
    <Html lang="en" />
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
  </Head>
  <div class="p-5 font-poppins">
    <h1 class="my-4 text-center text-sky-400 text-2xl md:text-3xl font-bold">Image Search Engine</h1>
    <form class="flex mx-auto max-w-md" @submit.prevent="fetchData(input)">
      <input type="search" class="block p-2.5 ps-4 w-full z-20 text-sm text-gray-900 bg-gray-200 rounded-s-md outline-none border-0" placeholder="Search" required autocomplete="off" v-model="input" />
      <button type="submit" class="flex items-center p-2.5 h-full text-sm font-medium text-white bg-sky-400 rounded-e-md hover:bg-sky-500 outline-none">
        <svg class="mr-2 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        search
      </button>
    </form>
    <div v-if="datas" class="h-full w-full">
      <ul class="columns-xs w-full mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <NuxtImg @click="selectImage(data)" :src="`${data?.src?.large2x}`" :alt="`${data?.alt}`" />
        </li>
      </ul>
      <div v-if="isOpen" class="fixed py-3 px-5 overflow-y-scroll mx-auto w-full inset-0 z-50 items-center bg-[#f0f0f0]">
        <!-- close btn -->
        <div class="flex justify-end">
          <img @click="isOpen = !isOpen" class="h-10 w-10" src="./public/svg/cross.svg" alt="cross" />
        </div>
        <h3 class="text-black tracking-wider font-semibold">{{ selectedImage.alt }}</h3>
        <span class="my-2 flex items-center justify-start">
          <img class="mr-1 w-5 h-5" src="./public/svg/camera.svg" alt="photograper name" />
          <p class="text-black tracking-wider">{{ selectedImage.photographer }}</p>
        </span>
        <div class="flex justify-end fill-white text-white">
          <span class="flex p-2.5 rounded-md bg-sky-400 hover:bg-sky-500 w-fit">
            <img @click="downloadImage" class="mr-2 h-5 w-5" src="./public/svg/download.svg" alt="download" />
            <p>Download</p>
          </span>
        </div>
        <div class="mx-auto w-fit flex justify-center">
          <NuxtImg class="inline mt-4 h-full w-full rounded-md" :src="`${selectedImage.src?.large2x}`" :alt="`${selectedImage.alt}`" />
        </div>
      </div>
    </div>
    <div v-if="pending">
      <loading />
    </div>
    <div v-if="error & (input.length > 0)">Fails load image</div>
    <!-- berukan pengecualian ketika ada data -->
    <div v-if="isMore == !datas">
      <button @click="loadMore" class="block mt-2 mx-auto px-4 py-2 rounded-md bg-sky-400 text-white max-w-md" type="button">Load more?</button>
    </div>
  </div>
</template>

<style scoped>
  body {
    background: #eeeeee;
  }
</style>

<script setup>
  const title = 'Image search with Pexel API';
  const isOpen = ref(false);
  const isMore = ref(false);
  const selectedImage = ref(null);

  // import dengan menggunakan object dan nama file
  const { input, datas, pending, error, fetchData, loadMore } = useFetchData();

  function selectImage(data) {
    selectedImage.value = data;
    isOpen.value = true;
    console.log(selectedImage);
  }

  function downloadImage() {
    fetch(selectedImage.value)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
      })
      .catch(() => alert('Failed download image'));
  }
</script>
