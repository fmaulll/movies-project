import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setLoading } from "../../features/movieSlice";
import { useAppDispatch } from "../../hooks";

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams()

  const getDetail = async () => {
    dispatch(setLoading(true));
    try {
      const results = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=1082ebc`
      );

      if (results.status === 200) {
      }
    } catch (error) {
      alert(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  return <div>Detail</div>;
};

export default Detail;
