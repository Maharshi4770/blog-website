import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import EditPost from '../components/EditPost';
import ViewPost from '../components/ViewPost';
import PreviewPosts from '../components/PreviewPosts';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preview" element={<PreviewPosts />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/view/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
