// AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MapView from "../pages/MapView";
// 他の必要なコンポーネントのimportもここに追加します

const getRoutes = () => {
  return <Route path='/MapView' element={<MapView />} />;
};

export default getRoutes;
