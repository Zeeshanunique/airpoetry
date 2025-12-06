/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import { Label } from "../ui/label";
import AQIGauge from "../ui/AQIGauge";

const PollutionDisplay = ({ aqi, aqiCategory, pollutantBreakdown }) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6 pl-8 relative">
      <div className="absolute left-0 top-8 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Wind className="h-5 w-5 text-primary" />
        <Label className="text-gray-700 font-medium text-lg">Air Quality Index</Label>
      </div>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AQIGauge 
          aqi={aqi} 
          aqiCategory={aqiCategory}
          pollutantBreakdown={pollutantBreakdown}
          size={260}
          showBreakdown={true}
        />
      </motion.div>
    </div>
  );
};

PollutionDisplay.propTypes = {
  aqi: PropTypes.number.isRequired,
  aqiCategory: PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
  }),
  pollutantBreakdown: PropTypes.shape({
    pm25: PropTypes.number,
    pm10: PropTypes.number,
  }),
};

export default React.memo(PollutionDisplay);
