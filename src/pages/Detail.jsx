import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const Detail = () => {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://api.todoist.com/rest/v1/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div>
        <div className="text-center font-bold text-3xl text-white mt-4">
          Detail
        </div>
        <div
          className="space-y-8 w-1/2 rounded-2xl m-auto my-11 items-center space-x-6 bg-gradient-to-r from-red-800 via-stone-600 to-orange-300 py-5 px-5 text-white text-center font-thin
"
        >
          <div>{data.content}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
