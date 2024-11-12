import React, { useEffect, useState } from "react";

export default function useAPI(
  cb: () => Promise<any>,
  options: {
    doNotFetch?: boolean;
  } = {}
) {
  let [data, setData] = useState<any>(null);
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<any>(null);

  function fetchData() {
    setLoading(true);
    cb()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (options.doNotFetch) return;
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
