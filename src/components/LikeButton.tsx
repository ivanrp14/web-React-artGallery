import React, { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';
import axios from 'axios';
import './LikeButton.css';

interface LikeButtonProps {
  id: string; // ID del recurso
  likes: number;
  isLiked: boolean;
}

function LikeButton({ id, likes, isLiked }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const toggleDisplay = async () => {
    try {
      const newLikes = liked ? likeCount - 1 : likeCount + 1;
      // Asegúrate de que 'id' no sea undefined
      if (!id) {
        console.error('ID is undefined');
        return;
      }
      await axios.put(`http://127.0.0.1:8000/illustrations/${id}/likes`, { new_likes: newLikes });
      setLikeCount(newLikes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const heartStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div className="like-button-container">
      <div className="heart-box">
        <Heart
          isClick={liked}
          onClick={toggleDisplay}
          styles={heartStyles}
        />
      </div>
      <div className="likes-box">
        <span className="like-count"> {likeCount}</span>
      </div>
    </div>
  );
}

export default LikeButton;
