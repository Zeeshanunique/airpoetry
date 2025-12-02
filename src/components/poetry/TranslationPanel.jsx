/**
 * Copyright (c) 2025 AI(R) Poetry. All rights reserved.
 *
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import { Globe } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TranslationLoadingState } from "../ui/loading-states";
import { TRANSLATION_LANGUAGES } from "../../constants/poemTypes";

const TranslationPanel = ({ currentLanguage, onLanguageChange, onTranslate, loading }) => {
  return (
    <Card className="border border-primary/20 shadow-xl bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-primary/10"></div>
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-primary/60 rounded-full mr-3"></div>
          <h3 className="text-xl font-serif text-primary">
            Translation
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-gray-700 font-medium">
              Translate To
            </Label>
            <Select value={currentLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger
                id="language"
                className="w-full border-gray-300 focus:border-primary shadow-sm"
              >
                <SelectValue>
                  {currentLanguage ? currentLanguage : "Select a language"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TRANSLATION_LANGUAGES.ORIGINAL}>Original</SelectItem>
                <SelectItem value={TRANSLATION_LANGUAGES.SPANISH}>Spanish</SelectItem>
                <SelectItem value={TRANSLATION_LANGUAGES.FRENCH}>French</SelectItem>
                <SelectItem value={TRANSLATION_LANGUAGES.GERMAN}>German</SelectItem>
                <SelectItem value={TRANSLATION_LANGUAGES.ITALIAN}>Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <TranslationLoadingState />
          ) : (
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 transition-colors"
              onClick={onTranslate}
              disabled={!currentLanguage || loading}
            >
              <div className="flex items-center justify-center">
                <Globe className="h-4 w-4 mr-2" />
                Translate
              </div>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

TranslationPanel.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onTranslate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default React.memo(TranslationPanel);
