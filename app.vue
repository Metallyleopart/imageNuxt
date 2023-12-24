<template>
  <Head>
    <Html lang="en" />
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
  </Head>
  <div class="p-5 font-poppins">
    <h1 class="mt-3 mb-4 text-center text-sky-400 text-3xl font-semibold">Image Search Engine</h1>
    <form class="flex mx-auto max-w-md" @submit.prevent="fetchData(input)">
      <input class="flex-1 bg-gray-400 placeholder:text-slate-100 text-white rounded-l-md border-0 outline-0 px-4 py-2.5 md:px-6" v-model="input" placeholder="Search in here" type="text" />
      <button class="block px-3 py-1.5 rounded-r-md text-white bg-sky-400 md:px-6" type="submit">Search</button>
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
          <span class="flex px-4 py-2 rounded-md bg-sky-400 hover:bg-sky-500 w-fit">
            <img @click="downloadImage" class="mr-2 h-5 w-5 md:h-8 md:w-8" src="./public/svg/download.svg" alt="download" />
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
    background: #f0f0f0;
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
