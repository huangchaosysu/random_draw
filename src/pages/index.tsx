import React from 'react';
import styles from './index.less';
import { Button, Col, Row, Input } from 'antd';
import { history } from 'umi';

export default class Index extends React.Component {
  state = {
    username: '',
    password: '',
  };

  submit = () => {
    const { username, password } = this.state;
    if (username !== 'admin' || password != 'admin123') {
      alert('用户名或密码错误');
    } else {
      history.push('/config');
    }
  };

  handleUnameChange = (e: any) => {
    console.log(e.target);
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e: any) => {
    console.log(e.target);
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className={styles.normal}>
        <Row>
          <Col xs={8}>
            <span>用户名: </span>
          </Col>
          <Col xs={16}>
            <Input
              onChange={this.handleUnameChange}
              placeholder={'用户名'}
            ></Input>
          </Col>
        </Row>
        <div style={{ height: '24px' }}></div>
        <Row>
          <Col xs={8}>
            <span>密码: </span>
          </Col>
          <Col xs={16}>
            <Input type="password" onChange={this.handlePasswordChange}></Input>
          </Col>
        </Row>
        <div style={{ height: '24px' }}></div>
        <Row justify="end">
          <Button onClick={this.submit}>登录</Button>
        </Row>
      </div>
    );
  }
}
