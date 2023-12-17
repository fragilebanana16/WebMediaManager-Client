import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import ChatDashboardLayout from "../layouts/chat";

// config
import { DEFAULT_PATH,DEFAULT_VIDEOS_PATH, DEFAULT_ADMIN_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";
import VideosLayout from "../layouts/videos";
import AdminDashboardLayout from "../layouts/admin";
import MusicDashboard from "../layouts/music";
import GameDashboard from "../layouts/game";
import FilesLayout from "../layouts/files";
import HomeLayout from "../layouts/home";
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <HomeLayout/>, 
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "home", element: <HomeApp /> },
        { path: "videos", element: <VideosApp /> },
        { path: "managment", element: <AdminHome /> },
      ],
    },
    {
      path: "/auth",
      element: <MainLayout/>,
      children: [
        { element: <LoginPage />, path:"login" },
        { element: <RegisterPage />, path:"register" },
        { element: <ResetPasswordPage />, path:"reset-password" },
        { element: <NewPasswordPage />, path:"new-password" },
      ],
    },
    // http://localhost:3000/netflix/videos
    {
      path: "/netflix",
      element: <VideosLayout />,
      children: [
        // /netflix default to /netflix/videos
        { element: <Navigate to={DEFAULT_VIDEOS_PATH} replace />, index: true },
        { path: "watch", element: <Watch /> },
        { path: "videos", element: <VideosApp /> },
      ],
    },
    {
      path: "/files",
      element: <FilesLayout/>, 
      children: [
        { element: <Navigate to="manage" replace />, index: true },
        { path: "manage", element: <FilesApp /> },
      ],
    },

    {
      path: "/admin",
      element: <AdminDashboardLayout/>, 
      children: [
        // /admin default to /admin/managment
        { element: <Navigate to="manage" replace />, index: true },
        { path: "manage", element: <AdminHome/> },
      ],
    },

    {
      path: "/music",
      element: <MusicDashboard/>, 
      children: [
        // /admin default to /admin/managment
        { element: <Navigate to="musicHome" replace />, index: true },
        { path: "musicHome", element: <MusicApp /> },
        { path: "chordsTable", element: <ChordsTable /> },
      ],
    },

    {
      path: "/game",
      element: <GameDashboard/>, 
      children: [
        // /admin default to /admin/managment
        { element: <Navigate to="gameHome" replace />, index: true },
        { path: "gameHome", element: <GameApp /> },
      ],
    },

    // place the outlet in DashboardLayout, and then only the children will be rerendered
    {
      path: "/chat",
      element: <ChatDashboardLayout />,
      children: [
        { element: <Navigate to="app" replace />, index: true },
        { path: "app", element: <ChatApp /> },
        { path: "friends", element: <Friends /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "404", element: <Page404 /> },
        // { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const HomeApp = Loadable(
  lazy(() => import("../pages/dashboard/HomeApp")),
);

const ChatApp = Loadable(
  lazy(() => import("../pages/dashboard/ChatApp")),
);
const VideosApp = Loadable(
  lazy(() => import("../pages/dashboard/VideosApp")),
);

const FilesApp = Loadable(
  lazy(() => import("../pages/dashboard/FilesApp")),
);

const AdminHome = Loadable(
  lazy(() => import("../pages/Admin/AdminHome")),
);

const MusicApp = Loadable(
  lazy(() => import("../pages/dashboard/MusicApp")),
);

const GameApp = Loadable(
  lazy(() => import("../pages/dashboard/GameApp")),
);

const Watch = Loadable(
  lazy(() => import("../pages/dashboard/Watch")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);

const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);

const Friends = Loadable(
  lazy(() => import("../pages/dashboard/Friends")),
);

const ChordsTable = Loadable(
  lazy(() => import("../pages/dashboard/ChordsTable")),
);

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);

const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);

const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);

const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
