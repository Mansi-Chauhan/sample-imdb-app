import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { CFade } from '@coreui/react'

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./App.css";



// routes config
import routes from './routes'
import Page404 from './components/page/Page404'

const store = configureStore();


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Suspense fallback={loading}>
            <Routes>
              {routes.map((route, idx) => {
                console.log('route', route)
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={route.component}
                  />
                ) : (
                  route.component && route.path ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={true}
                      name={"Page404"}
                      component={Page404} />) : null)
              })}
            </Routes>
          </React.Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;