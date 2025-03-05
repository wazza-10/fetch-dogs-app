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
} from '@mui/material';

const DogSearch = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // default sort by breed: asc
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

  // Search dogs based on current filters.
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
  }, [selectedBreed, sortOrder, pageParams]);

  const handleNextPage = () => {
    if (pagination.next) {
      setPageParams({ ...pageParams, from: pagination.next });
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev) {
      setPageParams({ ...pageParams, from: pagination.prev });
    }
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavs) =>
      prevFavs.includes(dogId)
        ? prevFavs.filter((id) => id !== dogId)
        : [...prevFavs, dogId]
    );
  };

  // Generate a match.
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
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search for Your New Best Friend
        </Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
          {/* Additional filters (e.g., age range) can be added here */}
        </Box>

        <Grid container spacing={2}>
          {dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <DogCard
                dog={dog}
                isFavorite={favorites.includes(dog.id)}
                onToggleFavorite={() => toggleFavorite(dog.id)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="contained" disabled={!pagination.prev} onClick={handlePrevPage}>
            Previous
          </Button>
          <Typography variant="body1">
            Showing {dogs.length} of {total} dogs
          </Typography>
          <Button variant="contained" disabled={!pagination.next} onClick={handleNextPage}>
            Next
          </Button>
        </Box>

        {/* Match Generation */}
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
