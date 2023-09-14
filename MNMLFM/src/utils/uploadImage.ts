import axios from 'axios';

export const uploadImage = async (imageUrl: string) => {
  try {
    const data = new FormData();
    data.append('file', {
      uri: imageUrl,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    data.append('upload_preset', 'image_preset');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dhiy3e35c/image/upload',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        params: {
          secure: true,
        },
      },
    );
    console.log(response?.data)
    return {
      status: 'SUCESS',
      imageUrl: response?.data.secure_url,
    };
  } catch (error) {
    return {
      status: 'FAILED',
      message: error.message,
    };
  }
};
