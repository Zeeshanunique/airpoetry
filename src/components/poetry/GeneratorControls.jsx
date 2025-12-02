/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Wind } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ValidationError, FieldHelpText } from "../ui/form-validation";
import { POEM_TYPES, CITIES, POLLUTANTS } from "../../constants/poemTypes";
import { DATE_RANGE } from "../../constants/pollutionThresholds";

const GeneratorControls = ({
  poemType,
  setPoemType,
  poemLength,
  setPoemLength,
  city,
  setCity,
  pollutant,
  setPollutant,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onGenerate,
  loading,
  dateErrors = {},
  isDateRangeValid = true,
}) => {
  return (
    <div className="space-y-5 relative">
      <div className="absolute left-3 top-1 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"></div>

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

      {/* City */}
      <div className="space-y-2 pl-8 relative">
        <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <Label htmlFor="city" className="text-gray-700 font-medium block">
          City
        </Label>
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
      </div>

      {/* Pollutant Type */}
      <div className="space-y-2 pl-8 relative">
        <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <Label htmlFor="pollutant" className="text-gray-700 font-medium block">
          Pollutant Type
        </Label>
        <Select value={pollutant} onValueChange={setPollutant}>
          <SelectTrigger
            id="pollutant"
            className="w-full border-gray-300 focus:border-primary shadow-sm transition-all"
          >
            <SelectValue>{pollutant}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={POLLUTANTS.PM10}>PM10</SelectItem>
            <SelectItem value={POLLUTANTS.PM25}>PM2.5</SelectItem>
            <SelectItem value={POLLUTANTS.NO2}>NO2</SelectItem>
          </SelectContent>
        </Select>
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
                fromDate={DATE_RANGE.MIN_DATE}
                toDate={DATE_RANGE.MAX_DATE}
                defaultMonth={DATE_RANGE.MIN_DATE}
                disabled={(date) =>
                  date < DATE_RANGE.MIN_DATE || date > DATE_RANGE.MAX_DATE || date > toDate
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
                fromDate={DATE_RANGE.MIN_DATE}
                toDate={DATE_RANGE.MAX_DATE}
                defaultMonth={new Date(2023, 11, 31)}
                disabled={(date) =>
                  date < DATE_RANGE.MIN_DATE || date > DATE_RANGE.MAX_DATE || date < fromDate
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
          Data available from Jan 2022 to Dec 2023
        </FieldHelpText>
      </div>

      {/* Generate Button */}
      <div className="pt-6 pl-0 mt-4">
        <Button
          className="relative overflow-hidden w-full bg-gradient-to-r from-primary to-primary/90 text-white py-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          onClick={onGenerate}
          disabled={loading || !isDateRangeValid}
        >
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full animate-shimmer"></div>

          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-3 h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Generating poetry...</span>
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
  pollutant: PropTypes.string.isRequired,
  setPollutant: PropTypes.func.isRequired,
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
};

export default React.memo(GeneratorControls);
