import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Error from "./Error"
import UserDashboard from './UserDashboard'
import LeaderBoard from './LeaderBoard'
import QuestionDetails from "./QuestionDetails"
import Logout from './Logout'
import Login from "./Login";
import NewQuestion from "./NewQuestion";




function Routes(props) {
  return <div className="container">
    <Switch>
      {
        props.notLoggedIn ? <Route path='/' exact component={Login} /> :
          <Fragment>
            <Route path='/' exact component={UserDashboard} />
            <Route path='/leaderboard' exact component={LeaderBoard} />
            <Route path='/add' component={NewQuestion} />
            <Route path="/questions/:id" component={QuestionDetails} />
            <Route exact path='/logout' component={Logout} />
          </Fragment>
      }
      <Route component={Error} />
    </Switch>
  </div>;
}

export default Routes;