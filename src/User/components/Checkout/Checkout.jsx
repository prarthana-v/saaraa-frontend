import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAdddressForm from './DeliveryAdddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Add delivery Address', 'Order Summary', 'Payment Options'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());

  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get('step');

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // Remove the handleNext function and related state, since we don't need the next button
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="px-15 lg:px-20  mt-40">
      <Box sx={{ width: '100%', mt: '50px', mb: '60px' }}>
        {/* Stepper without Back/Next buttons */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          </React.Fragment>
        )}
      </Box>

      {/* Content for active step */}
      <div>
        {step == 2 ? <DeliveryAdddressForm /> : <OrderSummary />}
      </div>
    </div>
  );
}
