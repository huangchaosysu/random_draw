import React from 'react';
import { Button, Divider, Select, Row } from 'antd';
import { connect } from 'umi';
import styles from './index.css';

class Roll extends React.Component {
  state = {
    org: {},
    selected: [],
    randomName: '路人甲',
    interval: null,
    randStart: 0,
  };

  handleOrgChange = org => {
    console.log(org);
    const orgs = this.props.data;
    let i;
    for (i = 0; i < orgs.length; i++) {
      if (org == orgs[i].orgName) {
        this.setState({
          org: orgs[i],
          randomName: orgs[i].staff[0],
        });
        break;
      }
    }
  };

  roll = () => {
    const { randStart, org } = this.state;
    this.setState({
      randStart: (randStart + 1) % org.staff.length,
      randomName: org.staff[randStart],
    });
  };

  startRoll = () => {
    let i = setInterval(this.roll, 50);
    this.setState({
      interval: i,
    });
  };

  stopRoll = () => {
    const { selected, org } = this.state;
    if (org.targets && org.targets.length) {
      selected.push(this.state.org.orgName + '_' + org.targets[0]);
      this.state.interval && clearInterval(this.state.interval);
      this.setState({
        interval: null,
        selected: selected,
        randomName: org.targets[0],
      });
    } else {
      selected.push(this.state.org.orgName + '_' + this.state.randomName);
      this.state.interval && clearInterval(this.state.interval);
      this.setState({
        interval: null,
        selected: selected,
      });
    }
  };

  render() {
    console.log('props in roll', this.state);
    return (
      <div className={styles.roll}>
        <Row justify={'center'}>
          <h3>{this.props.title}</h3>
        </Row>
        <div style={{ height: '24px' }}></div>
        <Row justify="center">
          <div>
            {this.props.data && this.props.data.length && (
              <Select
                style={{ width: 200 }}
                placeholder="选择单位"
                onChange={this.handleOrgChange}
              >
                {this.props.data.map(org => (
                  <Select.Option value={org.orgName} key={org.orgName}>
                    {org.orgName}
                  </Select.Option>
                ))}
              </Select>
            )}

            <Row className={styles.panel} justify="center" align="middle">
              <span>{this.state.randomName}</span>
            </Row>
            <Row>
              {!this.state.interval && (
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={this.startRoll}
                >
                  开始
                </Button>
              )}

              {this.state.interval && (
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={this.stopRoll}
                >
                  停止
                </Button>
              )}
            </Row>
          </div>
          <div style={{ width: '60px' }}></div>
          <div className={styles.right}>
            <p>抽签结果</p>
            {this.state.selected &&
              this.state.selected.length &&
              this.state.selected.map(item => (
                <p key={item}>
                  <span>{item}</span>
                </p>
              ))}
          </div>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.roll.data, title: state.roll.title };
}

export default connect(mapStateToProps)(Roll);
