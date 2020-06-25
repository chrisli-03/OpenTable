import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './reset.scss';
import './App.scss';

import Spinner from './components/Spinner/Spinner'

const SelectCity = React.lazy(() => import(/* webpackChunkName: "views/SelectCity" */ './views/SelectCity/SelectCity'));
const RestaurantList = React.lazy(() => import(/* webpackChunkName: "views/RestaurantList" */ './views/RestaurantList/Restaurant'));

function App() {
  return (
    <main className="App">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/' exact component={SelectCity} />
            <Route path='/:city' component={RestaurantList} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default App;
