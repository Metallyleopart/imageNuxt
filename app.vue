<template>
  <div class="p-5 font-poppins text-blue-dark">
    <h1 class="my-4 text-center text-2xl md:text-3xl font-bold">Image Search Engine</h1>
    <form class="flex mx-auto max-w-md" @submit.prevent="fetchData(input)">
      <input type="search" class="block p-2.5 ps-4 w-full text-sm text-gray-800 bg-gray-200 rounded-s-md outline-none border-0" placeholder="Search here" required autocomplete="off" v-model="input" />
      <button type="submit" class="flex items-center p-2.5 h-full text-sm font-medium text-white bg-blue-dark rounded-e-md outline-none">
        <Icon class="mr-1" name="ic:round-search" size="1.25rem" />
        search
      </button>
    </form>
    <div v-if="pending">
      <loading />
    </div>
    <div v-if="error & (input.length > 0)">Fails load image</div>
    <div v-if="datas" class="h-full w-full">
      <ul class="columns-xs w-full mt-10 gap-4">
        <li v-for="data in datas" :key="data" class="tes-2 flex relative mb-4 rounded-md overflow-hidden cursor-pointer">
          <nuxt-img @click="selectImage(data)" :src="`${data?.src?.large2x}`" :alt="`${data?.alt}`" placeholder placeholder-class="blur" loading="lazy"/>
        </li>
      </ul>
      <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
        <div class="my-4 px-4 flex justify-center items-center min-h-screen md:p-0">
          <div class="max-w-lg w-full md:h-fit md:inline-block bg-white rounded-lg text-left overflow-hidden">
            <div class="p-6 py-5 md:px-4">
              <h3 class="text-lg font-medium text-gray-900">{{ selectedImage.alt }}</h3>
              <h4 class="flex items-center">
                <Icon class="mr-1 h-4 w-4" name="ph:camera-light" />
                {{ selectedImage.photographer }}
              </h4>
              <div class="mt-1">
                <p class="text-sm text-gray-500">Click the button below to download the image.</p>
                <NuxtImg :src="selectedImage.src.large2x" :alt="selectedImage.alt" class="mt-4" />
              </div>
            </div>
            <div class="bg-gray-50 py-3 px-6 flex flex-col gap-y-2 md:px-4 md:flex-row-reverse md:gap-x-2">
              <button type="button" class="block px-4 py-2 text-white text-base bg-blue-dark w-full outline-none rounded-md md:inline-flex md:justify-center md:font-medium" @click="downloadImage()">Download</button>
              <button type="button" class="block px-4 py-2 text-base bg-white w-full border-2 rounded-md md:inline-flex md:justify-center md:font-medium" @click="isOpen = false">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- berukan pengecualian ketika ada data -->
    <div v-if="isMore == !datas">
      <div v-if="pending">
        <loading />
      </div>
      <div v-else>
        <button @click="loadMore" class="block mt-2 mx-auto px-4 py-2 rounded-md bg-blue-dark text-white max-w-md" type="button">Load more?</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .blur {
    filter: blur(10px);
  }

  img:not(.blur) {
    filter: none;
    transition: filter 300ms ease-in-out;
  }
</style>

<script setup>
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
    fetch(selectedImage.value.src.original)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = selectedImage.value.alt;
        a.click();
      })
      .catch(() => alert('Failed download image'));
  }
</script>
