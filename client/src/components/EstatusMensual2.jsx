import React from "react";
import BarChart from "./charts/BarChart";
import HeatMapAntChart from "./charts/HeatMapAntChart";
import Box from "./shared/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EstatusMensual2() {
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
          <HeatMapAntChart
            chartName={"Heatmap 1"}
            dataPath={"heat1"}
            dataRate={10000}
          />
        </Box>

        <Box>
          {/* <BarChart chartName={"Bar Chart 1"} dataPath={"barchart1"} /> */}
        </Box>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <HeatMapAntChart chartName={"Heatmap 2"} dataPath={"heat2"} />
        </Box>

        <Box>
          {/* <BarChart chartName={"Bar Chart 2"} dataPath={"barchart2"} /> */}
        </Box>
      </div>
    </div>
  );
}
