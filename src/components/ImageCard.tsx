import React, { useState } from 'react';
import './ImageCard.css';
import LikeButton from './LikeButton';

interface ImageCardProps {
  _id: string;
  name: string;
  imgSrc: string;
  likes: number;
  isLiked: boolean;
  children: React.ReactNode;
}

function ImageCard({ _id, name, imgSrc, likes, isLiked, children }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = (newLikeCount: number, newLiked: boolean) => {
    setLikeCount(newLikeCount);
    setLiked(newLiked);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Vista normal de la tarjeta */}
      <div className="image-card-container" onClick={toggleExpand}>
        <div className={`image-placeholder ${isLoaded ? 'loaded' : ''}`}>
          <img 
            src={imgSrc} 
            alt={name} 
            className="image-card-img" 
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        </div>

        {isLoaded && (
          <div className="image-card-overlay">
            <div className="image-card-content">
              <h3 className="image-card-title">{name}</h3>
             
              <div className="like-button-container" onClick={(e) => e.stopPropagation()}>
                {/* Botón de "like" visible en la vista normal */}
                <LikeButton
                  id={_id}
                  likes={likeCount}
                  isLiked={liked}
                  onLikeChange={handleLike}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de vista ampliada */}
      {isExpanded && (
        <div className="image-modal" onClick={() => setIsExpanded(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="expanded-image-container">
              <img src={imgSrc} alt={name} className="expanded-image" />
            </div>
            <div className="expanded-content">
              <h2 className="expanded-title">{name}</h2>
              <p className="expanded-description">{children}</p>
              {/* Solo mostramos el número de likes en la vista ampliada */}
              <div className="expanded-likes">
                <span>{likeCount} Likes</span>
              </div>
            </div>
            <span className="close-button" onClick={() => setIsExpanded(false)}>✕</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageCard;
