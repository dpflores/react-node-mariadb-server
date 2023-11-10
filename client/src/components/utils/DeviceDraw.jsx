import { chart } from "highcharts";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getHostPath } from "../../utils/host";
export default function DeviceDraw({ chartName, dataPath, dataRate = 10000 }) {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium"> {chartName}</strong>
      <div className="mt-3 relative w-full flex h-[31rem] bg-sky-200">
        <Draw dataPath={dataPath} dataRate={dataRate} />
      </div>
    </div>
  );
}

function Draw({ dataPath, dataRate = 10000 }) {
  const [x_pos, setXPos] = useState(0);
  const [y_pos, setYPos] = useState(0);

  const [carga1, setCarga1] = useState(0);
  const [carga2, setCarga2] = useState(0);

  var x_max = 75;
  var y_max = 38;

  var x = 0;
  var y = 0;

  const handleXPositionChange = (e) => {
    const newPosition = parseInt(e.target.value, 10);
    setXPos(newPosition);
  };
  const handleYPositionChange = (e) => {
    const newPosition = parseInt(e.target.value, 10);
    setYPos(newPosition);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(getHostPath(dataPath))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setXPos(data.rm9000.x_axis);
          setYPos(data.rm9000.y_axis);
          setCarga1(data.carga_grua.carga1);
          setCarga2(data.carga_grua.carga2);
          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    // Ejecutar fetchData inicialmente
    fetchData();

    // Configurar un intervalo para ejecutar fetchData cada 500 milisegundos
    const intervalId = setInterval(fetchData, dataRate);

    // Limpieza cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Fragment>
      <Line left={5} top={10} thickness={5} length={90} orientation={false} />
      <Line left={5} top={80} thickness={5} length={90} orientation={false} />

      <Line
        left={10 + x_pos}
        top={7}
        thickness={3}
        length={80}
        orientation={true}
      />

      <Line
        left={8.5 + x_pos}
        top={15 + y_pos}
        thickness={6}
        length={15}
        orientation={true}
      />
      <Line
        left={8.5 + x_pos}
        top={32 + y_pos}
        thickness={6}
        length={10}
        orientation={true}
      />

      <TextBox
        value={carga1}
        units={"Tn."}
        size={0.9}
        length={8}
        height={5}
        left={15 + x_pos}
        top={19 + y_pos}
      />
      <TextBox
        value={carga2}
        units={"Tn."}
        size={0.9}
        length={8}
        height={5}
        left={15 + x_pos}
        top={35 + y_pos}
      />

      <div style={{ top: "105%", position: "absolute" }}>
        {/* <input
          type="range"
          min="0"
          max="75" // Puedes ajustar el rango máximo según tus necesidades
          value={x_pos}
          onChange={handleXPositionChange}
          style={{ width: "100%" }}
        /> */}
        {/* <input
          type="range"
          min="0"
          max="38" // Puedes ajustar el rango máximo según tus necesidades
          value={y_pos}
          onChange={handleYPositionChange}
          style={{ width: "100%" }}
        /> */}
      </div>
    </Fragment>
  );
}

function Line({ left, top, thickness, length, orientation }) {
  const lineStyle = {
    left: `${left}%`,
    top: `${top}%`,
    position: "absolute",
    width: orientation ? thickness + "%" : length + "%",
    height: orientation ? length + "%" : thickness + "%",
    border: "0.2rem solid black",
    borderStyle: "solid",

    backgroundColor: "orange", // Cambiamos el color a naranja
  };

  return <div style={lineStyle}></div>;
}

function TextBox({ value, units, size, length, height, left, top }) {
  return (
    <div
      style={{
        top: `${top}%`, // Define la posición vertical desde la parte superior
        position: "absolute",
        bottom: "5%", // Ajusta la posición vertical desde la parte superior según tus necesidades
        left: `${left}%`, // Ajusta la posición horizontal según tus necesidades
        width: `${length}%`, // Ajusta el ancho del cuadro de texto según tus necesidades
        textAlign: "center", // Centra el texto horizontalmente
        color: "black", // Color del texto
        backgroundColor: "white", // Fondo blanco
        border: "0.1em solid black", // Borde de 1 píxel de ancho, color negro
        height: `${height}%`,
        fontSize: `${size}rem`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value} {units}
    </div>
  );
}
