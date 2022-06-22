import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepages from "../pages/Homepages";
import Detail from "../pages/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p> 404!There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
