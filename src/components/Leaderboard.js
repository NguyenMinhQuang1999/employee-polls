import { connect } from "react-redux";
const Leaderboard = ({ users }) => {

    return (
      <div className="container">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Users</th>
              <th scope="col">Answered</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.avatarURL}
                    alt="Avatar"
                    className="avatar-leaderboard"
                  />
                  {user.name}
                  <br />
                  <span className="avatar-leaderboard">{user.name}</span>
                </td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  ),
});

export default connect(mapStateToProps)(Leaderboard);
