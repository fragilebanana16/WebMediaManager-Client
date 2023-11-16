// routes
import Router from "./routes";
import React, { useEffect } from "react";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "./redux/slices/app";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const vertical = "top";
const horizontal = "center";

function App() {
  const dispatch = useDispatch();

  const { severity, message, open } = useSelector(
    (state) => state.app.snackbar
  );

  return (
    <>
    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings>
    </ThemeProvider>

    {message && open ? (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        key={vertical + horizontal}
        onClose={() => {
          console.log("This is clicked");
          dispatch(closeSnackBar());
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeSnackBar());
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    ) : (
      <></>
    )}
  </>
  );
}

export default App;
