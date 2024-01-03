<template>
  <Head>
    <Html lang="en" />
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <div class="p-5 font-poppins text-blue-dark">
    <h1 class="my-4 text-center text-2xl md:text-3xl font-bold">Image Search Engine</h1>
    <form class="flex mx-auto max-w-md" @submit.prevent="fetchData(input)">
      <input type="search" class="block p-2.5 ps-4 w-full z-20 text-sm text-gray-800 bg-gray-200 rounded-s-md outline-none border-0" placeholder="Search here" required autocomplete="off" v-model="input" />
      <button type="submit" class="flex items-center p-2.5 h-full text-sm font-medium text-white bg-blue-dark rounded-e-md outline-none">
        <Icon class="mr-2" name="ic:round-search" size="1.25rem"/>
        search
      </button>
    </form>
    <div v-if="datas" class="h-full w-full">
      <ul class="columns-xs w-full mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <NuxtImg @click="selectImage(data)" :src="`${data?.src?.large2x}`" :alt="`${data?.alt}`" />
        </li>
      </ul>
      <div v-if="isOpen" class="fixed bg-white py-3 px-5 overflow-y-scroll mx-auto w-full inset-0 z-50 items-center">
        <!-- close btn -->
        <div class="flex justify-end">
          <Icon @click="isOpen = !isOpen" class="mb-2 cursor-pointer w-10 h-10" name="maki:cross" color="black" />
        </div>
        <h3 class="text-black tracking-wider font-semibold">{{ selectedImage.alt }}</h3>
        <span class="my-2 flex items-center justify-start">
          <Icon class="mr-1" name="uil:camera" size="1.35rem" color="black" />
          <p class="text-black tracking-wider">{{ selectedImage.photographer }}</p>
        </span>
        <div class="flex justify-end">
          <span class="flex cursor-pointer p-2.5 rounded-md bg-blue-dark w-fit">
            <Icon @click="downloadImage" class="mr-2 text-white fill-white" name="iconoir:download" size="1.5rem" color="white" />
            <p class="text-white">Download</p>
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
      <button @click="loadMore" class="block mt-2 mx-auto px-4 py-2 rounded-md bg-blue-dark text-white max-w-md" type="button">Load more?</button>
    </div>
  </div>
</template>

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
