import React, { useState } from "react";
import { Button, message, Steps, Card, Select, Divider } from "antd";
import { InboxOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Form, Upload, Input } from "antd";
import { getGithubRepo } from "../../services/github";
import FeedCard from "../../components/FeedCard/FeedCard";
import { useSelector, useDispatch } from "react-redux";
import { createCard } from "../../services/feed";
import { BACKEND_URL } from "../../config";

// API Section for create card

// const createCard = async (id, projectTitle, projectDetails, repo) => {
//   var myHeaders = new Headers();
//   var formdata = new FormData();
//   formdata.append("user_id", id);
//   formdata.append("projectTitle",projectTitle)
//   formdata.append("projectDetails",projectDetails)
//   formdata.append("repo",repo)

//   var requestOptions = {
//     method: "POST",
//     body: formdata,
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   let res = await fetch(
//     `${BACKEND_URL}/api/feed/create-cards`,
//     requestOptions
//   );

//   const data = await res.json();
//   return data;
// };

const { Option } = Select;

export default function CreateCard() {
  // getting user details
  const user = useSelector((state) => state.user);
  // creating card function
  async function createFeedCard() {
    const response = await createCard(
      user.user_id,
      projectTitle,
      projectDetails,
      repo
    );
    response.success
      ? message.success(response.message)
      : message.error("Unable to create card");
  }

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [run, setRun] = useState(false);
  const [projectTitle, setProjectTitle] = useState("Create your project");
  const [projectDetails, setProjectDetails] = useState();
  const [repo, setRepo] = useState();
  // const token = tokenState.token
  // const username = tokenState.username

  const [upload, setUpload] = useState();
  const tokenState = useSelector((state) => state.githubToken);
  const [dropitems, setdropitems] = useState([]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  async function getItems() {
    if (run === false) {
      const response = await getGithubRepo(
        tokenState.token,
        tokenState.username
      );
      setdropitems(response.data);
      setRun(true);
    }
  }

  getItems();

  const cardData = {
    project_title: projectTitle,
    project_drescriptions: projectDetails,
    repository: repo,
  };

  const steps = [
    {
      title: "Project Details",
      content: (
        <>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            wrapperCol={{
              span: 15,
              offset: -7,
            }}
            style={{
              float: "center",
            }}>
            <br />

            <Form.Item
              name="projectTitle"
              label="Project title"
              rules={[
                {
                  required: true,
                },
              ]}
              onChange={(e) => {
                if (projectTitle.length === null) {
                  setProjectTitle("Create your project");
                } else {
                  setProjectTitle(e.target.value);
                }
              }}>
              <Input />
            </Form.Item>

            <Form.Item
              name="projectDetails"
              label="Project details"
              rules={[
                {
                  required: true,
                  message: "Please input project details",
                },
              ]}>
              <Input.TextArea
                showCount
                maxLength={200}
                onChange={(e) => setProjectDetails(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Upload">
              <Form.Item
                name="fileUpload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle>
                <Upload.Dragger
                  name="files"
                  action="/upload.do"
                  maxCount={1}
                  onChange={(e) => setUpload(e.target.files[0])}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Form>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            wrapperCol={{
              span: 15,
              offset: -7,
            }}>
            <br />

            <Form.Item
              name="githubToken"
              label="Github Token"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input defaultValue={tokenState.token} disabled />
            </Form.Item>

            <Form.Item name="userName" label="Project details">
              <Input defaultValue={tokenState.username} disabled />
            </Form.Item>

            <Form.Item
              name="repo"
              label="Repository"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select
                placeholder="Select a option and change input text above"
                allowClear
                onChange={(e) => {
                  setRepo(e);
                }}>
                {dropitems.map((name) => (
                  <Option value={name} initialValues={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </>
      ),
    },

    {
      title: "Finish",
      content: (
        <>
          <br />
          <Divider orientation="center">
            <b style={{ fontSize: 20 }}>Card Preview</b>
          </Divider>
          <FeedCard data={cardData} />
          <br />
        </>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  // const response = getGithubRepo(tokenState.token,tokenState.username)
  // setDropdownData(response.data)

  return (
    <>
      <Card
        title={projectTitle}
        bordered={false}
        style={{
          width: "100%",
          marginTop: 50,
          padding: 30,
          boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
        }}
        className="">
        <Steps current={current} items={items} />
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button
              type="primary"
              style={{
                marginTop: 20,
              }}
              onClick={() => next()}
              disabled={repo && projectTitle ? false : true}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={
                () => createFeedCard()

                // message.success("Card created successfully")
              }>
              Create Card
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>
    </>
  );
}
