/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Room from '../components/Room/index';

const mock = new MockAdapter(axios);

describe("Room Component", () => {
    const sampleRoom = {
        maphong: "102",
        tenphong: "P102",
        trangthaiphong: true,
        trangthaitt: false,
        hinhanh: "hinh2.png",
        giaphong: 2000000,
        mota: "Mô tả phòng mẫu"
    };

    beforeEach(() => {
        mock.reset();
        jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock alert
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Xóa phòng thành công", async () => {
        // Set up mock for DELETE request
        mock.onDelete(`http://localhost:8080/api/room/${sampleRoom.maphong}`).reply(200);

        const mockOnDelete = jest.fn();
        render(<Room room={sampleRoom} onDelete={mockOnDelete} />);

        // Click the delete button
        fireEvent.click(screen.getByRole('button', { name: /Xóa/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Phòng đã được xóa thành công"); // Check alert
            expect(mockOnDelete).toHaveBeenCalledWith("102"); // Verify callback
        });
    });

    test("Hiển thị đúng thông tin phòng", async () => {
        render(<Room room={sampleRoom} />); // Render the Room component with sample room data
    
        // Verify room name
        expect(screen.getByText((content) => content.includes("Phòng:") && content.includes("P102"))).toBeInTheDocument();
    
        // Check if the price is formatted correctly
        expect(screen.getByText((content) => content.includes("2.000.000") && content.includes("VND"))).toBeInTheDocument();
    
        // Check room description visibility after clicking the "Xem" button
        fireEvent.click(screen.getByRole('button', { name: /Xem/i })); // Click "Xem" button
        expect(screen.getByText(/Mô tả phòng:/i)).toBeInTheDocument(); // Confirm description header
        expect(screen.getByText(/Mô tả phòng mẫu/i)).toBeInTheDocument(); // Confirm room description
    });

    test("Hiển thị mô tả phòng khi nhấn nút 'Xem'", async () => {
        const sampleRoom = {
            maphong: "102",
            tenphong: "P102",
            giaphong: 2000000,
            mota: "Mô tả phòng mẫu",
            trangthaiphong: true,
            hinhanh: "hinh2.png"
        };
    
        render(<Room room={sampleRoom} />); // Render the Room component with sample room data
    
        // Click the "Xem" button
        fireEvent.click(screen.getByRole('button', { name: /Xem/i }));
    
        // Check if the description is displayed
        expect(screen.getByText(/Mô tả phòng:/i)).toBeInTheDocument(); // Confirm description header
        expect(screen.getByText(/Mô tả phòng mẫu/i)).toBeInTheDocument(); // Confirm room description
    });

});