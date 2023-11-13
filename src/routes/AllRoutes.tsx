import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Throttling } from '../components';
// import PageNotFound from '../pages';
import ProtectedRoutes from './ProtectedRoutes';
import LoginProtectedRoute from './LoginProtectedRoute';
import { Tasks } from '../pages';

const TaskDetails = lazy(() => import('../pages/Tasks/TaskDetails'));
const UserDetails = lazy(() => import('../pages/UserDetails'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const AllRoutes = () => {
  const accessToken = JSON.parse(
    sessionStorage.getItem('accessToken') || 'null'
  );

  return (
    <div className='dark:bg-black dark:bg-opacity-80'>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route path='' element={<Tasks />} />
          <Route path='task/:id' element={<TaskDetails />} />
          <Route path='demo' element={<Throttling />} />{' '}
          {/* Added for testing purpose, not related the current application */}
          <Route path='user' element={<UserDetails />} />
        </Route>
        <Route
          path='/login'
          element={
            <LoginProtectedRoute>
              <Login />
            </LoginProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <LoginProtectedRoute>
              <Register />
            </LoginProtectedRoute>
          }
        />
        {/* <Route path='*' element={<PageNotFound />} /> */}
        <Route
          path='*'
          element={
            accessToken ? (
              <Navigate to='/dashboard' replace={true} />
            ) : (
              <Navigate to='/login' replace={true} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
