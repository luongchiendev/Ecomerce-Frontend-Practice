import React, { useState, useEffect } from "react";
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

function FormSignUp() {
  const navigate = useNavigate();
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false); // State để kiểm soát việc hiển thị Snackbar khi đăng ký thành công
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false); // State để kiểm soát việc hiển thị Snackbar khi đăng ký thất bại
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (openSuccessSnackbar) {
      const successTimer = setTimeout(() => {
        setOpenSuccessSnackbar(false); // Đóng Snackbar sau một khoảng thời gian
        navigate('/login'); // Chuyển hướng sau khi đăng ký thành công
      }, 6000); // Thời gian hiển thị Snackbar (miligiây)
      return () => clearTimeout(successTimer);
    }
  }, [openSuccessSnackbar, navigate]);

  const onSubmit = async (data) => {
    try {
      // Gọi API đăng ký
      const apiKey = 'a5da9dfc4d88c0671a183393f9890132c5ce0598e8a72e7a535bbe558fd563d3628498f90ed1e66702738ce9346ae502322b43bac39e23cfcf2df5e709b25444'; // Thay thế 'your-api-key' bằng API key thực sự của bạn
      const response = await axios.post("http://localhost:3056/v1/api/shop/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'x-api-key': apiKey,
        }
      });

      // Xử lý phản hồi từ server
      if (response.status === 200) {
        console.log("Đăng Ký thành công!");
        // Hiển thị Snackbar thông báo khi đăng ký thành công
        setOpenSuccessSnackbar(true);
      } else {
        // Đăng ký thất bại, hiển thị Snackbar thông báo thất bại
        console.log("Đăng ký thất bại!");
        setOpenErrorSnackbar(true);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng ký:", error.message);
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false); // Đóng Snackbar khi click vào action hoặc hết thời gian hiển thị
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false); // Đóng Snackbar khi click vào action hoặc hết thời gian hiển thị
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "auto" }}>
        <FormControl error={!!errors.name} fullWidth margin="normal">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="name"
            {...register("name", {
              required: "Name không được để trống",
            })}
          />
        </FormControl>

        <FormControl error={!!errors.email} fullWidth margin="normal">
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

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>Đăng Ký</Button>
      </form>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
        message="Đăng ký thành công! Hãy check email để xác nhận việc đăng ký tài khoản!"
        action={
          <Button color="secondary" size="small" onClick={handleCloseSuccessSnackbar}>
            Đóng
          </Button>
        }
      />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        message="Đăng ký thất bại! Mời nhập lại thông tin!"
        action={
          <Button color="secondary" size="small" onClick={handleCloseErrorSnackbar}>
            Đóng
          </Button>
        }
      />
    </>
  );
}

export default FormSignUp;
