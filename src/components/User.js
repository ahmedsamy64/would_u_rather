import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class User extends Component {
  render() {

    const { CurrentUser } = this.props;
    return (


      <Fragment>
        <img src={CurrentUser.avatarURL} className='avatar' alt={`Avatar of ${CurrentUser.name}`} />

        <span>{CurrentUser.name}</span>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    CurrentUser: users[id]
  }
}


export default connect(mapStateToProps)(User)
