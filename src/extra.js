import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import {
  ComposableMap,
  Geography,
  Geographies,
  Marker,
  ZoomableGroup,
  Line,
} from "react-simple-maps";
import axios from "axios";

const App = () => {
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [location, setlocation] = useState("");
  const [myLatitude, setLatitude] = useState();
  const [myLongitude, setLongitude] = useState();
  const [myLocation, setLocation] = useState("");
  const [flag, setFlag] = useState();

  const findLocationByCoord = (lat, long, entity) => {
    console.log(lat, long, entity);
    const key = "9e2a1b435ac7441749af061792885132";
    axios({
      method: "GET",
      url: `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${lat},${long}`,
    })
      .then(({ data }) => {
        const Location = data.data[0].label;
        if (entity === "Receiver") setLocation(Location);
        else setlocation(Location);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "7iW3gUP49gQNigMO4hWWxd7i6WX0wGH2NvYvoAjx",
      databaseURL:
        "newpro-5df0c-default-rtdb.asia-southeast1.firebasedatabase.app/",
      projectId: "newpro-5df0c",
    };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    firebase
      .database()
      .ref("FirebaseIOT")
      .on("value", (snapshot) => {
        snapshot.forEach((snap) => {
          if (snap.key === "Latitude") setlatitude(snap.val());
          if (snap.key === "Longitude") setlongitude(snap.val());
        });
      });
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      function (err) {
        console.log("ERROR", err);
      }
    );
  }, []);

  useEffect(() => {
    if (myLongitude && myLatitude && latitude && longitude && !flag) {
      findLocationByCoord(myLatitude, myLongitude, "Receiver");
      findLocationByCoord(latitude, longitude, "Sender");
      setFlag(true);
    }
  });

  return (
    <div>
      <div>
        <h2> Ecommerce package tracker </h2>
      </div>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [270, -20, 0],
          scale: 350,
        }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies
            geography={
              "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
            }
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#c2c2c4"
                    stroke="white"
                  />
                );
              })
            }
          </Geographies>
          <Marker key={"Delivery guy"} coordinates={[longitude, latitude]}>
            <circle r={3} fill="#F00" stroke="#fff" strokeWidth={0.5} />
            <text
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                fontWeight: "bold",
                fontSize: "8px",
              }}
              textAnchor="middle"
            >{`${location}`}</text>
          </Marker>
          <Marker key={"My guy"} coordinates={[myLongitude, myLatitude]}>
            <circle r={3} fill="#F00" stroke="#fff" strokeWidth={0.5} />
            <text
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                fontSize: "8px",
                fontWeight: "bold",
              }}
              textAnchor="middle"
            >{`${myLocation}`}</text>
          </Marker>
          <Line
            from={[myLongitude, myLatitude]}
            to={[longitude, latitude]}
            stroke="#FF5533"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default App;
