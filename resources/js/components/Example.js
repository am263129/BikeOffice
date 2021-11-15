import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import HomePage from './pages/user/home';
import LandingPage from './pages/landing';
import SigninPage from './pages/signin';
import SignUpPage from './pages/signup';
import PercursosPage from './pages/user/percursos';
import PercursoPage from './pages/user/Percurso';

function Example() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/percursos" element={<PercursosPage />} />
          <Route path="/percurso" element={<PercursoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Example;

if (document.getElementById('root')) {
  ReactDOM.render(<Example />, document.getElementById('root'));
}
