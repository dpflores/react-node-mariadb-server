import React from "react";
import FrenquencyChart from "./charts/FrenquencyChart";
import CumulatedFrenquencyChart from "./charts/CumulatedFrenquencyChart";
import Box from "./shared/Box";
import DoubleBellChart from "./charts/DoubleBellChart";

export default function EstatusMensual1() {

  return (
    <div className="grid grid-cols-2 w-full gap-4 p-4">
      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <FrenquencyChart
            dataPath={"frequency"}
            chartName={"Frecuencia de uso mensual"}
            serverType={"charts"}
          />
        </Box>

        <Box>
          <DoubleBellChart
            dataPath={"bell1"}
            chartName={"Gauss Chart 1"}
            serverType={"charts"}
          />
        </Box>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <CumulatedFrenquencyChart
            dataPath={"cfrequency"}
            chartName={"Frecuencia de usoawwa acumulada"}
            serverType={"charts"}
          />
        </Box>

        <Box>
          <DoubleBellChart
            dataPath={"bell2"}
            chartName={"Gauss Chart 2"}
            serverType={"charts"}
          />
        </Box>
      </div>
    </div>
  );
}
