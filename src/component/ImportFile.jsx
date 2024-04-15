import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUpload() {
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3056/v1/api/products/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <p>Drag & drop your file here, or click to select file</p>
        </div>
    );
}

export default FileUpload;
