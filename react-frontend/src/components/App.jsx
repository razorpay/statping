import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ServicesPage from "./ServicesPage";

const App = () => {
  console.log(process.env.REACT_APP_API_ENDPOINT);
  console.log(process.env.NODE_ENV);
  return (
    <Switch>
      <Route exact path="/" component={ServicesPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default App;
