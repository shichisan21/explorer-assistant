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

import { Status, Wrapper } from "@googlemaps/react-wrapper";
import getRoutes from "./routes/AppRoutes";

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
            <ListItem component={Link} to='/SupabaseTest'>
              <ListItemText primary='SupabaseTest' />
            </ListItem>
          </Drawer>
          <div>
            最終ログイン時刻:
            {lastLoginTime
              ? new Date(Number(lastLoginTime)).toLocaleString()
              : "未ログインまたは情報がありません"}
          </div>
          {getRoutes(loggedIn, setLoggedIn)}
        </>
      )}
    </Router>
  );
}

export default App;
