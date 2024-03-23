import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome';
import See from './components/see';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Router>
          <Routes>
            <Route exact path="/" Component={Welcome} />
            <Route path="/see/:id?" Component={See} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
