import React from 'react';
import HelloWorld from './pages/HelloWorld';
import Add from './pages/add/AddInput';
import ConfigurationTable from './pages/add/ConfigurationTable'

// @ts-ignore
import { HashRouter as Router, Route, Switch} from 'react-router-dom'


const App = () => {
  return <div>
    <Router>
    <Switch>
      <Route exact path='/' component={HelloWorld}></Route>
      <Route exact path='/Add' component={Add}></Route>
      <Route exact path='/ConfigurationTable' component={ConfigurationTable}></Route>
    </Switch>
  </Router>
  </div>

};

export default App;
