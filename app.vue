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
      <div v-if="isOpen" class="fixed mx-auto w-fit px-2 inset-0 z-50 flex flex-col justify-center items-center bg-white/90">
        <h3 class="text-center text-black tracking-wider font-semibold">{{ selectedImage.alt }}</h3>
        <span class="flex items-center justify-center">
          <img class="mr-1 w-5 h-5" src="./public/svg/camera.svg" alt="" />
          <p class="text-black tracking-wider">{{ selectedImage.photographer }}</p>
        </span>
        <div class="flex justify-center">
          <div class="backdrop-blur-sm bg-white p-1 rounded-md rounded-lb-md cursor-pointer absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
            <img @click="isOpen = !isOpen" class="h-8 w-8 md:h-10 md:w-10" src="./public/svg/cross.svg" alt="cross" />
            <img @click="downloadImage" class="h-8 w-8 md:h-10 md:w-10" src="./public/svg/download.svg" alt="download" />
          </div>
          <div class="w-5/6 md:w-9-12">
            <NuxtImg class="inline rounded-md" :src="`${selectedImage.src?.large2x}`" :alt="`${selectedImage.alt}`" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="pending">
      <loading />
    </div>
    <div v-if="error & input.length > 0">Fails load image</div>
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
