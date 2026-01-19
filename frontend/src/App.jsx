import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/common/Loader';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Generator = lazy(() => import('./pages/Generator'));
const Result = lazy(() => import('./pages/Result'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader size="xl" text="Loading..." />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
