import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/global/Header';
import PageRender from './PageRender';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
