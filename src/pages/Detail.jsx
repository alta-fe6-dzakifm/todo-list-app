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
      <div className="mx-12 my-8 space-y-8">
        <div>{data.content}</div>
      </div>
    </Layout>
  );
};

export default Detail;
