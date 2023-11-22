import React, { Fragment } from "react";
import FrenquencyChart from "./charts/FrenquencyChart";
import CumulatedFrenquencyChart from "./charts/CumulatedFrenquencyChart";
import Box from "./shared/Box";
import DoubleBellChart from "./charts/DoubleBellChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHostNodePath } from "../utils/host";

export default function Settings() {
  const [rol, setRol] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("/api/auth", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        // setLoaded(true);
        if (res.data.Status === "Success") {
          // setAuth(true);
          setName(res.data.username);
          setRol(res.data.rol);

          //   navigate("/");
          //
        } else {
          // setAuth(false);
          // navigate("/login");
          // setMessage(res.data.Error);
        }
      });
  });

  return (
    <Fragment>
      {rol === "admin" ? (
        <SettingsDisplay></SettingsDisplay>
      ) : (
        "No tienes permiso"
      )}{" "}
    </Fragment>
  );
}

export function SettingsDisplay() {
  return (
    <div className="grid grid-cols-2 w-full gap-4 p-4">
      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <FrenquencyChart
            dataPath={"frequency"}
            chartName={"Frecuencia de uso mensual"}
            dataRate={60000}
          />
        </Box>

        <Box>
          <DoubleBellChart
            dataPath={"bell1"}
            chartName={"Gauss Chart 1"}
            dataRate={60000}
          />
        </Box>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <CumulatedFrenquencyChart
            dataPath={"cumulatedfrequency"}
            chartName={"Frecuencia de usoawwa acumulada"}
            dataRate={60000}
          />
        </Box>

        <Box>
          <DoubleBellChart
            dataPath={"bell2"}
            chartName={"Gauss Chart 2"}
            dataRate={60000}
          />
        </Box>
      </div>
    </div>
  );
}
