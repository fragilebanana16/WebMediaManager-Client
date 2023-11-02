import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";
import { BASE_URL } from "../../config";
// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

// Reducer
export default slice.reducer;

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    // dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              // token: response.data.token,
            })
          );
        // dispatch(
        //   showSnackbar({ severity: "success", message: response.data.message })
        // );
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: false })
        // );
      })
      .catch(function (error) {
        console.log(error);
        // dispatch(showSnackbar({ severity: "error", message: error.message }));
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: true })
        // );
      });
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

        // dispatch(
        //   showSnackbar({ severity: "success", message: response.data.message })
        // );
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: false })
        // );
      })
      .catch(function (error) {
        console.log(error);
        // dispatch(showSnackbar({ severity: "error", message: error.message }));
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: true })
        // );
      });
  };
}

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    // Make API call here
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    // await axios("http://localhost:3001/auth/test", {
    //   method: "post",
    //   data: {...formValues},
    //   withCredentials: true
    // })
    
    // 20231102 原因竟然是localhost的问题，axios实例使用的是ip地址，ip和localhost区别？？？
    // wlan登录需要设置为ip，设为localhost仅为测试session，跨域session仍是个问题
    await axios.post("http://localhost:3001/auth/login",
        {
          ...formValues,
        },
        {
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json'
          }
        }
      )
      .then(function (response) {
        console.log("login response:" + response);
        if (!response || response.status !== 200) {
          dispatch(showSnackbar({ severity: "error", message: "Unknow Error?" }));
          return;
        }

        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
            // user_id: response.data.user_id,
          })
        );

        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message})
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log("login error" + error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        // dispatch(
        //   slice.actions.updateIsLoading({ isLoading: false, error: true })
        // );
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    dispatch(slice.actions.signOut());
  };
}


export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            // token: response.data.token,
          })
        );

        // dispatch(
        //   showSnackbar({ severity: "success", message: response.data.message })
        // );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        // dispatch(showSnackbar({ severity: "error", message: error.message }));
        // dispatch(
        //   slice.actions.updateIsLoading({ error: true, isLoading: false })
        // );
      })
      .finally(() => {
        if (!getState().auth.error) {

          // login
          // window.location.href = "/auth/verify";
        }
      });
  };
}
