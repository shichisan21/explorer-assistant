/**
 * File Description エントリーページ
 */

/**
 * Import
 */

import React, { useEffect, useRef, useState } from "react";
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
import { MapViewerComponent } from "../component/MapViewerComponent";
import { Marker } from "../component/MapViewerComponent/Marker";

type PositionStore = {
  id: number;
  lat: number;
  lng: number;
  positionName: string;
};

const MapView: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
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

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:6789");
    wsRef.current.onopen = () => {
      console.log("WebSocket is connected.");
    };
    wsRef.current.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    wsRef.current.onclose = (event) => {
      console.log("WebSocket is closed.", event.reason);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket encountered error:", error);
    };
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    console.log("WebSocket readyState:", wsRef.current?.readyState);
    if (wsRef.current) {
      wsRef.current.send(message);
      setMessage("");
    }
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
    <>
      <Box sx={{ minWidth: 500, marginBottom: 10 }}>
        <Wrapper apiKey={import.meta.env.VITE_APP_MAP_API_KEY} render={render}>
          <MapViewerComponent
            style={{ width: "100%", aspectRatio: "4 / 3" }}
            center={position}
            onMapClick={handleMapClick}
          >
            <Marker
              position={position}
              setPosition={(lat, lng) => setPosition({ lat, lng })}
            />
          </MapViewerComponent>
        </Wrapper>
        <Typography>Latitude: {position.lat}</Typography>
        <Typography>Longtitude: {position.lng}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "Row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>Latitude: </Typography>
          <TextField onChange={handleChangeLat} value={position.lat} />
          <Typography>Longitude: </Typography>
          <TextField onChange={handleChangeLng} value={position.lng} />
          <Typography>Name: </Typography>
          <TextField onChange={handleChangePositionName} value={positionName} />
          <Button variant='contained' onClick={setPositionValues}>
            SET
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align='right'>Name</TableCell>
                <TableCell align='right'>Latitude</TableCell>
                <TableCell align='right'>Longitude</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positionStore.map((data, id) => (
                <TableRow key={data.id}>
                  <TableCell component='th' scope='row'>
                    {id + 1}
                  </TableCell>
                  <TableCell align='right'>{data.positionName}</TableCell>
                  <TableCell align='right'>{data.lat}</TableCell>
                  <TableCell align='right'>{data.lng}</TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='contained'
                      sx={{ margin: 1 }}
                      onClick={() => onCallHistoryItem(data.lat, data.lng)}
                    >
                      復旧
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ margin: 1 }}
                      onClick={() => onDeleteHistoryItem(data.id)}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MapView;
