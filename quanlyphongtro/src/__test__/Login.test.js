/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Login from "../components/Login";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

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

  test("test case thông báo mật khẩu ngắn", () => {
    render(
      <MemoryRouter> {/* Bao bọc Login trong MemoryRouter */}
        <Login />
      </MemoryRouter>
    );

    // Nhập email và mật khẩu ngắn
    fireEvent.change(screen.getByPlaceholderText(/Tên tài khoản/i), {
      target: { value: "okok1@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Đăng Nhập/i }));

    expect(
      screen.getByText(/Mật khẩu phải có 8 kí tự trở lên/i)
    ).toBeInTheDocument();
  });

  test("đăng nhập sai tk mk", async () => {
    render(
      <MemoryRouter> {/* Bao bọc Login trong MemoryRouter */}
        <Login />
      </MemoryRouter>
    );

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

  test("Sai định dạng email", async () => {
    render(
      <MemoryRouter> {/* Bao bọc Login trong MemoryRouter */}
        <Login />
      </MemoryRouter>
    );
  
    // Nhập email không hợp lệ và mật khẩu hợp lệ
    fireEvent.change(screen.getByPlaceholderText(/Tên tài khoản/i), {
      target: { value: "invalid" }, // Email không có đuôi @gmail.com
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "validpassword123" }, // Mật khẩu hợp lệ
    });
  
    fireEvent.click(screen.getByRole("button", { name: /Đăng Nhập/i }));
  
    await waitFor(() => {
      expect(
        screen.getByText(/Email không hợp lệ./i) // Giả định bạn có thông báo lỗi này
      ).toBeInTheDocument();
    });
  });
  

  
});
