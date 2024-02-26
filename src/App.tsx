/**
 * File Description エントリーページ
 */

/**
 * Import
 */

import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import About from "./About";
import Welcome from "./mobile/Welcome";
import ChatRoom from "./mobile/ChatRoom";
import SampleList from "./mobile/SampleList";
import UploadCSV from "./UploadCSV";
import TalkPost from "./component/TalkPost";
import AWSAuthenticate from "./auth/AWSAuthenticate";
import HomePage from "./component/HomePage";
import OTPAuthRegister from "./component/OTPAuthRegister";
import OTPAuthLogin from "./component/OTPAuthLogin";
import OTPAuthConfirm from "./component/OTPAuthConfirm";
import CognitoAuth from "./component/CognitoAuth";
import CognitoOtp from "./component/CognitoOtp";
import Interval from "./Interval";
import ColorPicker from "./component/ColorPicker";
import Language from "./component/Language";
import BackdropComponent from "./component/BackdropComponent";
import SortComponent from "./component/SortComponent";
import FilterComponent from "./component/FilterComponent";
import LambdaCheck from "./component/LambdaCheck";
import MapView from "./pages/MapView";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapViewerComponent } from "./component/MapViewerComponent";
import { Marker } from "./component/MapViewerComponent/Marker";

type PositionStore = {
  id: number;
  lat: number;
  lng: number;
  positionName: string;
};

