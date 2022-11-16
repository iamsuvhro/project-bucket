import { Button, Checkbox, Form, Input, Card } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import "antd/dist/antd.css";
import userlogin from "../../services/user";
import { bindActionCreators } from "redux";
import { actions } from "../../state/Auth";
import { useDispatch } from "react-redux";
// import userlogin from "../../services/user";

// Initializing actions
// const dispatch = useDispatch();
// const {login} = bindActionCreators(actions, dispatch)




export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  return (
    
    <div className="site-layout-content">
      <Card title="Login" style={{
        marginTop:'10%',
        width:'50%', 
        left:'25%',
        right:'25%'
        
        }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width:'50%',
            marginRight:'500'
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            
          >
            <Input  onChange={e => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password  onChange={e => setPassword(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={() => userlogin(username,password)}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
