// custom hook

import React, { useState, useEffect } from "react";

export function useFetch(url) {
  //state to handle data
  const [data, setData] = useState(null);
  // handle requests load state
  const [loading, setLoading] = useState(true);
  //state to handle errors
  const [error, setError] = useState(null);
  const [controller,setController]=useState(null);

  useEffect(() => {
    // funcion evitar consumo de recursos, nos permite mandar
    // una señal para evitar que se realice la petición
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") {
            console.log("Request Cancelled");
        }
        else{
            setError(error);
        }
      })
      .finally(() => setLoading(false)); // after all promises end we set it

    // execute after the component has been disassembled, after close windows change pages etc
    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () =>{
    if (controller) {
        controller.abort();
        setError("Request Cancelled");
    }
  }

  // Para desestructurar la informacion de manera más sencilla devolvemos un objeto
   return { data, loading,error, handleCancelRequest};
}

export default useFetch;
