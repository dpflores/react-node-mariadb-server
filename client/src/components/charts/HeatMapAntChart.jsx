import React from "react";
import { ResponsiveContainer } from "recharts";

import { Heatmap } from "@ant-design/plots";

import { useState } from "react";
import { useEffect } from "react";
import DatePickerComponent from "./components/DatePicker";
import RefreshButton from "./components/RefreshButton";
import layoutImage from "../images/layout.jpg";
import { getHostPath } from "../../utils/host";

export default function HeatMapAntChart({
  chartName,
  dataPath,
  dataRate = 10000,
}) {
  const [data, setData] = useState([]);
  const [dateRange, setDates] = useState([]);

  // INIT CHART
  // useEffect(() => {
  //   // Llamar a asyncFetch inmediatamente al cargar el componente.
  //   asyncFetch();
  // }, [dataPath]);

  const onRangeChange = (date_values, dateStrings) => {
    console.log(date_values);
    setDates(date_values.map((item) => Math.round(item.valueOf() / 1000)));
    console.log(dateRange);
  };

  const onClickFunction = () => {
    console.log(dateRange);
    asyncFetch();
  };

  let isFetching = false;

  const asyncFetch = () => {
    if (!isFetching) {
      isFetching = true;
      fetch(getHostPath(dataPath), {
        method: "POST",
        body: JSON.stringify({ dateRange }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setData(data);
          isFetching = false;

          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
          isFetching = false;
        });
    }
  };

  const DemoHeatmap = () => {
    // useEffect(() => {
    //   asyncFetch();
    // }, []);

    const config = {
      data,
      //   label: {
      //     fill: 'black',
      //   },
      // xAxis:{label: {
      //     style : {
      //         fill: '#000',

      //         }
      //     },
      // },

      // yAxis:{label: {
      //     style : {
      //         fill: '#000',

      //         }
      //     },
      // },
      xAxis: {
        min: 0,
        max: 75,
      },
      yAxis: {
        min: 0,
        max: 38,
      },

      type: "density",
      xField: "g",
      yField: "l",
      colorField: "tmp",
      // color:
      //   "#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2",
      color:
        "#6E32C2-#1890FF-#12CCCC-#80FF73  -#FAFFA8-#FFC838-#FF8C12-#FA541C-#F51D27",
      legend: {
        // label: {
        //     style : {
        //         fill: '#000',

        //     }
        // },border-solid
        position: "bottom",
        rail: {
          // type:"size",
        },
      },
      annotations: [
        {
          type: "image",
          start: ["min", "max"],
          end: ["max", "min"],
          src: layoutImage,
        },
      ],
    };

    return <Heatmap {...config} />;
  };
  return (
    <div>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="mt-3 flex flex-1 text-xs">
        <ResponsiveContainer>
          <DemoHeatmap />
        </ResponsiveContainer>
      </div>

      <div className="flex flex-row justify-center gap-4">
        <div>
          <DatePickerComponent onRangeChange={onRangeChange} />
        </div>

        <RefreshButton onClickFunction={onClickFunction} />
      </div>
    </div>
  );
}
