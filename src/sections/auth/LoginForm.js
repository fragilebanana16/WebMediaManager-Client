import { useState } from "react";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { LoginUser,TryLoginWithSession } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
// ----------------------------------------------------------------------
import axios from "axios";
export default function AuthLoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // const {isLoading} = useSelector((state) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "admin@mail.com",
    password: "admin",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {

      // // 20231101 axios未设置对，withcreditial也设置了，但就是无法发送session数据，所以底下的登录也无法发送session和fetch共享
      // let trySessionLogin = await fetch("http://localhost:3001/auth/trylogin", {
      //   method: "post",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .catch(err => {
      //     return false;
      //   })
      //   .then(r => {
      //     if (!r || r.status >= 400) {
      //       return false;
      //     }

      //     console.log("session login success")
      //     return true;
      //   });

      dispatch(TryLoginWithSession(data));
      //   let trySessionLogin =  await TryLoginWithSession(data);
      // if (!trySessionLogin) {
      //   dispatch(LoginUser(data));
      // }

    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link component={RouterLink} to="/auth/reset-password" variant="body2" color="inherit" underline="always">
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        // loading={isLoading}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </Button>
    </FormProvider>
  );
}
