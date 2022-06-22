import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";

const Homepages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [todoIdUpdate, setTodoIdUpdate] = React.useState("false");
  const [content, setContent] = React.useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://api.todoist.com/rest/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = { content: content };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
    };
    axios
      .post(`https://api.todoist.com/rest/v1/tasks`, data, { headers })
      .then((res) => {
        setShowAddModal(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRemove(id) {
    axios
      .delete(`https://api.todoist.com/rest/v1/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
      .then((response) => {
        setData((previousData) =>
          previousData.filter((item) => item.id !== id)
        );
        alert(`berhasil dihapus ${id}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleEdit(id) {
    axios
      .get(`https://api.todoist.com/rest/v1/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
      .then((res) => {
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    setTodoIdUpdate(id);
    setShowUpdateModal(true);
  }

  function handleSubmitUpdate(e) {
    e.preventDefault();

    const data = { content: content };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
    };

    axios
      .post(`https://api.todoist.com/rest/v1/tasks/${todoIdUpdate}`, data, {
        headers,
      })
      .then((res) => {
        // bismillahi tawakkaltu 'alallahi laa hawla wa laa quwaata
        setTodoIdUpdate("");
        setContent("");
        setShowUpdateModal(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <Layout>
        <div className="mx-12 my-8 space-y-8">
          <button
            className="bg-green-600 text-white  active:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowAddModal(true)}
          >
            Add To Do
          </button>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-sm items-center space-x-6 bg-stone-600 py-5 px-5"
              >
                <div>{item.content}</div>
                <div>{item.due && <p>{item.due.date}</p>}</div>
                <div className="space-x-4">
                  <button className="bg-green-400 px-4 py-1 rounded-sm text-white mt-3">
                    <Link to={`/detail/${item.id}`}>Go to detail</Link>
                  </button>
                  <button
                    className="bg-red-600 px-4 py-1 rounded-sm text-white mt-3"
                    onClick={() => handleRemove(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-400 px-4 py-1 rounded-sm text-white mt-3"
                    onClick={() => handleEdit(item.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {showAddModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Todo</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowAddModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="relative p-6 flex-auto">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Content
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Please input Content"
                          name="content"
                          onChange={handleContentChange}
                        />
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowAddModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {showUpdateModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Todo</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <form
                    className="w-full max-w-lg"
                    onSubmit={handleSubmitUpdate}
                  >
                    <div className="relative p-6 flex-auto">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-first-name"
                        >
                          Content
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Please input Content"
                          name="content"
                          value={content}
                          onChange={handleContentChange}
                        />
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowUpdateModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </Layout>
    );
  }
};

export default Homepages;
