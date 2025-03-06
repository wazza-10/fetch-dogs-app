// src/components/DogSearch.js
import React, { useEffect, useState } from 'react';
import { fetchBreeds, searchDogs, fetchDogsByIds, matchDogs } from '../services/api';
import DogCard from './DogCard';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Box,
  Paper
} from '@mui/material';

// 1. Import the same background image as in Login.js
import dogBg from '../assets/Leooo.jpg'; // Adjust the path if needed

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
  
      if (resultIds?.length) {
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
  
    // pagination.next might be "size=25&from=25"
    const nextParams = new URLSearchParams(pagination.next);
  
    // Extract 'size' and 'from' from that string
    const sizeVal = nextParams.get('size'); 
    const fromVal = nextParams.get('from');
  
    // Merge them into your existing pageParams
    setPageParams((prev) => ({
      ...prev,
      size: sizeVal || prev.size,
      from: fromVal || prev.from,
    }));
  };

  const handlePrevPage = () => {
    if (!pagination.prev) return;
  
    // Same logic for 'prev'
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

  return (
    /**
     * 2. Full-width Container with the same background image,
     *    placed behind the content. We use paddingTop to ensure
     *    it doesn't hide behind the fixed NavBar.
     */
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundImage: `url(${dogBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)', // Fill screen space below NavBar
        pt: '80px', // Extra padding to avoid overlapping the NavBar
        pb: '40px', // Bottom padding for aesthetics
      }}
    >
      {/**
       * 3. A semi-transparent box that holds the filters, dog listings,
       *    pagination controls, and match button.
       */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Search for Your New Best Friend
        </Typography>

        {/**
         * 4. Filter Row: Place breed selector and sort order in a flexible box,
         *    so they look neat and professional.
         */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
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

        {/**
         * 5. Dog Listings: We wrap each DogCard in a Paper component
         *    for a neat card effect with box shadow and hover scale.
         */}
        <Grid container spacing={2}>
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

        {/**
         * 6. Pagination Controls
         */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="contained" disabled={!pagination.prev} onClick={handlePrevPage}>
            Previous
          </Button>
          {/* Calculate how many dogs we've paged through so far */}
          {(() => {
            const fromNumber = pageParams.from ? parseInt(pageParams.from, 10) : 0;
            const startIndex = fromNumber + 1;
            const endIndex = fromNumber + dogs.length;
            return (
              <Typography variant="body1">
                Showing {startIndex}–{endIndex} of {total} dogs
              </Typography>
            );
          })()}
          <Button variant="contained" disabled={!pagination.next} onClick={handleNextPage}>
            Next
          </Button>
        </Box>

        {/**
         * 7. Match Generation
         */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleGenerateMatch}>
            Generate Match from Favorites ({favorites.length})
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DogSearch;
