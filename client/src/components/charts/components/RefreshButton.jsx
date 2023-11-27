import { Button } from "antd";
import React, { Fragment } from "react";
import { ConfigProvider } from "antd";

export default function RefreshButton({ onClickFunction, width = "25%" }) {
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
        <Button
          type="primary"
          onClick={onClickFunction}
          style={{ width: width }}
        >
          Actualizar
        </Button>
      </ConfigProvider>
    </Fragment>
  );
}
