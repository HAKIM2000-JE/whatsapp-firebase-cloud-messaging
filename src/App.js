import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  // const [user, setUser] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app_">
      {!user ? (
        <div className="log">
          <Login />
        </div>
      ) : (
        <div>
          <div className="header"></div>
          <div className="app">
            <div className="app_body">
              <Router>
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Sidebar />
                    <Chat />
                  </Route>

                  <Route>
                    <Sidebar />
                    <Chat />
                  </Route>
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
