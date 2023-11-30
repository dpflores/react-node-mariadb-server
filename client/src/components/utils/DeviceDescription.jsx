import React, { useState } from "react";
import { useEffect } from "react";
import { getHostPath } from "../../utils/host";
import useLocalStorage from "use-local-storage";

export default function Description({ chartName, dataPath, dataRate = 10000 }) {
  // const [status, setStatus] = useLocalStorage(`${dataPath}`, false);
  const [status, setStatus] = useState(false);

  let isFetching = false;

  const fetchData = () => {
    if (!isFetching) {
      isFetching = true;
      fetch(getHostPath(dataPath))
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          isFetching = false;
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

    // Configurar un intervalo para ejecutar fetchData cada 500 milisegundos
    const intervalId = setInterval(fetchData, dataRate);

    // Limpieza cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-2">
      <strong className="text-gray-700 font-medium">{chartName}</strong>

      <div className="mt-20  mx-20   items-justify flex flex-col">
        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Equipo: </div>
          <div className="flex flex-1 ">Puente Grúa</div>
        </div>
        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Ubicación: </div>
          <div className="flex flex-1 ">Taller Principal</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Tensión: </div>
          <div className="flex flex-1 ">220V/60Hz</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Estatus: </div>
          <div className={`flex flex-1  ${status ? "text-green-700" : ""}`}>
            {status ? "Operando" : "Detenido"}
          </div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Horómetro: </div>
          <div className="flex flex-1 text-komatsu-blue text-xl">
            <Hourmeter dataRate={60000} dataPath={"hourmeter"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hourmeter({ dataPath, dataRate = 1000 }) {
  const [minutes, setMinutes] = useLocalStorage(`${dataPath}`, 0);
  const [hours, setHours] = useLocalStorage(`${dataPath}2`, 0);

  useEffect(() => {
    const fetchData = () => {
      fetch(getHostPath(dataPath))
        .then((res) => res.json())
        .then((data) => {
          setMinutes(data.minutes);
          setHours(data.hours);
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

  // Función para formatear los minutos y las horas con dos dígitos
  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div className="flex flex-row">
      <div className="hour">
        <span id="hourDisplay">{formatTime(hours)}</span>
      </div>
      <div className="separator">:</div>
      <div className="minute">
        <span id="minuteDisplay">{formatTime(minutes)}</span>
      </div>
    </div>
  );
}
