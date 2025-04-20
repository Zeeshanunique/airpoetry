import React, { useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CircularProgress from "@mui/material/CircularProgress";
import ReactSpeedometer from "react-d3-speedometer";

const getPollutionCategory = (rate) => {
  if (rate <= 12) return "Low";
  if (rate <= 36) return "Moderate";
  if (rate <= 56) return "High";
  return "Very High";
};

const getPollutionCategoryLink = (category) => {
  switch (category) {
    case "Low":
      return "https://airindex.eea.europa.eu/AQI/index.html";
    case "Moderate":
      return "https://airindex.eea.europa.eu/AQI/index.html";
    case "High":
      return "https://airindex.eea.europa.eu/AQI/index.html";
    case "Very High":
      return "https://airindex.eea.europa.eu/AQI/index.html";
    default:
      return "#";
  }
};

const PoetryForm = ({
  poemType,
  setPoemType,
  city,
  setCity,
  pollutant,
  setPollutant,
  length,
  setLength,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  avgPollutionRate,
  generatePoetry,
  isLoading,
}) => {
  const pollutionCategory = getPollutionCategory(avgPollutionRate);
  const pollutionCategoryLink = getPollutionCategoryLink(pollutionCategory);

  useEffect(() => {
    if (poemType === "Sonnet") {
      setLength(14);
    } else {
      setLength(1);
    }
  }, [poemType, setLength]);

  return (
    <div className="bg-white p-8 rounded-t-lg">
      <Typography variant="h3" gutterBottom align="center" className="mb-8">
        AI Poetry Generator
      </Typography>
      <Grid container spacing={3} component="form">
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Poem Type"
            value={poemType}
            onChange={(e) => setPoemType(e.target.value)}
            fullWidth
            margin="normal"
            className="mb-6"
          >
            <MenuItem value="Sonnet">Sonnet</MenuItem>
            <MenuItem value="Ode">Ode</MenuItem>
            <MenuItem value="Freeverse">Freeverse</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            margin="normal"
            className="mb-6"
          >
            <MenuItem value="Bergamo">Bergamo</MenuItem>
            <MenuItem value="Treviglio">Treviglio</MenuItem>
            <MenuItem value="Bizerte">Bizerte</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          {poemType !== "Sonnet" ? (
            <TextField
              type="number"
              label="Poem Length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              fullWidth
              margin="normal"
              className="mb-6"
            />
          ) : (
            <TextField
              type="number"
              label="Poem Length *"
              value={length}
              fullWidth
              margin="normal"
              className="mb-6"
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Pollutant Type"
            value={pollutant}
            onChange={(e) => setPollutant(e.target.value)}
            fullWidth
            margin="normal"
            className="mb-6"
          >
            <MenuItem value="pm10">PM10</MenuItem>
            <MenuItem value="pm2.5">PM2.5</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" className="mb-6" />}
              minDate={new Date(2022, 0, 1)}
              maxDate={new Date(2023, 11, 31)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" className="mb-6" />}
              minDate={new Date(2022, 0, 1)}
              maxDate={new Date(2023, 11, 31)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <div className="flex justify-center items-center my-8">
            <ReactSpeedometer
              value={avgPollutionRate}
              minValue={0}
              maxValue={100}
              segments={4}
              segmentColors={["#00e400", "#ffff00", "#ff7e00", "#ff0000"]}
              currentValueText={`Pollution Rate: ${avgPollutionRate.toFixed(2)} µg/m³`}
              needleColor="black"
              textColor="black"
              height={200}
            />
          </div>
          <Typography variant="h8" gutterBottom align="center">
            Reference: 
            <a href={ pollutionCategoryLink} target="_blank" rel="noopener noreferrer">
              {pollutionCategory}
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={generatePoetry}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded mt-4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Generate Poetry
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15 }} />}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PoetryForm;
