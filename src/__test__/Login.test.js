/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Login from "../components/Login";

// Mock axios để không thực sự gọi API
jest.mock("axios");

describe("Login Component", () => {
  // Trước mỗi test, mock dữ liệu người dùng từ API
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { email: "testuser1@example.com" },
          { email: "testuser2@example.com" },
        ],
      },
    });
  });

  test("renders login form with email and password inputs", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Tên tài khoản/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Đăng Nhập/i })
    ).toBeInTheDocument();
  });

  test("displays error message for short password", () => {
    render(<Login />);

    // Nhập email và mật khẩu ngắn
    fireEvent.change(screen.getByPlaceholderText(/Tên tài khoản/i), {
      target: { value: "testuser1@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Đăng Nhập/i }));

    expect(
      screen.getByText(/Mật khẩu phải có 8 kí tự trở lên/i)
    ).toBeInTheDocument();
  });



  test("displays error message for invalid login credentials", async () => {
    render(<Login />);

    // Nhập email sai và mật khẩu
    fireEvent.change(screen.getByPlaceholderText(/Tên tài khoản/i), {
      target: { value: "wronguser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Đăng Nhập/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Đăng nhập thất bại. Email hoặc mật khẩu không đúng./i)
      ).toBeInTheDocument();
    });
  });
  
});
