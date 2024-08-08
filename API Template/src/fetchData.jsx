function getSuspender(promise) {
  let status = "pending";
  let response;

  // execute sync.
  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

// similar process but not using useEffect and sync.
export function fetchData(url) {
  //save into promise object the answer from the url
  const promise = fetch(url)
    .then((response) => response.json())
    .then((json) => json);

  return getSuspender(promise);
}

export default fetchData;
