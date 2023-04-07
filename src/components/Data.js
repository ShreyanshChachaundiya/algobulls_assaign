import React, { useState } from "react";
import { Modal, Tag, Input, Button, Form, Table } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";


import Add from "./Add";
import Find from "./Find";
import content from "./Api";
import Status from "./Status";

const Data = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [data, setData] = useState();

  const [dataSource, setDataSource] = useState(content);

  const showModal = (record) => {
    setIsModalOpen(true);
    setData({ ...record });
  };

  const handleOk = (record) => {
    const newDataSource = [...dataSource];
    const index = newDataSource.findIndex((item) => item.id === data.id);
    newDataSource[index] = data;
    setDataSource(newDataSource);
    resetData();
  };

  const resetData = () => {
    setData(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      id: "1",
      title: "Timestamp",
      dataIndex: "time",
      sorter: function (a, b) {
        return a.time - b.time;
      },
    },
    {
      id: "2",
      title: "Title",
      dataIndex: "title",
      sorter: function (a, b) {
        return a.title.localeCompare(b.title);
      },
    },
    {
      id: "3",
      title: "Description",
      dataIndex: "description",
      sorter: function (a, b) {
        return a.description.localeCompare(b.description);
      },
    },
    {
      id: "4",
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: function (a, b) {
        return new Date(a.dueDate)-new Date(b.dueDate)
      },
    },
    {
      id: "5",
      title: "Status",
      dataIndex: "status",
      // Creating filter object for the status column with unique values
      filters: [
        { text: "Done", value: "Done" },
        { text: "Working", value: "Working" },
        { text: "Open", value: "Open" },
        { text: "Overdue", value: "Overdue" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      id: "7",
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      id: "8",
      title: "Action",
      dataIndex: "action",
      render: (ex, record) => {
        return (
          <>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                showModal(record);
              }}
            />
            <DeleteFilled
              onClick={() => {
                onDelete(record);
                // console.log(record);
              }}
              style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  const onDelete = (record) => {
    Modal.confirm({
      title: "Are u really wanted to delete",
      okText: "YES",
      onOk: () => {
        setDataSource(dataSource.filter((item) => item.id !== record.id));
      },
    });
  };

  return (
    <div>
      <Find dataSource={dataSource} setDataSource={setDataSource} />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: "5", total: "50" }}
        style={{
          width: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
        
        }}
        mobileBreakPoint={708}
      />
      <Modal
        title="Update"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <Input
              placeholder="Title"
              value={data?.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item >
            <Input
              placeholder="Description"
              value={data?.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Status data={data} setData={setData} value={data?.status} />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          setIsNewModalOpen(true);
        }}
        style={{ marginBottom: "20px" }}
      >
        Add New Entry
      </Button>

      <Add
        isNewModalOpen={isNewModalOpen}
        setIsNewModalOpen={setIsNewModalOpen}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </div>
  );
};

export default Data;
