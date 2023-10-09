import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";
import { RHFTextField } from "../components/hook-form";
import { Stack, Button } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";
import { UpdateUserProfile } from "../redux/slices/app";
import { TextField } from '@mui/material';
const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);
  console.log()

  const ProfileSchema = Yup.object().shape({
    nickName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    // avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    nickName: user?.name,
    about: user?.about,
    // avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      console.log("submit profile saving:", data);
      dispatch(
        UpdateUserProfile({
          name: data?.nickName,
          about: data?.about,
          // avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {/* <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} /> */}

        <RHFTextField
          // helperText={"This name is visible to your contacts"}
          name="nickName"
          label="My Name"
          color="success"
        />

        <RHFTextField multiline rows={4} color="success"
        name="about" label="What’s up?" />

        <TextField
          // helperText={"Register Email"}
          label="My Email"
          value={`${user?.email}`}
          disabled
          color="warning"
        />
        <TextField
          label="Created At"
          value={`${new Date(user?.createdAt).toDateString()}`}
          disabled
          color="warning"
        />

        <TextField
          label="Password Changed At"
          value={`${new Date(user?.passwordChangedAt).toDateString()}`}
          disabled
          color="warning"
        />

        <Stack direction={"row"} justifyContent="end">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          // loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
