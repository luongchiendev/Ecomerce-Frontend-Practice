import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
function ExportButton() {
    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:3056/v1/api/product/export', {
                responseType: 'blob', // Đặt responseType là 'blob' để xử lý dữ liệu như một file
            });

            // Tạo một URL từ dữ liệu blob và tạo một link để tải xuống
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'products.xlsx'); // Tên file cần tải xuống
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed');
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleExport}>Export Products to Excel</Button>
        </div>
    );
}

export default ExportButton;
