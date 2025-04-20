import React, { useState } from "react";
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import translate from 'google-translate-api-browser';

const PoetryOutput = ({ poem, downloadPoem }) => {
  const [translatedPoem, setTranslatedPoem] = useState('');
  const [translationLanguage, setTranslationLanguage] = useState('');

  const sharePoem = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Poem',
          text: translatedPoem || poem,
        });
        console.log('Poem shared successfully');
      } catch (error) {
        console.error('Error sharing poem:', error);
      }
    } else {
      console.log('Web Share API not supported in this browser');
    }
  };

  const translatePoem = async (language) => {
    if (!language) {
      setTranslatedPoem('');
      setTranslationLanguage('');
      return;
    }

    try {
      console.log('Translating poem to:', language); // Debug log
      const res = await translate(poem, { to: language });
      console.log('Translation result:', res.text); // Debug log
      setTranslatedPoem(res.text);
      setTranslationLanguage(language);
    } catch (error) {
      console.error('Error translating poem:', error);
    }
  };

  return (
    <Box className="bg-white p-8 rounded-b-lg border-t border-gray-300">
      {poem && (
        <Box className="opacity-100 transition-opacity duration-500">
          <Typography variant="h5" gutterBottom align="center">
            Generated Poem:
          </Typography>
          <Typography variant="body1" component="pre" className="bg-gray-100 p-6 rounded-lg whitespace-pre-wrap leading-7 my-6 font-serif text-gray-800">
            {translatedPoem || poem}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={downloadPoem}
            className="mt-5 mb-2.5 bg-purple-600 hover:bg-purple-700 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Download Poem
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={sharePoem}
            className="mt-2.5 bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Share Poem
          </Button>
          <FormControl fullWidth className="mt-2.5">
            <InputLabel>Translate To</InputLabel>
            <Select
              value={translationLanguage}
              onChange={(e) => translatePoem(e.target.value)}
              label="Translate To"
            >
              <MenuItem value="">Original</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="ar">Arabic</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default PoetryOutput;
