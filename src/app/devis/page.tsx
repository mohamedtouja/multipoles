'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';

// Form steps components will be imported from separate files
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import SuccessScreen from './components/SuccessScreen';

// Main form types
export type FormData = {
  // Step 1 - Project Info
  projectType: string;
  projectDescription: string;
  
  // Step 2 - Specifications
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  colors: string[];
  quantity: number;
  
  // Step 3 - Timeline & Budget
  deadline: string;
  budgetRange: string;
  
  // Step 4 - Contact Info
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: boolean;
};

export default function DevisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Initialize form with useForm hook
  const methods = useForm<FormData>({
    defaultValues: {
      projectType: '',
      projectDescription: '',
      dimensions: {
        width: 0,
        height: 0,
        depth: 0,
      },
      materials: [],
      colors: [],
      quantity: 1,
      deadline: '',
      budgetRange: '',
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      message: '',
      acceptTerms: false,
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, trigger, formState } = methods;
  
  // Navigate to next step after validation
  const goToNextStep = async () => {
    let fieldsToValidate: any[] = [];
    
    // Define which fields to validate for each step
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['projectType', 'projectDescription'];
        break;
      case 2:
        fieldsToValidate = ['dimensions', 'materials', 'quantity'];
        break;
      case 3:
        fieldsToValidate = ['deadline', 'budgetRange'];
        break;
      case 4:
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'acceptTerms'];
        break;
      default:
        break;
    }
    
    // Validate the fields for the current step
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit the form
        handleSubmit(onSubmit)();
      }
    }
  };
  
  // Go back to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Form submission handler
  const onSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
    // Here you would normally send the data to your backend
    setIsSubmitted(true);
  };
  
  // Progress indicator
  const progressPercentage = (currentStep / 4) * 100;
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-6"
            >
              Demande de devis
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Remplissez ce formulaire pour recevoir une proposition personnalisée pour votre projet
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isSubmitted ? (
              <>
                {/* Progress bar */}
                <div className="mb-10">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-navy">
                      Étape {currentStep} sur 4
                    </span>
                    <span className="text-sm font-medium text-navy">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-navy h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                {/* Form steps */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <FormProvider {...methods}>
                    <form>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {currentStep === 1 && <StepOne />}
                          {currentStep === 2 && <StepTwo />}
                          {currentStep === 3 && <StepThree />}
                          {currentStep === 4 && <StepFour />}
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-10">
                        <button
                          type="button"
                          onClick={goToPreviousStep}
                          className={`px-6 py-3 rounded-md font-medium transition-colors ${
                            currentStep === 1
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-navy bg-gray-100 hover:bg-gray-200'
                          }`}
                          disabled={currentStep === 1}
                        >
                          Précédent
                        </button>
                        <button
                          type="button"
                          onClick={goToNextStep}
                          className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy-dark transition-colors"
                        >
                          {currentStep === 4 ? 'Envoyer' : 'Suivant'}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </>
            ) : (
              <SuccessScreen />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
