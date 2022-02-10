import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Alert } from './components/alert/Alert';
import Header from './components/global/Header';
import PageRender from './PageRender';
import { refreshToken } from './redux/actions/authAction';
import { getHomeBlogs } from './redux/actions/blogAction';
import { getCategories } from './redux/actions/categoryAction';

import io from 'socket.io-client';

import SocketClient from './SocketClient';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getCategories());
    dispatch(getHomeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({ type: 'SOCKET', payload: socket });
    return () => { socket.close() }
  }, [dispatch]);

  return (
    <div className="container">
      <SocketClient />
      <Router>
        <Header />
        <Alert />
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
