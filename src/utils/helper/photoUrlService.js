const photoUrlService = async (photo) => {
    if (!photo) {
      throw new Error("No photo provided for upload");
    }
  
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "formUpdate");
    formData.append("cloud_name", "dwmaxfxwb");
   
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dwmaxfxwb/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
     
      if (response.ok) {
        
        return data.secure_url;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw new Error("An error occurred while uploading the photo. Please try again.");
    }
  };
  
  export default photoUrlService;
  
