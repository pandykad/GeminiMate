import axios from 'axios';

const uploadFile = async (file, url) => {
   
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log(response)
        console.log("from frontend: ", typeof(response))
        console.log("from frontend: ", typeof(response.data))
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadFile;
