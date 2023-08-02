import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup';
import Welcome from '../pages/Welcome';
import Mypage from '../pages/Mypage';
const RouterInfo = [
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/auth",
    element: <Login/>,
  },
  {
    path: "/mypage",
    element: <Mypage/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/welcome",
    element: <Welcome/>
  }
];

export default RouterInfo;