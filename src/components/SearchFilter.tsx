import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, setSearchQuery } from '../redux/slice/userSlice';

interface SearchFilterProps {
  searchQuery: string;
  handleSearch: () => void;
  filters: {
    domain: string;
    gender: string;
    availability: string;
  };
  handleFilterChange: (filterType: string, value: string) => void;
  allFilters: {
    domain: string[];
    gender: string[];
    availability: string[];
  };
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  handleSearch,
  filters,
  handleFilterChange,
  allFilters,
}) => {
  const dispatch = useDispatch();

  const handleSearchQueryChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleResetFilters = () => {
    const newFilter = {
      domain: '',
      gender: '',
      availability: '',
    };

    dispatch(setFilters(newFilter));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        '@media (min-width: 700px)': {
          flexDirection: 'row',
        },
      }}
    >
      <Input
        type="text"
        placeholder="Search for users..."
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
        sx={{
          marginBottom: '1rem',
          width: '100%',
          '@media (min-width: 700px)': { marginRight: '1rem', marginBottom: 0 },
        }}
      />

<FormControl
        sx={{
          minWidth: '120px',
          marginBottom: '1rem',
          '@media (min-width: 700px)': { marginRight: '1rem', marginBottom: 0 },
        }}
      >
        <InputLabel htmlFor="availability-filter">Availability</InputLabel>
        <Select
          value={filters.availability}
          onChange={(e) =>
            handleFilterChange('availability', e.target.value as string)
          }
          label="Availability"
          id="availability-filter"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Available</MenuItem>
          <MenuItem value="false">Not Available</MenuItem>
        </Select>
      </FormControl>

    

      <FormControl
        sx={{
          minWidth: '120px',
          marginBottom: '1rem',
          '@media (min-width: 700px)': { marginRight: '1rem', marginBottom: 0 },
        }}
      >
        <InputLabel htmlFor="gender-filter">Gender</InputLabel>
        <Select
          value={filters.gender}
          onChange={(e) =>
            handleFilterChange('gender', e.target.value as string)
          }
          label="Gender"
          id="gender-filter"
        >
          <MenuItem value="">All</MenuItem>
          {allFilters.gender.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          minWidth: '120px',
          marginBottom: '1rem',
          '@media (min-width: 700px)': { marginRight: '1rem', marginBottom: 0 },
        }}
      >
        <InputLabel htmlFor="domain-filter">Domain</InputLabel>
        <Select
          value={filters.domain}
          onChange={(e) =>
            handleFilterChange('domain', e.target.value as string)
          }
          label="Domain"
          id="domain-filter"
        >
          <MenuItem value="">All</MenuItem>

          {allFilters.domain.map((domain) => (
            <MenuItem key={domain} value={domain}>
              {domain}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          '@media (min-width: 700px)': { flexDirection: 'row' },
        }}
      >
        <Button
          variant="outlined"
          onClick={() => handleResetFilters()}
          sx={{
            marginBottom: '1rem',
            width: '100%',
            '@media (min-width: 700px)': {
              marginRight: '1rem',
              marginBottom: 0,
              width: 'auto',
            },
          }}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          onClick={() => handleSearch()}
          sx={{ width: '100%', '@media (min-width: 700px)': { width: 'auto' } }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchFilter;
