/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import ReactSpeedometer from "react-d3-speedometer";
import { Label } from "../ui/label";
import {
  getPollutionLevelText,
  getPollutionLevelTextColor,
  getSpeedometerColors,
  getMaxPollutionValue,
} from "../../utils/pollutionHelpers";

const PollutionDisplay = ({ avgPollutionRate, pollutant }) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6 pl-8 relative">
      <div className="absolute left-0 top-8 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <Label className="text-gray-700 font-medium">Pollution Rate:</Label>
        <span className="font-medium text-gray-900">{avgPollutionRate.toFixed(2)} µg/m³</span>
      </div>

      <motion.div
        className="flex flex-col items-center my-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ReactSpeedometer
          maxValue={getMaxPollutionValue(pollutant)}
          value={avgPollutionRate}
          needleColor="#166534"
          startColor="#4ade80"
          endColor="#ef4444"
          segments={5}
          width={250}
          height={150}
          ringWidth={30}
          needleHeightRatio={0.7}
          valueTextFontSize="16px"
          segmentColors={getSpeedometerColors()}
          currentValueText={`${avgPollutionRate.toFixed(2)} µg/m³`}
          customSegmentLabels={[
            { text: "Low", position: "INSIDE", color: "#1f2937" },
            { text: "Mod", position: "INSIDE", color: "#1f2937" },
            { text: "Mod+", position: "INSIDE", color: "#1f2937" },
            { text: "High", position: "INSIDE", color: "#1f2937" },
            { text: "V.High", position: "INSIDE", color: "#1f2937" },
          ]}
          labelFontSize="12px"
        />
        <div className="mt-2 text-center">
          <span className="text-sm font-medium">
            Current level:{" "}
            <span className={`font-semibold ${getPollutionLevelTextColor(avgPollutionRate)}`}>
              {getPollutionLevelText(avgPollutionRate)}
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

PollutionDisplay.propTypes = {
  avgPollutionRate: PropTypes.number.isRequired,
  pollutant: PropTypes.string.isRequired,
};

export default React.memo(PollutionDisplay);
