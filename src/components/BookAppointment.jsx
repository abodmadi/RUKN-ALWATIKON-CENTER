"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEvaluation, setSelectedEvaluation] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const steps = [
    { number: 1, label: 'Select Evaluation Type' },
    { number: 2, label: 'Request Evaluation' },
    { number: 3, label: 'Pay' },
    { number: 4, label: 'Complete' }
  ];

  const evaluationTypes = [
    'School Evaluation',
    'Full Package Evaluation',
    'Single Session',
    'Free Medical Consultation'
  ];

  const availableDays = [
    'Monday',
    'Tuesday', 
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM'
  ];

  const availableServices = [
    'Psychological Assessment',
    'Behavioral Analysis',
    'Learning Disability Evaluation',
    'ADHD Assessment',
    'Autism Screening',
    'Educational Planning'
  ];

  const handleNext = () => {
    if (currentStep === 1 && selectedEvaluation) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedDay && selectedTime && description.trim()) {
      // Check if Single Session is selected and services are required
      if (selectedEvaluation === 'Single Session' && selectedServices.length === 0) {
        return; // Don't proceed without services for Single Session
      }
      setCurrentStep(3);
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleEvaluationSelect = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setIsDropdownOpen(false);
    // Reset services when evaluation type changes
    setSelectedServices([]);
  };

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <style jsx>{`
        .progress-container {
          position: relative;
          margin-bottom: 3rem;
        }
        
        .progress-line {
          position: absolute;
          top: 1.5rem;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #e9ecef;
          z-index: 1;
        }
        
        .progress-line-fill {
          height: 100%;
          background-color: #0d6efd;
          transition: width 0.3s ease;
        }
        
        .step-circle {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 0.9rem;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .step-circle.active {
          background-color: #0d6efd;
          color: white;
        }
        
        .step-circle.inactive {
          background-color: #e9ecef;
          color: #6c757d;
        }
        
        .step-label {
          font-size: 0.85rem;
          font-weight: 500;
          margin-top: 0.5rem;
          text-align: center;
        }
        
        .step-label.active {
          color: #0d6efd;
        }
        
        .step-label.inactive {
          color: #6c757d;
        }
        
        .dropdown-container {
          position: relative;
        }
        
        .custom-dropdown {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #86b7fe;
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
          display: flex;
          justify-content: between;
          align-items: center;
          transition: border-color 0.2s ease;
        }
        
        .custom-dropdown:hover,
        .custom-dropdown:focus {
          border-color: #0d6efd;
          outline: none;
        }
        
        .dropdown-menu-custom {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-height: 15rem;
          overflow-y: auto;
          margin-top: 0.25rem;
        }
        
        .dropdown-item-custom {
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        
        .dropdown-item-custom:hover {
          background-color: #f8f9fa;
        }
        
        .btn-custom {
          transition: all 0.2s ease;
        }
        
        .date-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #86b7fe;
          border-radius: 0.5rem;
          background: white;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }
        
        .date-input:hover,
        .date-input:focus {
          border-color: #0d6efd;
          outline: none;
        }
          width: 4rem;
          height: 4rem;
          background-color: #d1e7dd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
      `}</style>

      <div className="bg-light min-vh-100 py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  {/* Header */}
                  <div className="mb-4">
                    <h1 className="h2 fw-semibold text-dark mb-2">Book An Appointment</h1>
                    <p className="text-muted mb-0">Fill up your details and proceed to the next steps.</p>
                  </div>

                  {/* Progress Steps */}
                  <div className="progress-container">
                    <div className="progress-line">
                      <div 
                        className="progress-line-fill"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                      />
                    </div>
                    
                    <div className="row text-center">
                      {steps.map((step) => (
                        <div key={step.number} className="col">
                          <div className={`step-circle ${step.number <= currentStep ? 'active' : 'inactive'}`}>
                            {step.number}
                          </div>
                          <div className={`step-label ${step.number <= currentStep ? 'active' : 'inactive'}`}>
                            {step.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 1: Select Evaluation Type */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="h4 fw-semibold text-dark mb-4">Select Evaluation Type</h2>
                      
                      <div className="mb-4">
                        <label className="form-label fw-medium text-dark mb-2">
                          Select Evaluation type
                        </label>
                        
                        <div className="dropdown-container">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="custom-dropdown"
                          >
                            <span className={selectedEvaluation ? 'text-dark' : 'text-muted'}>
                              {selectedEvaluation || 'Select Evaluation Type'}
                            </span>
                            <ChevronDown 
                              size={20}
                              className={`text-muted ms-2 ${isDropdownOpen ? '' : ''}`}
                              style={{ 
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            />
                          </button>

                          {isDropdownOpen && (
                            <div className="dropdown-menu-custom">
                              {evaluationTypes.map((evaluation, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleEvaluationSelect(evaluation)}
                                  className="dropdown-item-custom"
                                >
                                  {evaluation}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        <button
                          onClick={handleNext}
                          disabled={!selectedEvaluation}
                          className={`btn px-4 py-2 fw-medium btn-custom ${
                            selectedEvaluation
                              ? 'btn-dark'
                              : 'btn-secondary'
                          }`}
                          style={{ 
                            opacity: selectedEvaluation ? 1 : 0.6,
                            cursor: selectedEvaluation ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Request Evaluation */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="h4 fw-semibold text-dark mb-4">Request Evaluation</h2>
                      
                      <div className="row mb-4">
                        {/* Select Day with Calendar */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-medium text-dark mb-2">
                            Select Day<span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="date-input"
                            value={selectedDay}
                            min={getTodayDate()}
                            onChange={(e) => setSelectedDay(e.target.value)}
                          />
                          {selectedDay && (
                            <small className="text-muted mt-1 d-block">
                              Selected: {formatDateForDisplay(selectedDay)}
                            </small>
                          )}
                        </div>

                        {/* Select Time */}
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-medium text-dark mb-2">
                            Select Time<span className="text-danger">*</span>
                          </label>
                          <div className="dropdown-container">
                            <button
                              type="button"
                              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                              className="custom-dropdown"
                            >
                              <span className={selectedTime ? 'text-dark' : 'text-muted'}>
                                {selectedTime || 'Select a time'}
                              </span>
                              <ChevronDown 
                                size={20}
                                className="text-muted ms-2"
                                style={{ 
                                  transform: isTimeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s ease'
                                }}
                              />
                            </button>
                            {isTimeDropdownOpen && (
                              <div className="dropdown-menu-custom">
                                {availableTimes.map((time, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                      setSelectedTime(time);
                                      setIsTimeDropdownOpen(false);
                                    }}
                                    className="dropdown-item-custom"
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <label className="form-label fw-medium text-dark mb-2">
                          Description<span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Write your description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          style={{
                            border: '2px solid #86b7fe',
                            borderRadius: '0.5rem'
                          }}
                        />
                      </div>

                      {/* Select Services - Only show for Single Session */}
                      {selectedEvaluation === 'Single Session' && (
                        <div className="mb-4">
                          <label className="form-label fw-medium text-dark mb-2">
                            Select Service(s)<span className="text-danger">*</span>
                          </label>
                          <div className="dropdown-container">
                            <button
                              type="button"
                              onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                              className="custom-dropdown"
                            >
                              <span className={selectedServices.length > 0 ? 'text-dark' : 'text-muted'}>
                                {selectedServices.length > 0 
                                  ? `${selectedServices.length} service(s) selected`
                                  : 'Pick one or more services...'
                                }
                              </span>
                              <ChevronDown 
                                size={20}
                                className="text-muted ms-2"
                                style={{ 
                                  transform: isServiceDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s ease'
                                }}
                              />
                            </button>
                            {isServiceDropdownOpen && (
                              <div className="dropdown-menu-custom">
                                {availableServices.map((service, index) => (
                                  <div key={index} className="d-flex align-items-center px-3 py-2">
                                    <input
                                      type="checkbox"
                                      id={`service-${index}`}
                                      checked={selectedServices.includes(service)}
                                      onChange={() => handleServiceToggle(service)}
                                      className="form-check-input me-2"
                                    />
                                    <label 
                                      htmlFor={`service-${index}`}
                                      className="form-check-label flex-grow-1 mb-0"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {service}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {selectedServices.length > 0 && (
                            <div className="mt-2">
                              <small className="text-muted">Selected services:</small>
                              <div className="mt-1">
                                {selectedServices.map((service, index) => (
                                  <span key={index} className="badge bg-primary me-1 mb-1">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="d-flex justify-content-between mt-4">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="btn btn-secondary px-4 py-2 fw-medium btn-custom"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={
                            !selectedDay || 
                            !selectedTime || 
                            !description.trim() ||
                            (selectedEvaluation === 'Single Session' && selectedServices.length === 0)
                          }
                          className={`btn px-4 py-2 fw-medium btn-custom ${
                            selectedDay && selectedTime && description.trim() && 
                            (selectedEvaluation !== 'Single Session' || selectedServices.length > 0)
                              ? 'btn-dark'
                              : 'btn-secondary'
                          }`}
                          style={{ 
                            opacity: selectedDay && selectedTime && description.trim() && 
                            (selectedEvaluation !== 'Single Session' || selectedServices.length > 0) ? 1 : 0.6,
                            cursor: selectedDay && selectedTime && description.trim() && 
                            (selectedEvaluation !== 'Single Session' || selectedServices.length > 0) ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="h4 fw-semibold text-dark mb-4">Payment</h2>
                      <div className="text-center py-5">
                        <p className="text-muted mb-3">
                          Processing payment for: <span className="fw-medium text-dark">{selectedEvaluation}</span>
                        </p>
                        <p className="text-muted mb-4">Payment details and processing would go here...</p>
                        <button
                          onClick={() => setCurrentStep(4)}
                          className="btn btn-dark px-4 py-2 fw-medium btn-custom"
                        >
                          Complete Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Complete */}
                  {currentStep === 4 && (
                    <div>
                      <h2 className="h4 fw-semibold text-dark mb-4">Complete</h2>
                      <div className="text-center py-5">
                        <div className="success-icon">
                          <svg width="32" height="32" fill="#198754" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" stroke="currentColor" fill="none"/>
                          </svg>
                        </div>
                        <h3 className="h5 fw-semibold text-dark mb-2">Appointment Booked Successfully!</h3>
                        <p className="text-muted mb-3">
                          Your <span className="fw-medium">{selectedEvaluation}</span> has been scheduled.
                        </p>
                        <p className="text-muted mb-4">You will receive a confirmation email shortly with appointment details.</p>
                        <button
                          onClick={() => {
                            setCurrentStep(1);
                            setSelectedEvaluation('');
                            setSelectedDay('');
                            setSelectedTime('');
                            setDescription('');
                            setSelectedServices([]);
                          }}
                          className="btn btn-primary px-4 py-2 fw-medium btn-custom"
                        >
                          Book Another Appointment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS CDN */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </>
  );
}