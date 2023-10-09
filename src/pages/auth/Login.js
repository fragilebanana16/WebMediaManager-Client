import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";

import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";
import { useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function LoginPage() {
  const theme = useTheme();

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, mt:5, position: "relative" }}>
        <Typography variant="h4">Login</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant="subtitle2"
          >
            Create an account
          </Link>
        </Stack>
      </Stack>
      {/* Form */}
      <Login />

      <AuthSocial />
    </>
  );
}
