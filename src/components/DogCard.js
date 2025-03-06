import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const DogCard = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={dog.img}
        alt={dog.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {dog.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Age: {dog.age}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Breed: {dog.breed}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ZIP Code: {dog.zip_code}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onToggleFavorite}>
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DogCard;
