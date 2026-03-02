
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './component/Blog';
import Blog2 from './component/Blog2';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog2" element={<Blog2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

