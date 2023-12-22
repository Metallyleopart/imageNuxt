export default function useFetchData() {
  const id = useRuntimeConfig().public.apiKey;
  let page = ref(1);
  const input = ref('');
  const datas = ref();

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
    }
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
  }

  // kembalikan apa yang akan di fetch
  return { input, datas, pending, error, fetchData, loadMore }
}

// const id = useRuntimeConfig().public.apiKey;
  // let page = ref(1);
  // const isOpen = ref(false);
  // const input = ref('');
  // const datas = ref([]);

  // // buat inisialisasi asynchronous menggunakan asyncdata
  // const { pending, data, error, execute } = useLazyAsyncData('fetchData', () =>
  //   $fetch(`https://api.pexels.com/v1/search?query=${input.value}&page=${page.value}`, {
  //     headers: {
  //       Authorization: id,
  //     },
  //   }),
  // );

  // // tambahkan watch untuk melihat perubahan
  // watch(data, (newValue) => {
  //   if (page.value == 1) {
  //     // jika halaman masih 1
  //     datas.value = newValue?.photos;
  //   } else {
  //     // jika halaman lebih dari 1
  //     // tambahkan array sebelumnya dengan array baru menggunakan mergemodels dari Nuxt
  //     datas.value = mergeModels(datas.value, newValue?.photos);
  //   }
  // });

  // // tambahkan fungsi jika halaman masih 1
  // function fetchData() {
  //   if (input.value) {
  //     datas.value = null;
  //     page.value = 1;
  //     data.value = null;
  //     error.value = null;
  //     pending.value = true;
  //     execute();
  //     // tambahkan isopen untuk merubah value
  //     isOpen.value = true;
  //   }
  //   console.log(data);
  //   console.log(datas);
  // }

  // // tambahkan fungsi jika halaman lebih 1
  // function loadMore() {
  //   if (input.value) {
  //     // tambahkan halaman sebelum fetch data
  //     page.value++;
  //     error.value = null;
  //     pending.value = true;
  //     execute();
  //   }
  //   // tambahkan isopen untuk merubah value
  //   isOpen.value = true;
  //   console.log(data);
  //   console.log(datas);
  // }