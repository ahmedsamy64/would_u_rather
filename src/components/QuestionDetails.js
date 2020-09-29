import React from 'react';
import { Input, Form, Row, Button, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import User from './User';
import { handleAnswer } from '../actions/shared';

class QuestionDetails extends React.Component {
  state = {
    selectedOption: ''
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const { question, questionAuthor, answer, total, perc1, perc2 } = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <div>
          <h4>
            <User id={questionAuthor.id} />
          </h4>
          <div>
            <h5>Would You Rather</h5>
            {answer ?
              <div>
                <FormGroup>
                  <FormGroup check disabled>
                    <Label check>
                      <Input type="radio" checked={answer === "optionOne"} readOnly />{' '}
                      {question.optionOne.text}
                    </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Label check>
                      <Input type="radio" checked={answer === "optionTwo"} readOnly />{' '}
                      {question.optionTwo.text}
                    </Label>
                  </FormGroup>
                </FormGroup>
                <div className="progress">
                  <div className="progress-one" style={{ width: `${perc1}%` }}>{`${perc1}%`}</div>
                  <div className="progress-two" style={{ width: `${perc2}%` }}>{`${perc2}%`}</div>
                </div>
                <div className="total">
                  Total number of votes: {total}
                </div>
              </div> :
              <Form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                  <FormGroup >
                    <Label >
                      <Input type="radio" name="radio1" value="optionOne" onChange={this.radioSelected} />{' '}
                      {question.optionOne.text}
                    </Label>
                  </FormGroup>
                  <FormGroup >
                    <Label >
                      <Input type="radio" name="radio1" value="optionTwo" onChange={this.radioSelected} />{' '}
                      {question.optionTwo.text}
                    </Label>
                  </FormGroup>
                </FormGroup>
                <Button disabled={selectedOption === ''}>Submit</Button>
              </Form>
            }
          </div>
        </div>

      </Row>
    );
  }
}


function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}


function mapStateToProps({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, perc1, perc2, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id]
  }


  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  perc1 = financial((question.optionOne.votes.length / total) * 100);
  perc2 = financial((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    perc1,
    perc2
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
