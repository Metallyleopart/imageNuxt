<template>
  <div class="p-5 font-poppins text-blue-dark">
    <h1 class="my-4 text-2xl font-bold text-center md:text-3xl">Image Search Engine</h1>
    <form class="flex max-w-md mx-auto" @submit.prevent="fetchData(input)">
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
    <div v-if="datas" class="w-full h-full">
      <ul class="w-full gap-4 mt-10 columns-xs">
        <li v-for="data in datas" :key="data" class="relative flex mb-4 overflow-hidden rounded-md cursor-pointer tes-2">
          <!-- placeholder berfungsi sebelum gambar di render
            maka kita dapat menambahkan css atau gambar default
          -->
          <NuxtImg @click="selectImage(data)" :src="`${data?.src?.original}`" :alt="`${data?.alt}`" placeholder placeholder-class="blur" loading="lazy" />
        </li>
      </ul>
      <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto transition-opacity bg-gray-500 bg-opacity-75">
        <div class="flex items-center justify-center min-h-screen px-4 my-4 md:p-0">
          <div class="w-full max-w-lg overflow-hidden text-left bg-white rounded-lg md:h-fit md:inline-block">
            <div class="p-6 py-5 md:px-4">
              <h3 class="text-lg font-medium text-gray-900">{{ selectedImage.alt }}</h3>
              <h4 class="flex items-center">
                <Icon class="w-4 h-4 mr-1" name="ph:camera-light" />
                {{ selectedImage.photographer }}
              </h4>
              <div class="mt-1">
                <p class="text-sm text-gray-500">Click the button below to download the image.</p>
                <NuxtImg class="mx-auto mt-4" :src="selectedImage.src.large2x" :alt="selectedImage.alt" />
              </div>
            </div>
            <div class="flex flex-col px-6 py-3 bg-gray-50 gap-y-2 md:px-4 md:flex-row-reverse md:gap-x-2">
              <div class="block w-full px-4 py-2 text-base text-center text-white rounded-md outline-none bg-blue-dark md:inline-flex md:justify-center md:font-medium" v-if="isLoading == true">
                <loading />
              </div>
              <div class="block w-full px-4 py-2 text-base text-center text-white rounded-md outline-none bg-blue-dark md:inline-flex md:justify-center md:font-medium" v-else>
                <button type="button" @click="downloadImage() & (isLoading == true)">Download</button>
              </div>
              <button type="button" class="block w-full px-4 py-2 text-base bg-white border-2 rounded-md md:inline-flex md:justify-center md:font-medium" @click="isOpen = false">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- pengecualian ketika ada data -->
    <div v-if="isMore == !datas">
      <div v-if="pending">
        <loading />
      </div>
      <div v-else>
        <button @click="loadMore" class="block max-w-md px-4 py-2 mx-auto mt-2 text-white rounded-md bg-blue-dark" type="button">Load more?</button>
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
  const isLoading = ref(false);

  // import dengan menggunakan object dan nama file
  const { input, datas, pending, error, fetchData, loadMore } = useFetchData();

  function selectImage(data) {
    selectedImage.value = data;
    isOpen.value = true;
    console.log(selectedImage);
  }

  async function downloadImage() {
    isLoading.value = true;
    try {
      const res = await fetch(selectedImage.value.src.original);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = selectedImage.value.alt + ' ' + selectedImage.value.photographer + ' ' + 'Unsplash';
      a.click();
    } catch (err) {
      alert('Failed download image');
    } finally {
      isLoading.value = false;
    }
  }
</script>
