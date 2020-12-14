import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Fibo from './Fibo';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
      <h1>Welcome</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/other-page">Other Page</Link>
      </nav>

      <Switch>
        <Route path="/other-page">
          <OtherPage />
        </Route>
        <Route path="/">
          <Fibo/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
