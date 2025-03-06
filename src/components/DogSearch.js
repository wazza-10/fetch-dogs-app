import React, { useEffect, useState } from 'react';
import { fetchBreeds, searchDogs, fetchDogsByIds, matchDogs } from '../services/api';
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { keyframes } from '@emotion/react';
import PetsIcon from '@mui/icons-material/Pets';

import dogBg from '../assets/Leooo.jpg';

import DogCard from './DogCard';

const floatGradient = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-45%, -55%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;

//Bouncy icon animation for the footer
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const DogSearch = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dogs, setDogs] = useState([]);
  const [pagination, setPagination] = useState({ next: null, prev: null });
  const [favorites, setFavorites] = useState([]);
  const [pageParams, setPageParams] = useState({ size: 25, from: undefined });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breedList = await fetchBreeds();
        setBreeds(breedList);
      } catch (err) {
        console.error(err);
      }
    };
    getBreeds();
  }, []);

  const performSearch = async (customParams = {}) => {
    const params = {
      breeds: selectedBreed ? [selectedBreed] : undefined,
      sort: `breed:${sortOrder}`,
      size: pageParams.size,
      from: pageParams.from,
      ...customParams,
    };

    try {
      const searchResults = await searchDogs(params);
      const { resultIds, next, prev, total } = searchResults;
      setPagination({ next, prev });
      setTotal(total);

      if (resultIds && resultIds.length > 0) {
        const dogsData = await fetchDogsByIds(resultIds);
        setDogs(dogsData);
      } else {
        setDogs([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBreed, sortOrder, pageParams]);

  const handleNextPage = () => {
    if (!pagination.next) return;
    const nextParams = new URLSearchParams(pagination.next);
    const sizeVal = nextParams.get('size');
    const fromVal = nextParams.get('from');
    setPageParams((prev) => ({
      ...prev,
      size: sizeVal || prev.size,
      from: fromVal || prev.from,
    }));
  };

  const handlePrevPage = () => {
    if (!pagination.prev) return;
    const prevParams = new URLSearchParams(pagination.prev);
    const sizeVal = prevParams.get('size');
    const fromVal = prevParams.get('from');
    setPageParams((prev) => ({
      ...prev,
      size: sizeVal || prev.size,
      from: fromVal || prev.from,
    }));
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavs) =>
      prevFavs.includes(dogId)
        ? prevFavs.filter((id) => id !== dogId)
        : [...prevFavs, dogId]
    );
  };

  const handleGenerateMatch = async () => {
    if (favorites.length === 0) {
      alert('Please select at least one favorite dog to generate a match.');
      return;
    }
    try {
      const matchResult = await matchDogs(favorites);
      alert(`You have been matched with dog ID: ${matchResult.match}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate how many dogs have been shown so far
  const fromNumber = pageParams.from ? parseInt(pageParams.from, 10) : 0;
  const shownSoFar = fromNumber + dogs.length;

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${dogBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        pt: '64px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)',
          animation: `${floatGradient} 8s ease-in-out infinite`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          Search for Your New Best Friend
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(255,255,255,0.6)',
            p: 2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="breed-select-label">Breed</InputLabel>
            <Select
              labelId="breed-select-label"
              value={selectedBreed}
              label="Breed"
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="sort-select-label">Sort Order</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortOrder}
              label="Sort Order"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2} sx={{ maxWidth: 1200 }}>
          {dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  ':hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <DogCard
                  dog={dog}
                  isFavorite={favorites.includes(dog.id)}
                  onToggleFavorite={() => toggleFavorite(dog.id)}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, width: '100%', maxWidth: 1200 }}>
          <Button variant="contained" disabled={!pagination.prev} onClick={handlePrevPage}>
            Previous
          </Button>
          <Typography variant="body1" sx={{ alignSelf: 'center', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Showing {shownSoFar} of {total} dogs
          </Typography>
          <Button variant="contained" disabled={!pagination.next} onClick={handleNextPage}>
            Next
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleGenerateMatch}>
            Generate Match from Favorites ({favorites.length})
          </Button>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          gap: 1,
          zIndex: 3,
        }}
      >
        <Box sx={{ animation: `${bounce} 2s infinite` }}>
          <PetsIcon />
        </Box>
        <Typography variant="body2" fontWeight="bold">
          © {new Date().getFullYear()} Fetch Rewards
        </Typography>
      </Box>
    </Container>
  );
};

export default DogSearch;
