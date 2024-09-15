import React, { useState } from 'react';
import './ImageCard.css'; // Importa el archivo CSS
import LikeButton from './LikeButton'; // Asegúrate de que la ruta sea correcta

interface ImageCardProps {
  _id: string; // Cambiar id a _id
  name: string;
  imgSrc: string;
  likes: number;
  isLiked: boolean;
  children: React.ReactNode; // Para la descripción o cualquier otro contenido
}

function ImageCard({ _id, name, imgSrc, likes, isLiked, children }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false); // Estado para saber si la imagen ha cargado

  return (
    <div className="image-card-container">
      {/* Muestra fondo gris si la imagen no ha cargado */}
      <div className={`image-placeholder ${isLoaded ? 'loaded' : ''}`}>
        <img 
          src={imgSrc} 
          alt={name} 
          className="image-card-img" 
          onLoad={() => setIsLoaded(true)} // Cambia el estado a true cuando la imagen se haya cargado
          style={{ opacity: isLoaded ? 1 : 0 }} // Transición suave entre placeholder y imagen cargada
        />
      </div>

      {/* Solo muestra el contenido si la imagen ha sido cargada */}
      {isLoaded && (
        <div className="image-card-overlay">
          <div className="image-card-content">
            <h3 className="image-card-title">{name}</h3>
            <p className='image-card-description'>{children}</p>
            <div className="like-button-container">
              <LikeButton
                id={_id} // Asegúrate de pasar el _id aquí
                likes={likes}
                isLiked={isLiked}  // Asegúrate de que este valor refleje si el usuario ya ha dado like
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageCard;
