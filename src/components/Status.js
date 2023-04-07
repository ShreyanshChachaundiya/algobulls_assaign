import React from "react";
import { Select } from "antd";

const Status = ({data,setData}) => {
  const onChange = (value) => {
    setData({ ...data, status: value });
  };

  const onSearch = (value) => {
    setData({ ...data, status: value });
  };
  return (
    <div>
      <Select
        showSearch
        value={data?.status==""?"Open":data?.status}
        style={{ width: 160 }}
        placeholder="Select a Status"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "Open",
            label: "Open",
          },
          {
            value: "Working",
            label: "Working",
          },
          {
            value: "Done",
            label: "Done",
          },
          {
            value: "OverDue",
            label: "OverDue",
          },
        ]}
      />
    </div>
  );
};

export default Status;
