import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home";
import CreateRecipe from "./pages/createrecipe";
import Statistika from "./pages/statistika";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Datailes from "./pages/detailes";
import Card from "./pages/card";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/createrecipe",
          element: <CreateRecipe/>,
        },
        {
          path: "/statistika",
          element: <Statistika/>,
        },
        {
          path: ":id",
          element: <Datailes/>,
        },
        {
          path: "/card",
          element: <Card/>,
        }
      ]
    },
    {
      path: "*",
      element: <div>404</div>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
