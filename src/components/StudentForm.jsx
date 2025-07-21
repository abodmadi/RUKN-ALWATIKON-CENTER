// src/components/StudentForm.js

"use client"; // لو بتشتغل في Next.js App Router

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema with Google Drive check
const schema = yup.object().shape({
  studentId: yup.string().required("Please select a student"),
  note: yup
    .string()
    .required("Note is required")
    .url("Note must be a valid URL")
    .test("is-google-drive", "Note must be a Google Drive link", (value) => {
      if (!value) return false;
      
      // Check for various Google Drive URL formats
      const googleDrivePatterns = [
        /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/,
        /^https:\/\/docs\.google\.com\/document\/d\/[a-zA-Z0-9_-]+/,
        /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9_-]+/,
        /^https:\/\/docs\.google\.com\/presentation\/d\/[a-zA-Z0-9_-]+/,
        /^https:\/\/drive\.google\.com\/open\?id=[a-zA-Z0-9_-]+/,
        /^https:\/\/drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]+/
      ];
      
      return googleDrivePatterns.some(pattern => pattern.test(value));
    }),
});

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Watch the note field to check if it's valid
  const noteValue = watch("note");
  const isNoteValid = noteValue && !errors.note && noteValue.trim() !== "";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/authentication/patients`);
        console.log("API response:", res.data);
        setStudents(res.data.patients || []);
      } catch (err) {
        console.error("Error fetching students:", err);
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success feedback
      alert("Form submitted successfully!");
      reset();
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0 d-flex align-items-center">
                <i className="bi bi-person-plus-fill me-2"></i>
                Student Assignment Form
              </h5>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Student Selection */}
                <div className="mb-4">
                  <label htmlFor="studentId" className="form-label fw-semibold">
                    <i className="bi bi-person-fill text-primary me-2"></i>
                    Select Student
                  </label>
                  
                  <select
                    id="studentId"
                    className={`form-select ${errors.studentId ? "is-invalid" : ""}`}
                    {...register("studentId")}
                    disabled={isLoading}
                  >
                    <option value="">
                      {isLoading ? "Loading students..." : "-- Choose a student --"}
                    </option>
                    
                    {!isLoading && Array.isArray(students) && students.length > 0 ? (
                      students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.name}
                        </option>
                      ))
                    ) : !isLoading ? (
                      <option disabled>No students available</option>
                    ) : null}
                  </select>
                  
                  {errors.studentId && (
                    <div className="invalid-feedback d-flex align-items-center">
                      <i className="bi bi-exclamation-circle-fill me-1"></i>
                      {errors.studentId.message}
                    </div>
                  )}
                </div>

                {/* Note Input */}
                <div className="mb-4">
                  <label htmlFor="note" className="form-label fw-semibold">
                    <i className="bi bi-google text-primary me-2"></i>
                    Google Drive Note URL
                  </label>
                  
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-cloud-arrow-up"></i>
                    </span>
                    <input
                      type="url"
                      id="note"
                      className={`form-control ${
                        errors.note 
                          ? "is-invalid" 
                          : isNoteValid 
                          ? "is-valid" 
                          : ""
                      }`}
                      {...register("note")}
                      placeholder="https://drive.google.com/file/d/..."
                      disabled={isSubmitting}
                    />
                    
                    {/* Success feedback with green checkmark */}
                    {isNoteValid && (
                      <span className="input-group-text bg-success text-white border-success">
                        <i className="bi bi-check-circle-fill"></i>
                      </span>
                    )}
                    
                    {/* Error feedback */}
                    {errors.note && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <i className="bi bi-exclamation-circle-fill me-1"></i>
                        {errors.note.message}
                      </div>
                    )}
                    
                    {/* Success feedback message */}
                    {isNoteValid && (
                      <div className="valid-feedback d-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Valid Google Drive link detected!
                      </div>
                    )}
                  </div>
                  
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Only Google Drive links are accepted (docs, sheets, presentations, or files)
                  </div>
                  
                  {/* Accepted formats helper */}
                  <div className="mt-2">
                    <small className="text-muted">
                      <strong>Accepted formats:</strong>
                      <ul className="list-unstyled mt-1 ms-3">
                        <li><i className="bi bi-check-circle text-success me-1"></i> drive.google.com/file/d/...</li>
                        <li><i className="bi bi-check-circle text-success me-1"></i> docs.google.com/document/d/...</li>
                        <li><i className="bi bi-check-circle text-success me-1"></i> docs.google.com/spreadsheets/d/...</li>
                        <li><i className="bi bi-check-circle text-success me-1"></i> docs.google.com/presentation/d/...</li>
                      </ul>
                    </small>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={!isValid || isSubmitting || isLoading}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Confirm Assignment
                      </>
                    )}
                  </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="text-center mt-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2 mb-0">Loading students...</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;