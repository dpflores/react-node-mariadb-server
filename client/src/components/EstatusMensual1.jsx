import React from "react";
import FrenquencyChart from "./charts/FrenquencyChart";
import CumulatedFrenquencyChart from "./charts/CumulatedFrenquencyChart";
import Box from "./shared/Box";
import DoubleBellChart from "./charts/DoubleBellChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EstatusMensual1() {
  // const [name, setName] = useState("");
  // const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8081")
  //     .then((res) => {
  //       if (res.data.valid) {
  //         setName(res.data.username);
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
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
