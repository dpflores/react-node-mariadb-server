import React, { Fragment } from "react";

import StockChart from "./highcharts/Stock";
// import Highcharts from 'highcharts'
import Highcharts from "highcharts/highstock";
import { ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { getHostPath } from "../../utils/host";

// Load Highcharts modules
require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
// require('highcharts/modules/map')(Highcharts)

var array1 = [
  [1483401600000, 116.33, 114.76, 116.15],
  [1483488000000, 116.51, 115.75, 116.02],
  [1483574400000, 116.86, 115.81, 116.61],
  [1483660800000, 118.16, 116.47, 117.91],
  [1483920000000, 119.43, 117.94, 118.99],
  [1484006400000, 119.38, 118.3, 119.11],
  [1484092800000, 119.93, 118.6, 119.75],
  [1484179200000, 119.3, 118.21, 119.25],
  [1484265600000, 119.62, 118.81, 119.04],
  [1484611200000, 120.24, 118.22, 120.0],
  [1484697600000, 120.5, 119.71, 119.99],
  [1484784000000, 120.09, 119.37, 119.78],
  [1484870400000, 120.45, 119.73, 120.0],
  [1485129600000, 120.81, 119.77, 120.08],
  [1485216000000, 120.1, 119.5, 119.97],
  [1485302400000, 122.1, 120.28, 121.88],
  [1485388800000, 122.44, 121.6, 121.94],
  [1485475200000, 122.35, 121.6, 121.95],
  [1485734400000, 121.63, 120.66, 121.63],
  [1485820800000, 121.39, 120.62, 121.35],
  [1485993600000, 129.39, 127.78, 128.53],
  [1486080000000, 129.19, 128.16, 129.08],
  [1486339200000, 130.5, 128.9, 130.29],
  [1486425600000, 132.09, 130.45, 131.53],
  [1486512000000, 132.22, 131.22, 132.04],
  [1486598400000, 132.44, 131.12, 132.42],
  [1486684800000, 132.94, 132.05, 132.12],
  [1486944000000, 133.82, 132.75, 133.29],
  [1487030400000, 135.09, 133.25, 135.02],
  [1487116800000, 136.27, 134.62, 135.51],
  [1487203200000, 135.9, 134.84, 135.34],
  [1487289600000, 135.83, 135.1, 135.72],
  [1487635200000, 136.75, 135.98, 136.7],
  [1487721600000, 137.12, 136.11, 137.11],
  [1487808000000, 137.48, 136.3, 136.53],
  [1487894400000, 136.66, 135.28, 136.66],
  [1488153600000, 137.44, 136.28, 136.93],
  [1488240000000, 137.44, 136.7, 136.99],
];

var array2 = [
  [1483401600000, 115.8, 116.33, 114.76, 116.15],
  [1483488000000, 115.85, 116.51, 115.75, 116.02],
  [1483574400000, 115.92, 116.86, 115.81, 116.61],
  [1483660800000, 116.78, 118.16, 116.47, 117.91],
  [1483920000000, 117.95, 119.43, 117.94, 118.99],
  [1484006400000, 118.77, 119.38, 118.3, 119.11],
  [1484092800000, 118.74, 119.93, 118.6, 119.75],
  [1484179200000, 118.9, 119.3, 118.21, 119.25],
  [1484265600000, 119.11, 119.62, 118.81, 119.04],
  [1484611200000, 118.34, 120.24, 118.22, 120.0],
  [1484697600000, 120.0, 120.5, 119.71, 119.99],
  [1484784000000, 119.4, 120.09, 119.37, 119.78],
  [1484870400000, 120.45, 120.45, 119.73, 120.0],
  [1485129600000, 120.0, 120.81, 119.77, 120.08],
  [1485216000000, 119.55, 120.1, 119.5, 119.97],
  [1485302400000, 120.42, 122.1, 120.28, 121.88],
  [1485388800000, 121.67, 122.44, 121.6, 121.94],
  [1485475200000, 122.14, 122.35, 121.6, 121.95],
  [1485734400000, 120.93, 121.63, 120.66, 121.63],
  [1485820800000, 121.15, 121.39, 120.62, 121.35],
  [1485993600000, 127.98, 129.39, 127.78, 128.53],
  [1486080000000, 128.31, 129.19, 128.16, 129.08],
  [1486339200000, 129.13, 130.5, 128.9, 130.29],
  [1486425600000, 130.54, 132.09, 130.45, 131.53],
  [1486512000000, 131.35, 132.22, 131.22, 132.04],
  [1486598400000, 131.65, 132.44, 131.12, 132.42],
  [1486684800000, 132.46, 132.94, 132.05, 132.12],
  [1486944000000, 133.08, 133.82, 132.75, 133.29],
  [1487030400000, 133.47, 135.09, 133.25, 135.02],
  [1487116800000, 135.52, 136.27, 134.62, 135.51],
  [1487203200000, 135.67, 135.9, 134.84, 135.34],
  [1487289600000, 135.1, 135.83, 135.1, 135.72],
  [1487635200000, 136.23, 136.75, 135.98, 136.7],
  [1487721600000, 136.43, 137.12, 136.11, 137.11],
  [1487808000000, 137.38, 137.48, 136.3, 136.53],
  [1487894400000, 135.91, 136.66, 135.28, 136.66],
  [1488153600000, 137.14, 137.44, 136.28, 136.93],
  [1488240000000, 137.08, 137.44, 136.7, 136.99],
];
var array3 = [];
var array4 = [];

export default function RealTimeChart({
  chartName,
  dataPath,
  dataRate = 10000,
}) {
  const [data1, setData1] = useState(array1);
  const [data2, setData2] = useState(array2);

  let isFetching = false;

  const fetchData = () => {
    if (!isFetching) {
      isFetching = true;

      fetch(getHostPath(dataPath))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData1(data.array1);
          setData2(data.array2);
          isFetching = false; // Marcar que la solicitud ha terminado

          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
          isFetching = false;
        });
    }
  };

  useEffect(() => {
    // Ejecutar fetchData inicialmente

    fetchData();

    // Configurar un intervalo para ejecutar fetchData
    const intervalId = setInterval(fetchData, dataRate);

    // Limpieza cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const stockOptions = {
    series: [
      {
        animation: false,
        name: "Grúa 1",
        color: "#66CC00",
        // showCheckbox: true,
        data: data1,
        // data: [],

        tooltip: {
          valueDecimals: 2,
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> ' +
            "{series.name}: <b>{point.y}m</b><br/>",
        },
      },
      {
        animation: false,
        name: "Grúa 2",
        color: "#FF9933",
        // showCheckbox: true,
        data: data2,
        // data: [],

        tooltip: {
          valueDecimals: 2,
          animation: false,
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> ' +
            "{series.name}: <b>{point.y}m</b><br/>",
        },
      },
    ],
    chart: {
      animation: false,
      // events: {
      //   load: function () {
      //     // set up the updating of the chart each second
      //     var series1 = this.series[0];
      //     var series2 = this.series[1];
      //     setInterval(function () {
      //       if (!!series1.data) {
      //         var x = new Date().getTime(), // current time
      //           y = Math.round(Math.random() * 100);
      //         series1.addPoint([x, y]);
      //       }
      //     }, 1000);
      //     setInterval(function () {
      //       if (!!series2.data) {
      //         var x = new Date().getTime(), // current time
      //           y = Math.round(Math.random() * 100);
      //         series2.addPoint([x, y]);
      //       }
      //     }, 1000);
      //   },
      // },
    },

    accessibility: {
      enabled: false,
    },

    time: {
      useUTC: false,
    },

    yAxis: {
      title: { text: "Altura (m)", align: "middle", rotation: 90, offset: 20 },

      // title: {
      //   text: 'm',
      //   align: 'high',
      //   offset: 5,
      //   rotation: 0,
      //   y: 0
      // },
    },

    // ADDED
    legend: {
      enabled: "true",
      // layout: 'vertical',
      // align: 'right',
      // verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        animation: false,
        // compare: 'percent',
        showInNavigator: true,
      },
    },

    // END ADDED

    rangeSelector: {
      buttons: [
        {
          count: 1,
          type: "day",
          text: "Hoy",
        },
        {
          count: 1,
          type: "month",
          text: "mes",
        },
        {
          count: 12,
          type: "month",
          text: "año",
        },
        {
          type: "all",
          text: "Todo",
        },
      ],
      inputEnabled: true,
      // selected: 1,
    },

    title: {
      text: "", //'DATA EN TIEMPO REAL'
    },

    exporting: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    time: {
      useUTC: false,
      timezone: "America/Lima",
    },
  };
  // Fin del config
  return (
    <Fragment>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="h-full w-full mt-3 flex flex-1 text-xs ">
        <ResponsiveContainer>
          <StockChart options={stockOptions} highcharts={Highcharts} />
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}
