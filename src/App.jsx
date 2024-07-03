//rrd imports
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";

//pages
import { Create, Home, Login, Register } from "./pages";

//layouts
import MainLayout from "./layout/MainLayout";

//redux
import { useSelector, useDispatch } from "react-redux";
import { login, isAuthChange } from "./app/userSlice";

//components
import { ProtectedRoutes } from "./components";

//actions
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as CreateAction } from "./pages/Create";

//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/fireBaseConfig";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthState } = useSelector((state) => state.user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);
  return <>{isAuthState && <RouterProvider router={routes} />}</>;
}

export default App;
