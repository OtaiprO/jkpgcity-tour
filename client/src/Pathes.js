import React from "react";
import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";
import { MainPage } from "./components/MainPage/MainPage.jsx";
import { AboutUS } from "./components/AboutUsPage/AboutUS.jsx";
import { Stores } from "./components/Stores/StoresPage/Stores.jsx";
import { StoreDetails } from "./components/Stores/StoreDetailsPage/StoreDetails.jsx";
import { AddStore } from "./components/Stores/AddStorePage/AddStore.jsx";
import { UpdateStore } from "./components/Stores/UpdateStorePage/UpdateStore.jsx";
import { Login } from "./components/Login/LoginPage/Login.jsx";
import { CreateAccount } from "./components/Login/CreateAccountPage/CreateAccount.jsx";

const Pathes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />

    <Route path="/about-us" element={<AboutUS />} />

    <Route path="/stores" element={<Stores />} />
    <Route path="/stores/:storeId" element={<StoreDetails />} />
    <Route path="/stores/add" element={<AddStore />} />
    <Route path="/stores/update/:storeId" element={<UpdateStore />} />

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<CreateAccount />} />

    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default Pathes;
