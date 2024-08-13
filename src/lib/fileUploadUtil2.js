import axios from 'axios';

const uploadFiles = async (files, url, fields = {}) => {
    const formData = new FormData();

    // Ensure that the files array is correctly structured
    if (files.file1) {
        formData.append('file1', files.file1); // Field name should match backend
    }

    if (files.file2) {
        formData.append('file2', files.file2); // Field name should match backend
    }

    // Append additional fields to the FormData
    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            formData.append(key, fields[key]);
        }
    }

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
};

export default uploadFiles;
