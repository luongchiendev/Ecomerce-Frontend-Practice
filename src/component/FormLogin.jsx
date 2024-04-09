import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function FormLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Gọi API đăng nhập
      const apiKey = 'a5da9dfc4d88c0671a183393f9890132c5ce0598e8a72e7a535bbe558fd563d3628498f90ed1e66702738ce9346ae502322b43bac39e23cfcf2df5e709b25444'; // Thay thế 'your-api-key' bằng API key thực sự của bạn
      const response = await axios.post("http://localhost:3056/v1/api/shop/login", {
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'x-api-key': apiKey,
        }
      });

      // Xử lý phản hồi từ server
      if (response.status === 200) {
        console.log("Đăng nhập thành công!");
        // Chuyển hướng người dùng sau khi đăng nhập thành công (nếu cần)
        // history.push('/dashboard');
        navigate('/product');
      } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi
        console.log("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng nhập:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "auto" }}>
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

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>Đăng nhập</Button>
    </form>
  );
}

export default FormLogin;
