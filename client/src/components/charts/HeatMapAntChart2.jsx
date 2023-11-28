import React from "react";
import { ResponsiveContainer } from "recharts";

import { Heatmap } from "@ant-design/plots";

import { useState } from "react";
import { useEffect } from "react";
import DatePickerForm from "./components/DatePickerForm";
import DatePickerComponent from "./components/DatePicker";
import RefreshButton from "./components/RefreshButton";
import SubmitButton from "./components/SubmitButton";
import layoutImage from "../images/layout.jpg";
import { getHostPath } from "../../utils/host";
import useLocalStorage from "use-local-storage";
import { InputNumber, Space, Select } from "antd";
import { Button, DatePicker, Form, TimePicker } from "antd";

const { RangePicker } = DatePicker;
export default function HeatMapAntChart({
  chartName,
  dataPath,
  dataRate = 10000,
}) {
  const [data, setData] = useLocalStorage(`${dataPath}`, []);
  const [dateRange, setDates] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  // const [heatFilters, setHeatFilters] = useState({});

  const fetchData = ({ filters }) => {
    if (!isFetching) {
      setIsFetching(true);
      fetch(getHostPath(dataPath), {
        method: "POST",
        body: JSON.stringify({ filters }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setData(data);
          setIsFetching(false);

          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
          setIsFetching(false);
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
        <ResponsiveContainer className={"relative"}>
          {isFetching && (
            <div className="absolute flex flex-row justify-center gap-4 items-center justify-center bg-white z-50 w-full h-full bg-opacity-70">
              Loading...
            </div>
          )}
          <DemoHeatmap />
        </ResponsiveContainer>
      </div>

      <FormFilter formName={dataPath} fetchData={fetchData} />
    </div>
  );
}

// export function FilterDates({ onRangeChange, onClickFunction }) {
//   return (
//     <div className="flex flex-row justify-center gap-4">
//       <div>
//         <DatePickerComponent onRangeChange={onRangeChange} />
//       </div>

//       <RefreshButton onClickFunction={onClickFunction} />
//     </div>
//   );
// }

// export function MultipleFilters({ onRangeChange, onClickFunction }) {
//   return (
//     <div className="flex flex-col justify-center gap-4">
//       <div className="flex flex-row justify-center gap-4">
//         <DatePickerComponent onRangeChange={onRangeChange} width="50%" />
//         <NumberRange
//           label1={"Peso Inicial"}
//           label2={"Peso Final"}
//           units={"Ton."}
//         />
//       </div>

//       <div className="flex flex-row justify-center gap-4">
//         <SelectState label={"Select State"} />
//         <NumberRange
//           label1={"Altura Inicial"}
//           label2={"Altura Final"}
//           units={"m"}
//         />
//       </div>

//       <RefreshButton onClickFunction={onClickFunction} />
//     </div>
//   );
// }

export function NumberRange({ label1, label2, units, width, value, onChange }) {
  const on1Change = (val) => {
    const current = value ? [...value] : [];
    current[0] = val;

    if (current[0] > current[1]) {
      alert("El valor inicial no puede ser mayor al valor final");
      current[0] = current[1];
    }
    if (current[0] === null) {
      current[0] = 0;
      console.log("here");
    }

    onChange(current);
  };

  const on2Change = (val) => {
    const current = value ? [...value] : [];
    current[1] = val;
    if (current[0] > current[1]) {
      alert("El valor inicial no puede ser mayor al valor final");
      current[1] = current[0];
    }
    if (current[1] === null) {
      current[1] = 0;
    }
    onChange(current);
  };
  return (
    <Space.Compact block style={{ width: width }}>
      <InputNumber
        placeholder={label1}
        style={{ width: "100%" }}
        // defaultValue={1000}
        // formatter={(value) =>
        //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        // }
        // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        onChange={on1Change}
        value={value ? value[0] : null}
      />
      <InputNumber
        // addonAfter={units}
        placeholder={label2}
        style={{ width: "100%" }}
        // defaultValue={100}
        // min={0}
        // max={100}
        // formatter={(value) => `${value} Ton.`}
        // parser={(value) => value.replace("Ton.", "")}
        onChange={on2Change}
        value={value ? value[1] : null}
      />
    </Space.Compact>
  );
}

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

export function SelectState({ label, width, value, onChange }) {
  const handleChange = (val) => {
    let current = value ? [...value] : "";
    current = val;
    onChange(current);
  };

  return (
    <Select
      placeholder={label}
      style={{ width: width }}
      onChange={handleChange}
      options={[
        { value: "positivo", label: "Uso Efectivo" },
        { value: "negativo", label: "Uso Complementario" },
      ]}
    />
  );
}

export function FormFilter({ width = "70%", formName, fetchData }) {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const config = {
    rules: [
      {
        type: "string",
        required: true,
        message: "Seleccione un estado",
      },
    ],
  };
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Seleccione un rango",
      },
    ],
  };
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    console.log("here");
    console.log(fieldsValue);
    const values = {
      ...fieldsValue,
      dateRange: fieldsValue["range-time-picker"].map((item) =>
        Math.round(item.valueOf() / 1000)
      ),
      weightRange: fieldsValue["weight-filter"],
      heightRange: fieldsValue["height-filter"],
      stateFilter: fieldsValue["state-filter"],
    };

    fetchData({ filters: values });
    console.log("Received values of form: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name={formName}
      {...formItemLayout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: "100%" }}
    >
      <Form.Item
        name="range-time-picker"
        label="Rango de fechas"
        {...rangeConfig}
      >
        <DatePickerForm width={width} />
        {/* <DatePicker /> */}
      </Form.Item>

      <Form.Item
        name="weight-filter"
        label="Rango de pesos (Tn.)"
        // {...rangeConfig}
      >
        <NumberRange
          label1={"Peso Inicial"}
          label2={"Peso Final"}
          units={"Ton."}
          width={width}
        />
      </Form.Item>

      <Form.Item
        name="height-filter"
        label="Rango de Alturas (m)"
        // {...rangeConfig}
      >
        <NumberRange
          label1={"Altura Inicial"}
          label2={"Altura Final"}
          units={"m"}
          width={width}
        />
      </Form.Item>

      <Form.Item
        name="state-filter"
        label="Estado"
        // {...config}
      >
        <SelectState label={"Seleccione el estado"} width={width} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <SubmitButton width={width} />
      </Form.Item>
    </Form>
  );
}
