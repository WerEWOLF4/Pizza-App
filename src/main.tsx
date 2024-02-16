import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart';
import { Erorr } from './pages/Erorr/Erorr';
import { Layout } from './layout/Menu/Layout.Menu';
import { Product } from './pages/Product/Product';
import axios from 'axios';
import { PREFIX } from './helpers/API';
import { AuthLayout } from './layout/Auth/AuthLayout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { RequireAuth } from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Success } from './pages/Succes/Succes';

const Menu = lazy(() => import("./pages/Menu/Menu"))

const router = createBrowserRouter ([
  {
    path: "/",
    element: <RequireAuth> <Layout/> </RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/product/:id",
        element: <Product/>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
             setTimeout(() => {
            axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e))
             }, 2000);
          })
        });
      }
    }
   ]
  },
  {
   path: "/auth",
   element: <AuthLayout />,
   children: [
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    }
   ]
 },
  {
    path: "*",
    element: <Erorr/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
