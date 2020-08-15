import React from 'react';
import { Button, Input, Select, Row, Form, Divider } from 'antd';
import { connect } from 'umi';
import styles from './index.css';
import { history } from 'umi';

class Config extends React.Component {
  state = {
    data: [],
    orgName: '',
    staff: '',
    targetStaff: '',
  };

  handleOrgNameChange = e => {
    console.log(e.target.value);
    this.setState({
      orgName: e.target.value,
    });
  };

  handleStaffChange = e => {
    this.setState({
      staff: e.target.value,
    });
  };

  handleTargetStaffChange = e => {
    this.setState({
      targetStaff: e.target.value,
    });
  };

  handleSubmit = () => {
    const { data } = this.state;
    const staffStr = this.state.staff;
    var ss = [];
    if (staffStr && staffStr.length) {
      ss = staffStr.split(',').map(s => s.trim());
    }
    console.log(ss);
    let tgs = [];
    if (this.state.targetStaff.length) {
      tgs = [this.state.targetStaff];
    }

    let org = {
      orgName: this.state.orgName,
      staff: ss,
      targets: tgs,
    };

    const newData = data.concat([org]);
    this.setState({
      data: newData,
    });
  };

  startRoll = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'roll/config',
      payload: this.state.data,
    }).then(() => {
      history.push('/roll');
    });
  };

  render() {
    console.log('------------', this.state);
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    return (
      <div className={styles.main}>
        <Form {...layout} name="basic">
          <Form.Item
            label="单位名"
            name="orgName"
            rules={[{ required: true, message: '输入单位名称' }]}
          >
            <Input placeholder="单位名" onChange={this.handleOrgNameChange} />
          </Form.Item>

          <Form.Item
            label="雇员"
            name="staffs"
            rules={[{ required: true, message: '请输入人名' }]}
          >
            <Input
              type="text"
              placeholder={'填写人名， 多人用逗号隔开'}
              onChange={this.handleStaffChange}
            />
          </Form.Item>

          <Form.Item label="内定人选" name="targetStaff">
            <Input
              type="text"
              placeholder={'填写人名， 多人用逗号隔开'}
              onChange={this.handleTargetStaffChange}
            />
          </Form.Item>
          <Row>
            <Button type="primary" onClick={this.handleSubmit}>
              添加
            </Button>
            <div style={{ width: '12px' }}></div>
            <Button type="primary" onClick={this.startRoll}>
              开始抽签
            </Button>
          </Row>
        </Form>
        <Divider></Divider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.roll.data, title: state.roll.title };
}

export default connect(mapStateToProps)(Config);
