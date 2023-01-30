import React from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  const [params, setParams] = React.useState(options);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(url, params);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
      setError("Failed to fetch data!");
    }
  };

  React.useEffect(() => {
    setLoading(false);
    setError("");
    setData(null);
    fetchData();
  }, [url, params]);

  return [data, loading, error, setParams];
};

export default useFetch;
