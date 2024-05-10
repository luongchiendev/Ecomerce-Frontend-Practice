import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import '../FormLogin/formLogin.css'

function FormLogin() {
  const navigate = useNavigate();
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false); // State để kiểm soát việc hiển thị Snackbar khi đăng nhập thất bại
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Take access token from local storage
  const saveAccessTokenToLocalStorage = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
  }


  const onSubmit = async (data) => {
    try {
      // Gọi API đăng nhập

      const response = await axios.post("http://localhost:3056/v1/api/shop/login", {
        email: data.email,
        password: data.password,
      }
      )
      // Xử lý phản hồi từ server
      if (response.status === 200) {
        console.log("Đăng nhập thành công!");
        const accessToken = response.data.metadata.tokens.accessToken;
        saveAccessTokenToLocalStorage(accessToken);
        console.log(accessToken)
        // Chuyển hướng người dùng sau khi đăng nhập thành công (nếu cần)

        navigate('/product');
      } else {
        // Đăng nhập thất bại, hiển thị Snackbar thông báo thất bại
        console.log("Đăng nhập thất bại!");
        setOpenErrorSnackbar(true);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng nhập:", error.message);
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false); // Đóng Snackbar khi click vào action hoặc hết thời gian hiển thị
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "auto" }}>
        <FormControl error={!!errors.email} label="outlined" fullWidth margin="normal">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.password} fullWidth margin="normal">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password không được để trống",
            })}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
        <div className="btn-login">
          <Button type="submit" variant="outlined" color="primary" style={{ marginTop: "16px" }}>Đăng nhập</Button>
        </div>

      </form>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        message="Đăng nhập thất bại!"
        action={
          <Button color="secondary" size="small" onClick={handleCloseErrorSnackbar}>
            Đóng
          </Button>
        }
      />
    </>
  );
}

export default FormLogin;
