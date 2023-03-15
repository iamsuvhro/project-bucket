import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Empty,
  Dropdown,
  Space,
  Popconfirm,
  message,
  Form,
  Input,
  Skeleton,
  Button,
  Pagination,
  Divider,
  Popover,
} from "antd";
import { Menu, Spin, Typography, List, Tag, Progress } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { formatDistance } from "date-fns";
import { getGitRepoIssues } from "../../services/github";
import { useSelector, useDispatch } from "react-redux";
import { render } from "react-dom";

export default function FeedCard(cardData) {
  const { Title, Paragraph, Text, Link } = Typography;

  const confirm = (e) => {
    console.log(e);
    message.success("Card deleted successfully");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Canceled");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <>Edit</>,
          icon: <EditOutlined />,
        },
        {
          key: "2",
          label: (
            <Popconfirm
              title="Are you sure to delete this card?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <a target="_blank" href="#">
                Delete
              </a>
            </Popconfirm>
          ),
          icon: <DeleteOutlined />,
        },
      ]}
    />
  );

  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function loader() {
    await timeout(1000);
    setLoading(false);
    return loading;
  }

  // Getting data from redux state
  const gitUser = useSelector((state) => state.githubProfile);
  const gitConfig = useSelector((state) => state.githubToken);
  // Defining all of useState
  const [gitIssue, setgitIssue] = useState();
  // const [commit, setCommit] = useState({});

  // Defining a function for pulling all commits

  const [commit, setCommit] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    async function fetchCommitData() {
      const repo = cardData.data.repository;
      const username = gitUser.username;

      let res = await fetch(
        "https://api.github.com/repos/" + username + "/" + repo + "/commits"
      );
      const data = await res.json();

      setCommit(data);
    }

    fetchCommitData();
  }, []); // pass empty dependency array

  useEffect(() => {
    async function fetchRepositoriesData() {
      const repo = cardData.data.repository;
      const username = gitUser.username;

      let res = await fetch(
        "https://api.github.com/repos/" + username + "/" + repo
      );
      const data = await res.json();

      setRepository(data);
    }

    fetchRepositoriesData();
  }, []); // pass empty dependency array

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayCommits = commit.slice(startIndex, endIndex);
  return (
    <>
      <Card
        title={<Tag color="blue">{cardData.data.project_title}</Tag>}
        bordered={false}
        style={{
          width: "100%",
          marginTop: 50,
          boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
        }}
        className=""
        extra={
          <Dropdown overlay={menu}>
            <MoreOutlined style={{ color: "black", fontSize: "18px" }} />
          </Dropdown>
        }>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Project details" key="1">
            {cardData.data.project_title ? (
              <>
                <Title level={2}>{cardData.data.project_title}</Title>
                <Paragraph>{cardData.data.project_drescriptions}</Paragraph>
              </>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Tabs.TabPane>
          {/* --------------------Repo section -------------------------*/}

          <Tabs.TabPane tab="Repository" key="2">
            {repository ? (
              <>
                <div>
                  <h4 style={{ margin: 0 }}>Repository Details</h4>
                  <i style={{ marginBottom: "40px", fontSize: 14 }}>
                    Created at{repository.created_at}
                  </i>

                  <h1 style={{ fontSize: 24, marginTop: 20, marginBottom: 0 }}>
                    {repository.name}
                  </h1>
                  <i style={{ margin: 4, fontFamily: "serif", fontSize: 14 }}>
                    <GithubOutlined />{" "}
                    <a href={repository.html_url}>{repository.full_name}</a>
                  </i>
                  <p style={{ marginTop: 10 }}>{repository.description}</p>
                  <p>Language: {repository.language}</p>
                </div>
              </>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Tabs.TabPane>

          {/* -------------------- Commit section ---------------------- */}
          <Tabs.TabPane tab="Commits" key="3">
            {displayCommits.length > 0 ? (
              displayCommits.map((c) => (
                <div key={c.sha}>
                  <h3>{c.commit.message}</h3>
                  <div style={{ display: "flex", padding: 0, marginTop: -20 }}>
                    <img
                      src={c.author.avatar_url}
                      style={{ width: "20px", height: "20px", marginTop: 14 }}
                    />
                    <p>{c.commit.author.name} </p>
                    <p style={{ marginLeft: 2 }}>
                      (
                      {formatDistance(
                        new Date(c.commit.author.date),
                        new Date()
                      )}
                      )
                    </p>
                  </div>
                  <Divider style={{ margin: 0 }} />
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            <br></br>
            <center>
              <Pagination
                current={page}
                pageSize={perPage}
                total={commit.length}
                onChange={(page, pageSize) => {
                  setPage(page);
                  setPerPage(pageSize);
                }}
              />
            </center>
          </Tabs.TabPane>

          {/* // ----------------- Issue area ------------------------- */}
          <Tabs.TabPane tab="Issues" key="4">
            {/* {async () => {
              const response = await getGitRepoIssues(
                gitUser.username,
                gitConfig.token,
                "repository"
              );
              response.status ? setgitIssue(response.status):null
            }} */}
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>

          {/* -------------------- Todo section ---------------------- */}
        </Tabs>
      </Card>
    </>
  );
}
