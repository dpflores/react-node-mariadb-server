import { Button } from "antd";
import React, { Fragment } from "react";
import { ConfigProvider } from "antd";
import { getHostPath } from "../../../utils/host";

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  //define the file type to text/csv
  csvFile = new Blob([csv], { type: "text/csv" });
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export default function DownloadButton({ dataPath, dateRange }) {
  const fetchData = () => {
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

        downloadCSV(data.data, "data.csv");

        // setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // Ejecutar fetchData inicialmente

  const onClickFunction = () => {
    console.log(dateRange);
    alert("Descargando datos...");
    fetchData();
  };

  return (
    <Fragment>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#0e1171",
          },
        }}
      >
        <Button type="primary" onClick={onClickFunction}>
          Descargar
        </Button>
      </ConfigProvider>
    </Fragment>
  );
}
