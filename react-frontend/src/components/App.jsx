import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ServicesPage from "./ServicesPage";

const App = () => {
  console.log(`Application running on ${process.env.NODE_ENV} mode.`);
  return (
    <Switch>
      <Route exact path="/" component={ServicesPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default App;
