<template>
  <Head>
    <Html lang="en" />
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <div class="p-5">
    <h1 class="mt-3 mb-4 text-center text-sky-400 text-3xl font-semibold">Image search</h1>
    <form class="flex mx-auto max-w-md" @submit.prevent="fetchData(input)">
      <input class="flex-1 bg-gray-400 placeholder:text-slate-100 text-white rounded-l-md border-0 outline-0 px-4 py-2.5 md:px-6" v-model="input" placeholder="Search in here" type="text" />
      <button class="block px-3 py-1.5 rounded-r-md text-white bg-sky-400 md:px-6" type="submit">Search</button>
    </form>
    <div class="flex flex-col items-center h-full w-full">
      <ul class="columns-2xs w-full mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <NuxtImg @click="selectImage" :src="`${data?.src?.large2x}`" :alt="`${data?.alt}`" />
        </li>
      </ul>
      <div v-if="isOpen" class="absolute translate-1/2 grid place-items-center w-8/12 flex-col p-6 w-10/12 z-10 rounded-md text-white bg-white">
        <div class="flex justify-end">
          <div class="backdrop-blur-sm bg-white pl-2 pb-2 rounded-md rounded-lb-md cursor-pointer absolute right-4 top-4">
            <NuxtImg @click="isOpen = !isOpen" class="h-10 w-10 fill-white" src="/svg/cross.svg" alt="cross" />
            <NuxtImg @click="downloadImage" class="h-10 w-10 fill-white" src="/svg/download.svg" alt="download" />
          </div>
        </div>
        <NuxtImg class="inline" :src="selectedImage" alt="Selected image" />
      </div>
      <div v-if="pending">
        <loading />
      </div>
      <div v-if="error & input.length > 0">error</div>
    </div>
    <!-- berukan pengecualian ketika ada data -->
    <div v-if="isMore == !datas">
      <button @click="loadMore" class="block mx-auto px-4 py-2 rounded-md bg-sky-400 text-white max-w-md" type="button">Load more?</button>
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

  const selectImage = (event) => {
    const imageUrl = event.target.src;
    selectedImage.value = imageUrl;
    isOpen.value = true;
    console.log('one', event.target.src);
  };

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
