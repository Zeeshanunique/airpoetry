/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Wind, Database, Wifi, MapPin, Search, Star, X } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ValidationError, FieldHelpText } from "../ui/form-validation";
import { POEM_TYPES, CITIES } from "../../constants/poemTypes";
import { DATE_RANGE } from "../../constants/pollutionThresholds";
import { DATA_SOURCE } from "../../hooks/usePollutionDataWithToggle";
import { getKnownCities } from "../../services/geocoding.service";

const GeneratorControls = ({
  poemType,
  setPoemType,
  poemLength,
  setPoemLength,
  city,
  setCity,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onGenerate,
  loading,
  dateErrors = {},
  isDateRangeValid = true,
  // Data source toggle props
  dataSource = DATA_SOURCE.HISTORICAL,
  setDataSource,
  customCity,
  setCustomCity,
  locationInfo,
  dataLoading = false,
}) => {
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const knownCities = getKnownCities();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          cityInputRef.current && !cityInputRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter cities based on search
  const getFilteredCities = () => {
    const searchLower = citySearch.toLowerCase().trim();
    
    // Popular cities (from CITIES constant)
    const popularCities = knownCities.filter(c => CITIES.includes(c.name));
    
    // Other known cities
    const otherCities = knownCities.filter(c => !CITIES.includes(c.name));
    
    if (!searchLower) {
      return { popular: popularCities, other: otherCities.slice(0, 10) };
    }
    
    const filterFn = (c) => 
      c.name.toLowerCase().includes(searchLower) || 
      c.country.toLowerCase().includes(searchLower);
    
    return {
      popular: popularCities.filter(filterFn),
      other: otherCities.filter(filterFn).slice(0, 15)
    };
  };

  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setCitySearch("");
    setShowCityDropdown(false);
    if (setCustomCity) setCustomCity(cityName);
  };

  // Handle data source toggle
  const handleDataSourceChange = (newSource) => {
    if (setDataSource) {
      setDataSource(newSource);
      // Reset to known city when switching to historical
      if (newSource === DATA_SOURCE.HISTORICAL && !CITIES.includes(city)) {
        setCity(CITIES[0]);
      }
    }
  };

  // Get date constraints based on data source
  const getDateConstraints = () => {
    if (dataSource === DATA_SOURCE.LIVE) {
      // Live API: last 92 days available
      const today = new Date();
      const minDate = new Date();
      minDate.setDate(today.getDate() - 92);
      return { minDate, maxDate: today };
    }
    return { minDate: DATE_RANGE.MIN_DATE, maxDate: DATE_RANGE.MAX_DATE };
  };

  const dateConstraints = getDateConstraints();

  return (
    <div className="space-y-5 relative">
      <div className="absolute left-3 top-1 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"></div>

      {/* Data Source Toggle */}
      {setDataSource && (
        <div className="space-y-2 pl-8 relative">
          <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <Label className="text-gray-700 font-medium block">
            Data Source
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={dataSource === DATA_SOURCE.HISTORICAL ? "default" : "outline"}
              className={`flex-1 ${dataSource === DATA_SOURCE.HISTORICAL ? 'bg-primary text-white' : ''}`}
              onClick={() => handleDataSourceChange(DATA_SOURCE.HISTORICAL)}
            >
              <Database className="h-4 w-4 mr-2" />
              Historical
            </Button>
            <Button
              type="button"
              variant={dataSource === DATA_SOURCE.LIVE ? "default" : "outline"}
              className={`flex-1 ${dataSource === DATA_SOURCE.LIVE ? 'bg-emerald-600 text-white hover:bg-emerald-700' : ''}`}
              onClick={() => handleDataSourceChange(DATA_SOURCE.LIVE)}
            >
              <Wifi className="h-4 w-4 mr-2" />
              Live API
            </Button>
          </div>
          <FieldHelpText>
            {dataSource === DATA_SOURCE.HISTORICAL 
              ? "Using pre-loaded data (Jan 2022 - Dec 2023)" 
              : "Fetching real-time data from Open-Meteo API"}
          </FieldHelpText>
        </div>
      )}

      {/* Poetry Form */}
      <div className="space-y-2 pl-8 relative">
        <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <Label htmlFor="poemType" className="text-gray-700 font-medium block">
          Poetry Form
        </Label>
        <Select value={poemType} onValueChange={setPoemType}>
          <SelectTrigger
            id="poemType"
            className="w-full border-gray-300 focus:border-primary shadow-sm transition-all"
          >
            <SelectValue>{poemType}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={POEM_TYPES.SONNET}>{POEM_TYPES.SONNET}</SelectItem>
            <SelectItem value={POEM_TYPES.ODE}>{POEM_TYPES.ODE}</SelectItem>
            <SelectItem value={POEM_TYPES.FREE_VERSE}>{POEM_TYPES.FREE_VERSE}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Poem Length */}
      <div className="space-y-2 pl-8 relative">
        <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <Label htmlFor="poemLength" className="text-gray-700 font-medium block">
          Number of Lines
        </Label>
        {poemType === POEM_TYPES.SONNET ? (
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
            14 lines (fixed for Sonnets)
          </div>
        ) : (
          <input
            type="number"
            id="poemLength"
            value={poemLength}
            onChange={(e) => setPoemLength(Number(e.target.value))}
            min="4"
            max="30"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        )}
      </div>

      {/* City Selection - Unified Search */}
      <div className="space-y-2 pl-8 relative">
        <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <Label htmlFor="city" className="text-gray-700 font-medium block flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          City
          {dataSource === DATA_SOURCE.LIVE && (
            <span className="text-xs text-emerald-600 font-normal">(Worldwide)</span>
          )}
        </Label>
        
        {dataSource === DATA_SOURCE.HISTORICAL ? (
          // Historical: Dropdown with fixed cities
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger
            id="city"
              className="w-full border-gray-300 focus:border-primary shadow-sm transition-all"
          >
            <SelectValue>{city}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((cityName) => (
              <SelectItem key={cityName} value={cityName}>
                {cityName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        ) : (
          // Live: Direct input with suggestions dropdown
          <div className="relative">
            {/* Direct City Input - Type any city */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={cityInputRef}
                type="text"
                value={citySearch || city}
                onChange={(e) => {
                  const val = e.target.value;
                  setCitySearch(val);
                  setCity(val);
                  if (setCustomCity) setCustomCity(val);
                  if (!showCityDropdown && val) setShowCityDropdown(true);
                }}
                onFocus={() => setShowCityDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setShowCityDropdown(false);
                    cityInputRef.current?.blur();
                  }
                  if (e.key === 'Escape') {
                    setShowCityDropdown(false);
                  }
                }}
                placeholder="Type any city name (e.g., Tokyo, Paris, New York...)"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
              {/* Clear button (X) */}
              {(citySearch || city) && (
                <button
                  type="button"
                  onClick={() => {
                    setCitySearch("");
                    setCity("");
                    if (setCustomCity) setCustomCity("");
                    cityInputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Clear city"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
      </div>

            {/* Help text */}
            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
              <span>💡</span> Type any city worldwide and press Enter, or select from suggestions below
            </p>

            {/* Suggestions Dropdown */}
            {showCityDropdown && (
              <div 
                ref={dropdownRef}
                className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto"
              >
                {(() => {
                  const filtered = getFilteredCities();
                  
                  return (
                    <>
                      {/* Popular Cities Section - Always show */}
                      {filtered.popular.length > 0 && (
                        <div>
                          <div className="px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 sticky top-0">
                            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              Popular Cities
                            </span>
                          </div>
                          {filtered.popular.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                handleCitySelect(c.name);
                                setCitySearch(c.name);
                              }}
                              className={`w-full text-left px-3 py-2.5 text-sm hover:bg-emerald-50 transition-colors flex items-center justify-between ${
                                city === c.name ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-amber-500" />
                                {c.name}
                              </span>
                              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{c.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Other Suggestions */}
                      {filtered.other.length > 0 && (
                        <div>
                          <div className="px-3 py-2 bg-gray-50 border-b border-t border-gray-100 sticky top-0">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              {citySearch ? 'Matching Cities' : 'More Cities'}
                            </span>
        </div>
                          {filtered.other.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                handleCitySelect(c.name);
                                setCitySearch(c.name);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 transition-colors flex items-center justify-between ${
                                city === c.name ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                {c.name}
                              </span>
                              <span className="text-xs text-gray-400">{c.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Custom city hint at bottom */}
                      <div className="border-t border-gray-100 bg-slate-50 px-3 py-2">
                        <p className="text-[10px] text-slate-500 text-center">
                          🌍 Can't find your city? Just type the name and press <kbd className="bg-white px-1 py-0.5 rounded border text-[9px]">Enter</kbd>
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Location Info Badge */}
        {locationInfo && dataSource === DATA_SOURCE.LIVE && (
          <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md inline-flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            {locationInfo.country && `${locationInfo.city}, ${locationInfo.country}`}
            {locationInfo.latitude && ` (${locationInfo.latitude.toFixed(2)}°, ${locationInfo.longitude.toFixed(2)}°)`}
          </div>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4 pl-8 relative">
        <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fromDate" className="text-gray-700 font-medium block">
            From Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal shadow-sm transition-all ${
                  dateErrors.from 
                    ? "border-red-300 hover:border-red-400 focus:border-red-500" 
                    : "border-gray-300 hover:border-primary focus:border-primary"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(fromDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
                className="rounded-md shadow-md border border-gray-200"
                fromDate={dateConstraints.minDate}
                toDate={dateConstraints.maxDate}
                defaultMonth={dateConstraints.minDate}
                disabled={(date) =>
                  date < dateConstraints.minDate || date > dateConstraints.maxDate || date > toDate
                }
              />
            </PopoverContent>
          </Popover>
          <ValidationError message={dateErrors.from} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="toDate" className="text-gray-700 font-medium block">
            To Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal shadow-sm transition-all ${
                  dateErrors.to 
                    ? "border-red-300 hover:border-red-400 focus:border-red-500" 
                    : "border-gray-300 hover:border-primary focus:border-primary"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(toDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
                className="rounded-md shadow-md border border-gray-200"
                fromDate={dateConstraints.minDate}
                toDate={dateConstraints.maxDate}
                defaultMonth={dateConstraints.maxDate}
                disabled={(date) =>
                  date < dateConstraints.minDate || date > dateConstraints.maxDate || date < fromDate
                }
              />
            </PopoverContent>
          </Popover>
          <ValidationError message={dateErrors.to} />
        </div>
      </div>

      {/* Quick Date Range Selectors */}
      <div className="pl-8 pt-2">
        <FieldHelpText>
          {dataSource === DATA_SOURCE.HISTORICAL 
            ? "Data available from Jan 2022 to Dec 2023"
            : "Live data available for the last 92 days"}
        </FieldHelpText>
      </div>

      {/* Generate Button */}
      <div className="pt-6 pl-0 mt-4">
        <Button
          className={`relative overflow-hidden w-full py-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
            dataSource === DATA_SOURCE.LIVE 
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white'
              : 'bg-gradient-to-r from-primary to-primary/90 text-white'
          }`}
          onClick={onGenerate}
          disabled={loading || !isDateRangeValid || dataLoading}
        >
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full animate-shimmer"></div>

          {loading || dataLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-3 h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
              <span>{dataLoading ? 'Fetching data...' : 'Generating poetry...'}</span>
            </div>
          ) : (
            <div className="flex items-center text-white justify-center group">
              <Wind className="mr-3 h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="tracking-wide">Generate Poem</span>
            </div>
          )}
        </Button>
        <div className="text-xs text-center text-gray-500 mt-2">
          {!isDateRangeValid 
            ? "Please fix date range errors to generate" 
            : dataSource === DATA_SOURCE.LIVE
              ? "Real-time air quality data from Open-Meteo"
              : "Creative AI poetry based on air pollution data"}
        </div>
      </div>
    </div>
  );
};

GeneratorControls.propTypes = {
  poemType: PropTypes.string.isRequired,
  setPoemType: PropTypes.func.isRequired,
  poemLength: PropTypes.number.isRequired,
  setPoemLength: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  setFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  setToDate: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  dateErrors: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  isDateRangeValid: PropTypes.bool,
  // Data source props
  dataSource: PropTypes.string,
  setDataSource: PropTypes.func,
  customCity: PropTypes.string,
  setCustomCity: PropTypes.func,
  locationInfo: PropTypes.object,
  dataLoading: PropTypes.bool,
};

export default React.memo(GeneratorControls);
