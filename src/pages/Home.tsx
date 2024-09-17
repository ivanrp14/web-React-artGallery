import{ useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageCard from "../components/ImageCard";
import axios from "axios";

// Definir el tipo para las imágenes
interface Image {
    _id: string; // Cambiar id a _id
    name: string;
    image_path: string;
    likes: number;
    description: string;
}

function Home() {
    // Estado para almacenar las ilustraciones obtenidas desde la API
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true); // Para controlar el estado de carga

    // Función para obtener las ilustraciones desde la API
    const fetchImages = async () => {
        console.log("Fetching images...");
        try {
            const response = await axios.get<Image[]>("http://127.0.0.1:8000/illustrations");  // URL de tu API
            setImages(response.data);  // Guardamos los datos en el estado
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);  // Cambiamos el estado de carga incluso si hay error
        }
    };

    // Efecto para obtener las imágenes cuando el componente se monta
    useEffect(() => {
        fetchImages();
    }, []);

    // Mostrar un mensaje de carga mientras se obtienen las imágenes
    if (loading) {
        return <div>Loading images...</div>;
    }

    return (
        <div style={{ padding: '10px' }}>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="20px">
                    {images.map((image) => (
                        <ImageCard
                            _id={image._id}  // Cambiar id a _id
                            key={image._id}  // Usar el _id de la imagen como key
                            name={image.name}
                            imgSrc={image.image_path}  // Usamos la URL de la imagen desde la API
                            likes={image.likes}
                            isLiked={false}  // Aquí podrías implementar lógica para manejar "me gusta"
                        >
                            {image.description}
                        </ImageCard>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}

export default Home;
