import React, { useState } from "react";
import {
  Card,
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  message,
  Steps,
  theme,
  Typography,
} from "antd";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  UserOutlined,
  SecurityScanFilled,
} from "@ant-design/icons";
import { CreateUser, Userlogin } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [username, setusername] = useState();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [gitToken, setgitToken] = useState();

  const steps = [
    {
      title: "Basic Details",
      content: (
        <>
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
          </Form>
        </>
      ),
      icon: <UserOutlined />,
    },
    {
      title: "User Credentials",
      content: (
        <>
          <Form
            name="basic"
            autoComplete="off"
            style={{ padding: 100, paddingTop: 50 }}>
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
          </Form>
        </>
      ),
      icon: <SecurityScanFilled />,
    },
    {
      title: "Github Configurations",
      content: (
        <>
          <Form
            name="basic"
            autoComplete="off"
            style={{ padding: 100, paddingTop: 50 }}>
            <Form.Item
              label="Github Access Token"
              name="token"
              rules={[
                {
                  required: true,
                  message: "Please input your token!",
                },
              ]}>
              <Input.Password
                onChange={(e) => {
                  setgitToken(e.target.value);
                }}
              />
              <p>
                *Note: Your access token should have all the possible
                permissions otheriwse you won't be able to access lots of
                functionalities.{" "}
              </p>
            </Form.Item>
          </Form>
        </>
      ),
      icon: <SecurityScanFilled />,
    },
  ];

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

  const { token } = theme.useToken();
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
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div>
      {contextHolder}
      <Card
        bordered={false}
        style={{
          width: "70%",
          marginTop: "6%",
          // marginBottom: "10%",
          boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
          marginLeft: "15%",
          // paddingInline: "50px",
          padding: "60px",
        }}>
        <center style={{ marginTop: -60, marginBottom: 50 }}>
          <Title>User Registrations</Title>
        </center>
        <div className="login">
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
            }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 &&
            email &&
            password &&
            lastname &&
            firstname ? (
              <Button
                type="primary"
                onClick={async () => {
                  const response = await CreateUser(
                    username,
                    password,
                    email,
                    lastname,
                    firstname,
                    gitToken
                  );
                  if (response.success) {
                    openNotification("User created successfully", true);
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
                  } else {
                    openNotification(response.message, false);
                  }
                }}>
                Done
              </Button>
            ) : null}
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
        </div>
        <div style={{ marginTop: 40, marginBottom: -30 }}>
          Already have an account <a href="/login"> Sign In Now</a>
        </div>
      </Card>
    </div>
  );
}
