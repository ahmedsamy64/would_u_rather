import React from "react"
import { connect } from "react-redux"


function Leaderboard(props) {
  const { users } = props;
  return (
    <div>
      

        <tr>
          <th style={{width:100}}>Rank</th>
          <th style={{width:100}}>Profile</th>
          <th style={{width:100}}>User</th>
          <th style={{width:100}}>Asked</th>
          <th style={{width:100}}>Answered</th>
        </tr>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td><img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`} /></td>
              <td>{user.name}</td>
              <td>{user.questions.length}</td>
              <td>{Object.keys(user.answers).length}</td>
            </tr>
          ))}
        </tbody>
      
    </div>
  )
}


const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  }
};

export default connect(mapStateToProps)(Leaderboard)
