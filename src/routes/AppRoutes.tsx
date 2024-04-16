// AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MapView from "../pages/MapView";

import About from "../About";
import Welcome from "../mobile/Welcome";
import ChatRoom from "../mobile/ChatRoom";
import SampleList from "../mobile/SampleList";
import UploadCSV from "../UploadCSV";
import TalkPost from "../component/TalkPost";
import HomePage from "../component/HomePage";
import OTPAuthRegister from "../component/OTPAuthRegister";
import OTPAuthLogin from "../component/OTPAuthLogin";
import OTPAuthConfirm from "../component/OTPAuthConfirm";
import CognitoAuth from "../component/CognitoAuth";
import CognitoOtp from "../component/CognitoOtp";
import Interval from "../Interval";
import ColorPicker from "../component/ColorPicker";
import Language from "../component/Language";
import BackdropComponent from "../component/BackdropComponent";
import SortComponent from "../component/SortComponent";
import FilterComponent from "../component/FilterComponent";
import LambdaCheck from "../component/LambdaCheck";
import { MapViewerComponent } from "../component/MapViewerComponent";
import { Marker } from "../component/MapViewerComponent/Marker";
import AWSAuthenticate from "../auth/AWSAuthenticate";
import SupabaseTest from "../component/supabaseTest";

// 他の必要なコンポーネントのimportもここに追加します

const getRoutes = (
  loggedIn: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = import.meta.env.VITE_APP_API_URL
    ? import.meta.env.VITE_APP_API_URL
    : "#";
  return (
    <Routes>
      <Route
        path='/auth'
        element={<AWSAuthenticate setLoggedIn={setLoggedIn} />}
      />
      {loggedIn ? (
        <>
          <Route path='/home' element={<HomePage />} />
          <Route path='/Interval' element={<Interval />} />
          <Route path='/TalkPost' element={<TalkPost />} />
          <Route path='/UploadCSV' element={<UploadCSV />} />
          <Route path='/CognitoOtp' element={<CognitoOtp />} />
          <Route path='/CognitoAuth' element={<CognitoAuth />} />
          <Route path='/OTPAuthRegister' element={<OTPAuthRegister />} />
          <Route path='/OTPAuthLogin' element={<OTPAuthLogin />} />
          <Route path='/OTPAuthConfirm' element={<OTPAuthConfirm />} />
          <Route path='/SortComponent' element={<SortComponent />} />
          <Route path='/FilterComponent' element={<FilterComponent />} />
          <Route path='/ColorPicker' element={<ColorPicker />} />
          <Route path='/BackdropComponent' element={<BackdropComponent />} />
          <Route path='/Language' element={<Language />} />
          <Route path='/about' element={<About url={url} />} />
          <Route path='/mobile/Welcome' element={<Welcome />} />
          <Route path='/mobile/List' element={<SampleList />} />
          <Route path='/mobile/Chatroom' element={<ChatRoom />} />
          <Route path='/LambdaCheck' element={<LambdaCheck />} />
          <Route path='/MapView' element={<MapView />} />
          <Route path='/SupabaseTest' element={<SupabaseTest />} />
        </>
      ) : (
        <Route path='*' element={<Navigate to='/auth' />} />
      )}
    </Routes>
  );
};

export default getRoutes;
