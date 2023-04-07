import { Modal, Input, Form } from "antd";
import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import Status from "./Status";
import TagInput from "./TagInput";

const Add = ({
  isNewModalOpen,
  setIsNewModalOpen,
  dataSource,
  setDataSource,
}) => {
  let timeStamp = new Date().toLocaleString();
  const [time, setTime] = useState();

  const [data, setData] = useState({
    id: "",
    time: timeStamp,
    title: ``,
    description: "",
    dueDate: "",
    status: "",
    age: "10",
    tags: [],
  });

  const onChange = (value) => {
    setTime(value.$d.toLocaleString());
    console.log(time);
  };

  const onOk = (value) => {
    setTime(value.$d.toLocaleString());
    console.log(time);
  };

  const handleOk = () => {
    const newDataSource = [
      ...dataSource,
      {
        ...data,
        time: timeStamp,
        dueDate: time,
        id: dataSource.length + 1,
      },
    ];
    
    setDataSource(newDataSource);
    resetData();
  };

  const resetData = () => {
    setIsNewModalOpen(false);
  };

  const handleCancel = () => {
    setIsNewModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Add"
        open={isNewModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <DatePicker showTime onOk={onOk} onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="title"
            value={data?.title}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Title"
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
              value={data?.title}
            />
          </Form.Item>
          <Form.Item
            name="descr"
            value={data?.description}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Description"
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              value={data?.description}
            />
          </Form.Item>
          <Form.Item>
            <Status data={data} setData={setData} value={data?.status} />
          </Form.Item>
          <TagInput data={data} setData={setData} />
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
