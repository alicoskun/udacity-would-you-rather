import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function PrivateRoute({ children, ...rest }) {
  console.log("🚀 ~ file: ProtectedRoute.js ~ line 2 ~ PrivateRoute ~ children", rest)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return rest.authedUser !== '' ? (
          children
        ) : (
          <Redirect to={{pathname: '/login', state: { from: location }}}
          />
        );
      }}
    />
  );
}


function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(PrivateRoute);
