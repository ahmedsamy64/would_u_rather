import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';



class UserDashBoard extends Component {
  constructor(props) {
    super()
    this.state = {
      CurrentTab: "1"
    }
  }


  toggleCurrentTab(tab) {
    if (this.state.CurrentTab !== tab) {
      this.setState({
        CurrentTab: tab
      });
    }
  }

  render() {
    const { unAnsweredQs, AnsweredQs } = this.props;
    return (
      <div>

        <Nav tabs>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.CurrentTab === '2' })}
              onClick={() => { this.toggleCurrentTab('2'); }}
            >
              Answered
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.CurrentTab === '1' })}
              onClick={() => { this.toggleCurrentTab('1'); }}
            >
              Unanswered
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.CurrentTab}>

          <TabPane tabId="2">
            <Row>
              {AnsweredQs.map(qid =>
                <Col key={qid} sm="5" md="3">
                  <Question id={qid} />
                </Col>
              )}
            </Row>
          </TabPane>

          <TabPane tabId="1">
            <Row>
              {unAnsweredQs.map(qid =>
                <Col key={qid} sm="5" md="3">
                  <Question id={qid} />
                </Col>
              )}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}


function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const AnsweredQs = Object.keys(user.answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unAnsweredQs: Object.keys(questions).filter(qid => !AnsweredQs.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    AnsweredQs
  }
}

export default connect(mapStateToProps)(UserDashBoard)
