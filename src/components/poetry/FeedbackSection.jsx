import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const FeedbackSection = ({ feedbackText, onFeedbackChange, onSubmit }) => {
  const maxLength = 500;
  const remaining = maxLength - feedbackText.length;

  return (
    <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-medium text-gray-700">Share Your Feedback</div>
        <div className={`text-xs ${remaining < 50 ? 'text-amber-600' : 'text-gray-400'}`}>
          {remaining} characters remaining
        </div>
      </div>
      <Textarea
        value={feedbackText}
        onChange={onFeedbackChange}
        placeholder="What do you think about this poem? How does it make you feel?"
        className="resize-none mb-3 border-gray-200 focus:border-primary"
        rows={3}
        maxLength={maxLength}
      />
      <Button
        onClick={onSubmit}
        variant="outline"
        className="w-full text-primary border-primary/30 hover:bg-primary/5 transition-colors"
        disabled={!feedbackText.trim()}
      >
        Submit Feedback
      </Button>
    </div>
  );
};

FeedbackSection.propTypes = {
  feedbackText: PropTypes.string.isRequired,
  onFeedbackChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(FeedbackSection);
