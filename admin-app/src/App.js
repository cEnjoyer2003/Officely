import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import NewOfficeForm from './Components/NewOfficeForm';
import OfficesPage from './Components/OfficesPage';
import BookingsPage from './Components/BookingsPage';
import UsersPage from './Components/UsersPage';
import Login from './Components/Login';
import Register from './Components/Register';
import 'bulma/css/bulma.min.css';
import { AdminProvider } from './Components/Context';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: "/main",
    element: <Header />,
    children: [
      {
        path: "offices",
        children: [
          {
            index: true,
            element: <OfficesPage />
          },
          {
            path: "new",
            element: <NewOfficeForm />
          },
          {
            path: "edit",
            element: <NewOfficeForm />
          },
        ],
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <UsersPage />
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <p>error</p>,
  },
]);

function App() {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
}

export default App;
