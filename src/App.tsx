import { Link, Route, Routes } from 'react-router-dom';
import Dogs from './pages/Dogs/Dogs';
import Form from './pages/Form/Form';

function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1>Hello! 👋</h1>
      <p>Where should we go?</p>

      <ul className="pt-4">
        <ol>
          <Link to="form">Form page</Link>
        </ol>
        <ol>
          <Link to="dogs">Dogs page</Link>
        </ol>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/form/success" element={<p>Success!</p>} />
      <Route path="/dogs" element={<Dogs />} />
    </Routes>
  );
}

export default App;
