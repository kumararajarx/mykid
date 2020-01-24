import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from './routes';
import routes_lite from './routes_lite';

import withTracker from './withTracker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';

import Login from './views/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: JSON.parse(localStorage.getItem('userData')) };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.userData == null ? (
          <Login />
        ) : (
          <Router basename={process.env.REACT_APP_BASENAME || ''}>
            {this.state.userData.position == 'VOLUNTEER' ? (
              <div>
                {routes_lite.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={withTracker(props => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      })}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={withTracker(props => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      })}
                    />
                  );
                })}
              </div>
            )}
          </Router>
        )}
      </React.Fragment>
    );
  }
}

export default App;
