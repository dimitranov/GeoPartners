import React from "react";
import { Link, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import { useAppSession } from "./hooks/useAppSession";
import { mainRouteConfig } from "./routes/main";

function App() {
  useAppSession();

  return (
    <div className="App">
      <Header />

      <div className="content-wrapper">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/private">Private</Link>
        </nav>

        <Switch>
          {mainRouteConfig.map((rt) => (
            <rt.routeType exact key={rt.path} path={rt.path}>
              <rt.component />
            </rt.routeType>
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default App;
