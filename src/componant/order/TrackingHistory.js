// TrackingHistory.js
import React from "react";
import { Box } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const TrackingHistory = ({ activeStep }) => {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={0}>
          <StepLabel>Order Dispatch</StepLabel>
          <StepContent>
            <p>Your order has been dispatched.</p>
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>Order Delivered</StepLabel>
          <StepContent>
            <p>Your order has been delivered.</p>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
};

export default TrackingHistory;
