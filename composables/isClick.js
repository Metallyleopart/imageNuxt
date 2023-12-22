export default function isClick() {
  const { data:clickImage, pending, error, execute } = useFetch(``);

  function isClick(params) {
    execute()
  }

  return {clickImage, isClick}
}