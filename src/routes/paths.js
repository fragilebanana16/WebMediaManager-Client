// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "home"),
    videos_app: path(ROOTS_DASHBOARD, "videos"),
    admin_app: path(ROOTS_DASHBOARD, "managment"),
  },
};
