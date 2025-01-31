interface UploadCloud {
	picture: string;
	filter: string;
	title: string;
  }
  
  const uploadToCloudinary = async (base64Image: string): Promise<string> => {
	// Convertir le base64 en FormData
	const formData = new FormData();
	// Enlever le préfixe "data:image/..." du base64
	const base64WithoutPrefix = base64Image.replace(/^data:image\/\w+;base64,/, '');
	
	formData.append('file', `data:image/png;base64,${base64WithoutPrefix}`);
	formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  
	try {
	  const response = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
		{
		  method: 'POST',
		  body: formData,
		}
	  );
  
	  const data = await response.json();
	  if (data.secure_url) {
		return data.secure_url;
	  }
	  throw new Error('Upload failed');
	} catch (error) {
	  console.error('Error uploading to Cloudinary:', error);
	  throw error;
	}
  };
  
  export default function UploadCloud() {
	const handleSubmit = async (imageUrl: string, filterUrl: string, title: string) => {
	  try {
		// Upload les deux images à Cloudinary
		const [cloudinaryImage, cloudinaryFilter] = await Promise.all([
		  uploadToCloudinary(imageUrl),
		  uploadToCloudinary(filterUrl)
		]);
  
		// Envoie les URLs au backend
		const response = await fetch('http://localhost:3000/api/clouds', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  credentials: 'include',
		  body: JSON.stringify({
			picture: cloudinaryImage,
			filter: cloudinaryFilter,
			title
		  })
		});
  
		if (!response.ok) {
		  throw new Error('Failed to save cloud data');
		}
  
		// Gestion du succès (redirection, notification, etc.)
		
	  } catch (error) {
		// Gestion d'erreur
		console.error(error);
	  }
	};
  }