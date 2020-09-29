import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Question extends React.Component {

  constuctor() {
    this.loadQuestionDetails = this.routeChange.bind(this);
  }
  GetQuestionDetails(e, questionId) {
    let path = `/questions/` + questionId;
    this.props.history.push(path);
  }
  render() {
    const { question, auth } = this.props;
    return (
      <div onClick={(e) => this.GetQuestionDetails(e, question.id)}>
        <div>
          <h3>Would You Rather</h3>
          <ul>
            <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>{question.optionOne.text}</li>
            <li className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>{question.optionTwo.text}</li>
          </ul>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    auth: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
