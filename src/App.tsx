import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SalesCRM from './pages/SalesCRM';
import ContentCRM from './pages/ContentCRM';
import BudgetTracker from './pages/BudgetTracker';
import { useAuthStore } from './store/authStore';


function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/auth" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<SalesCRM />} />
          <Route path="content" element={<ContentCRM />} />
          <Route path="budget" element={<BudgetTracker />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;