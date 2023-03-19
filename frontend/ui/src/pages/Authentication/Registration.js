import React, { useState } from "react";
import { Card, Button, Checkbox, Form, Input, notification } from "antd";
import {
  UserSwitchOutlined,
  TeamOutlined,
  CloseCircleTwoTone,
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { CreateUser, Userlogin } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { Navigate } from "react-router-dom";

export default function Registration() {
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
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
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
          <center>Create a new account</center>
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
            label="First Name"
            name="fname"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}>
            <Input
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lname"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}>
            <Input
              onChange={(e) => {
                setlastname(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            type="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}>
            <Input
              onChange={(e) => {
                setemail(e.target.value);
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
                  const response = await CreateUser(
                    username,
                    password,
                    email,
                    lastname,
                    firstname
                  );
                  if (response.success) {
                    openNotification("User created successfully", true);
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
                    };
                    dispatch(actionCreators.userAuthDetails(userData));
                    <Navigate to="/" />;
                  } else {
                    openNotification(response.message, false);
                  }
                }}>
                Submit
              </Button>
              <div style={{ marginTop: 40, marginBottom: -30 }}>
                Already have an account <a href="/login">Sign in Now</a>
              </div>
            </center>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
