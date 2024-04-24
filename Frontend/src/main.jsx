import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

//Pages, loaders and actions
import Home, {loader as homeLoader} from './pages/Home'

import Login, {action as loginAction} from './pages/auth/Login'
import Signup, { action as signupAction} from './pages/auth/Signup'
import ForgotPassword, {action as forgotPasswordAction} from './pages/auth/ForgotPassword'
import ResetPassword, {loader as resetPasswordLoader, action as resetPasswordAction} from './pages/auth/ResetPassword'

import Index, {loader as indexLoader} from './pages/app/Index'
import Perfil, {loader as perfilLoader} from './pages/app/Perfil'
import Recompensas from './pages/app/Recompensas'

import Inicio from './pages/maquina/Inicio'
import Reciclando, {action as reciclandoAction} from './pages/maquina/Reciclando';
import Recompensa, {loader as recompensaLoader} from './pages/maquina/Recompensa';
import Canjear, {loader as canjearLoader} from './pages/maquina/Canjear';

import ErrorPage from './pages/ErrorPage'

//Components
import AuthLayout, {loader as authLayoutLoader} from './components/AuthLayout'
import AppLayout, {loader as appLayoutLoader} from './components/AppLayout';
import MaquinaLayout from './components/MaquinaLayout';

const router = createBrowserRouter([
  {
    index: true,
    element: <Home/>,
    loader: homeLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    loader: authLayoutLoader,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "signup",
        element: <Signup />,
        action: signupAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
        loader: resetPasswordLoader,
        action: resetPasswordAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/app/",
    element: <AppLayout />,
    loader: appLayoutLoader,
    errorElement: <ErrorPage />,
    children : [
      {
        index: true,
        element: <Index />,
        loader: indexLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "perfil",
        element: <Perfil />,
        loader: perfilLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "recompensas",
        element: <Recompensas />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "/maquina",
    element: <MaquinaLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Inicio />,
        errorElement: <ErrorPage />,
      },
      {
        path: "reciclando",
        element: <Reciclando />,
        action: reciclandoAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "recompensa/:codigo",
        element: <Recompensa />,
        loader: recompensaLoader,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: 'canjear/:codigo',
    element: <Canjear />,
    loader: canjearLoader,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
