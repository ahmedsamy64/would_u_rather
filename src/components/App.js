import React,  { Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData }  from '../actions/shared'
import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';


class App extends React.Component {
  componentDidMount(){
    this.props.handleInitialData()
  }
  render() {
    const { IsntLoggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div>
            <NavBar/>
            <Routes notLoggedIn={IsntLoggedIn}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}


function mapStateToProps ({ authedUser }) {
  return {
    IsntLoggedIn: authedUser === null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)