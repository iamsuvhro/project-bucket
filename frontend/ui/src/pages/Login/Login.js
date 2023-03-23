import React, { useState } from "react";
import { Card, Button, Checkbox, Form, Input, notification } from "antd";
import {
  UserSwitchOutlined,
  TeamOutlined,
  CloseCircleTwoTone,
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Userlogin } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { Navigate } from "react-router-dom";

export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [api, contextHolder] = notification.useNotification();
  const tokenState = useSelector((state) => state.githubToken);
  const openNotification = (title, status) => {
    if (status) {
      api.open({
        message: title,
        icon: <CheckCircleFilled style={{ color: "#04c939" }} />,
      });
    } else {
      api.open({
        message: title,
        icon: <CloseCircleFilled style={{ color: "#f53d3d" }} />,
      });
    }
  };

  const dispatch = useDispatch();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();

  return (
    <div>
      {contextHolder}
      <Card
        bordered={false}
        style={{
          width: "50%",
          marginTop: "12%",
          marginBottom: "10%",
          boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
          marginLeft: "25%",
        }}>
        <div className="login">
          <center>User Login</center>
        </div>
        <Form
          name="basic"
          autoComplete="off"
          style={{ padding: 100, paddingTop: 50 }}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}>
            <Input
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item>
            <center>
              <Button
                type="primary"
                size={"500"}
                htmlType="submit"
                onClick={async () => {
                  const response = await Userlogin(username, password);
                  if (response.success) {
                    openNotification("Logged In successfully", true);
                    dispatch(actionCreators.authState(response.success));
                    const userData = {
                      user_id: response.data[0].id,
                      last_login: response.data[0].last_login,
                      username: response.data[0].username,
                      name:
                        response.data[0].first_name +
                        " " +
                        response.data[0].last_name,
                      email: response.data[0].email,
                      date_joined: response.data[0].date_joined,
                      // githubToken: response.data
                    };
                    dispatch(actionCreators.userAuthDetails(userData));
                  } else {
                    openNotification("Invalid username or password", false);
                  }
                }}>
                Submit
              </Button>
              <div style={{ marginTop: 40, marginBottom: -30 }}>
                Don't have any account <a href="/registration">Sign Up Now</a>
              </div>
            </center>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