function App() {
  // ログイン有効時間
  const EXPIRY_TIME = 1000 * 60 * 60; // 1時間（ミリ秒単位）
  const [loading, setLoading] = useState(true);

  const checkIsLoggedIn = () => {
    const loggedInTime = localStorage.getItem("loggedInTime");
    const currentTime = new Date().getTime();
    const isLoggedIn = localStorage.getItem("loggedIn");

    // loggedInTimeがnullでないかどうかと、数値に変換できるかどうかをチェック
    if (loggedInTime && !isNaN(Number(loggedInTime)) && isLoggedIn === "true") {
      return currentTime - Number(loggedInTime) < EXPIRY_TIME;
    }
    return false;
  };

  // ステートの初期値をlocalStorageから取得する
  const [loggedIn, setLoggedIn] = useState(checkIsLoggedIn());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState<string | null>(null);
  const [position, setPosition] = useState<google.maps.LatLngLiteral>({
    lat: 34.2422,
    lng: 132.555,
  });
  const [positionStore, setPositionStore] = useState<PositionStore[]>([]);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>();
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [positionName, setPositionName] = useState<string>("");

  const url = import.meta.env.VITE_APP_API_URL
    ? import.meta.env.VITE_APP_API_URL
    : "#";

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  useEffect(() => {
    const storedTime = localStorage.getItem("loggedInTime");
    if (storedTime) {
      setLastLoginTime(storedTime);
    }
  }, []);
  useEffect(() => {
    setLoggedIn(checkIsLoggedIn());
    setLoading(false); // 初期チェックが完了したのでローディングを終了します
  }, []);

  useEffect(() => {
    // loggedInの値が変更されたときにlocalStorageに保存する
    if (loggedIn) {
      const currentTime = new Date().getTime().toString();
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedInTime", currentTime);
      setLastLoginTime(currentTime); // ステートを更新
    } else {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("loggedInTime");
    }
  }, [loggedIn]);

  const setPositionValues = () => {
    const latValue = position.lat;
    const lngValue = position.lng;

    // 緯度と経度が有効な数値であることを確認
    if (!isNaN(latValue) && !isNaN(lngValue)) {
      setPosition({ lat: latValue, lng: lngValue });
      setPositionStore([
        ...positionStore,
        {
          id: Date.now(),
          lat: latValue,
          lng: lngValue,
          positionName: positionName,
        },
      ]);
      setPositionName("");
    } else {
      // 無効な入力の場合のエラー処理（アラートなど）
      alert("Invalid latitude or longitude");
    }
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInTime");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMapClick = (lat: any, lng: any) => {
    console.log("クリック位置", lat, lng);
    setMarkerPosition({ lat: lat, lng: lng });
  };

  const handleChangeLat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLat(e.target.value);
  };

  const handleChangeLng = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLng(e.target.value);
  };

  const handleChangePositionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPositionName(e.target.value);
  };

  const onCallHistoryItem = (lat: number, lng: number) => {
    setPosition({ lat: lat, lng: lng });
  };

  const onDeleteHistoryItem = (id: number) => {
    const filterdItem = positionStore.filter((item) => item.id != id);
    setPositionStore(filterdItem);
  };

  return (
    <Router>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AppBar position='static'>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={toggleDrawer}
                aria-label='menu'
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6'>Sample Apps</Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
            <List>
              <ListItem component={Link} to='/Interval'>
                <ListItemText primary='Interval' />
              </ListItem>
              <ListItem component={Link} to='/TalkPost'>
                <ListItemText primary='TalkPost' />
              </ListItem>
              <ListItem component={Link} to='/About'>
                <ListItemText primary='About' />
              </ListItem>
              <ListItem component={Link} to='/mobile/FrameView'>
                <ListItemText primary='FrameView' />
              </ListItem>
              <ListItem component={Link} to='/mobile/List'>
                <ListItemText primary='List' />
              </ListItem>
              <ListItem component={Link} to='/mobile/Welcome'>
                <ListItemText primary='Welcome' />
              </ListItem>
              <ListItem component={Link} to='/UploadCSV'>
                <ListItemText primary='UploadCSV' />
              </ListItem>
              <ListItem component={Link} to='/OTPAuthRegister'>
                <ListItemText primary='OTPAuthRegister' />
              </ListItem>
              <ListItem component={Link} to='/OTPAuthLogin'>
                <ListItemText primary='OTPAuthLogin' />
              </ListItem>
              <ListItem component={Link} to='/OTPAuthConfirm'>
                <ListItemText primary='OTPAuthConfirm' />
              </ListItem>
              <ListItem component={Link} to='/CognitoAuth'>
                <ListItemText primary='CognitoAuth' />
              </ListItem>
              <ListItem component={Link} to='/CognitoOtp'>
                <ListItemText primary='CognitoOtp' />
              </ListItem>
              <ListItem component={Link} to='/mobile/ChatRoom'>
                <ListItemText primary='ChatRoom' />
              </ListItem>
              <ListItem component={Link} to='/ColorPicker'>
                <ListItemText primary='ColorPicker' />
              </ListItem>
              <ListItem component={Link} to='/BackdropComponent'>
                <ListItemText primary='BackdropComponent' />
              </ListItem>
              <ListItem component={Link} to='/SortComponent'>
                <ListItemText primary='SortComponent' />
              </ListItem>
              <ListItem component={Link} to='/FilterComponent'>
                <ListItemText primary='FilterComponent' />
              </ListItem>
            </List>
            <ListItem component={Link} to='/Language'>
              <ListItemText primary='Language' />
            </ListItem>
            <ListItem component={Link} to='/LambdaCheck'>
              <ListItemText primary='LambdaCheck' />
            </ListItem>
            <ListItem component={Link} to='/MapView'>
              <ListItemText primary='MapView' />
            </ListItem>
          </Drawer>
          <div>
            最終ログイン時刻:
            {lastLoginTime
              ? new Date(Number(lastLoginTime)).toLocaleString()
              : "未ログインまたは情報がありません"}
          </div>
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
                <Route
                  path='/BackdropComponent'
                  element={<BackdropComponent />}
                />
                <Route path='/Language' element={<Language />} />
                <Route path='/about' element={<About url={url} />} />
                <Route path='/mobile/Welcome' element={<Welcome />} />
                <Route path='/mobile/List' element={<SampleList />} />
                <Route path='/mobile/Chatroom' element={<ChatRoom />} />
                <Route path='/LambdaCheck' element={<LambdaCheck />} />
                <Route path='/MapView' element={<MapView />} />
              </>
            ) : (
              <Route path='*' element={<Navigate to='/auth' />} />
            )}
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
