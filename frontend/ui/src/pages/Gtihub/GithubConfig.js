import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Avatar,
  Tabs,
  Descriptions,
  Form,
  Input,
  Button,
  Image,
} from "antd";
import { Col, Row, notification, Empty, Spin } from "antd";
import {
  UserSwitchOutlined,
  TeamOutlined,
  CloseCircleTwoTone,
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { getGithubDetails } from "../../services/github";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

export default function GithubConfig() {
  const [api, contextHolder] = notification.useNotification();
  const state = useSelector((state) => state.githubProfile);
  const tokenState = useSelector((state) => state.githubToken);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const disabled = tokenState.token;

  async function GetGithubDetails(token, username) {
    const response = await getGithubDetails(token, username);
    console.log(response);

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

    if (response.status === 200) {
      openNotification("Github configured successfully", true);
      const data = response.data;
      const payload = {
        name: data.name,
        company: data.company,
        id: data.id,
        username: data.login,
        avatar_url: data.avatar_url,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
      };
      const tokenPayload = {
        token: token,
        username: username,
      };
      dispatch(actionCreators.updateGithubProfiles(payload));
      dispatch(actionCreators.updateToken(tokenPayload));
    } else {
      openNotification("Error occur while connecting the github", false);
    }
  }
  return (
    <>
      <center>
        {contextHolder}
        <Row>
          <Col style={{ width: 500, marginRight: 20, marginTop:50 }}>
            <Card>
              <div>
                <img src={state.avatar_url} width={"50%"} className="profile" />
              </div>
              {state.id ? (
                <div className="intro">
                  <p style={{ fontSize: 30 }}>{state.name}</p>
                  <p style={{ fontSize: 18 }}>{state.bio}</p>
                  <div className="follow">
                    <p>
                      <TeamOutlined /> Followers:&nbsp; {state.followers}
                    </p>
                    &nbsp;&nbsp;
                    <p>
                      <UserSwitchOutlined /> Following:&nbsp;{state.following}
                    </p>
                  </div>
                </div>
              ) : token ? (
                <Spin tip="Loading" size="small">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Spin>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>
          </Col>
          <Col style={{ width: 700, marginTop:50 }}>
            <Card>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Github Profile" key="1">
                  {state.id ? (
                    <div className="GitprofileInfo">
                      Username: {state.username}
                      <br />
                      ID: {state.id}
                      <br />
                      Name: {state.name}
                      <br />
                      Email: {state.email}
                      <br />
                      Company: {state.company}
                      <br />
                      Region: East China 1
                      <br />
                    </div>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Existing token" key="2">
                  <div className="gitProfileSettings">
                    {state.id ? (
                      <Form>
                        <Form.Item
                          label="Github Token"
                          rules={[{ required: true }]}
                        >
                          <Input
                            onChange={(e) => setToken(e.target.value)}
                            disabled={disabled ? true : false}
                            // value={tokenState.token? tokenState.token:null}
                            defaultValue={tokenState.token}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Github Username"
                          rules={[{ required: true }]}
                        >
                          <Input
                            onChange={(e) => setUsername(e.target.value)}
                            defaultValue={tokenState.username}
                            disabled={disabled ? true : false}
                          />
                        </Form.Item>
                      </Form>
                    ) : (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Add / Update Token" key="3">
                  <div className="gitProfileSettings">
                    <Form>
                      <Form.Item
                        label="Github Token"
                        rules={[{ required: true }]}
                      >
                        <Input.Password
                          onChange={(e) => setToken(e.target.value)}

                          // disabled={disabled? true:false}
                          // value={tokenState.token? tokenState.token:null}
                          //  defaultValue={tokenState.token}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Github Username"
                        rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) => setUsername(e.target.value)}
                          // defaultValue={tokenState.username}
                          // disabled={disabled? true:false}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => {
                            GetGithubDetails(token, username);
                          }}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </center>
    </>
  );
}
