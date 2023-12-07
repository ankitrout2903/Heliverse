import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import Users from './pages/Users';
import Table from './pages/Table';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route path="/table" component={Table} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
