'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import SuccessToast from './SuccessToast';

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required").min(2, "Username must be at least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+\d{7,15}$/, "Enter a valid phone number"),
  title: yup.string().required("Title is required"),
  availability: yup.string().oneOf(["Available", "Not Available"]).required("Availability is required"),
});

const AddDoctorLayer = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authentication/signup/doctor`, data);
      if (response.status === 201) {
        setShowSuccess(true);
        reset();
        setTimeout(() => {
          router.push('/doctor-list');
        }, 3000);
      }
    } catch (error) {
      console.error("Error during doctor registration:", error);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className='card h-100 p-0 radius-12'>
      <div className='card-body p-24'>
        <div className='row justify-content-center'>
          <div className='col-xxl-6 col-xl-8 col-lg-10'>
            <div className='card border'>
              <div className='card-body'>
                <h6 className='text-md text-primary-light mb-16'>Add Doctor</h6>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Username */}
                  <div className='mb-20'>
                    <label className='form-label'>Username</label>
                    <input
                      type='text'
                      className={`form-control radius-8 ${errors.username ? 'border-danger' : ''}`}
                      placeholder='Enter Username'
                      {...register("username")}
                    />
                    {errors.username && <small className="text-danger">{errors.username.message}</small>}
                  </div>

                  {/* Email */}
                  <div className='mb-20'>
                    <label className='form-label'>Email</label>
                    <input
                      type='email'
                      className={`form-control radius-8 ${errors.email ? 'border-danger' : ''}`}
                      placeholder='Enter Email'
                      {...register("email")}
                    />
                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                  </div>

                  {/* Password */}
                  <div className='mb-20'>
                    <label className='form-label'>Password</label>
                    <input
                      type='password'
                      className={`form-control radius-8 ${errors.password ? 'border-danger' : ''}`}
                      placeholder='Enter Password'
                      {...register("password")}
                    />
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                  </div>

                  {/* Phone */}
                  <div className='mb-20'>
                    <label className='form-label'>Phone Number</label>
                    <PhoneInput
                      country={'eg'}
                      value={watch("phone")}
                      onChange={(value) => setValue("phone", `+${value}`, { shouldValidate: true })}
                      enableSearch
                      inputClass={`form-control w-100 ${errors.phone ? 'border-danger' : ''}`}
                      specialLabel={null}
                      inputStyle={{ borderRadius: '8px' }}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                  </div>

                  {/* Title */}
                  <div className='mb-20'>
                    <label className='form-label'>Title</label>
                    <input
                      type='text'
                      className={`form-control radius-8 ${errors.title ? 'border-danger' : ''}`}
                      placeholder='e.g. Cardiologist'
                      {...register("title")}
                    />
                    {errors.title && <small className="text-danger">{errors.title.message}</small>}
                  </div>

                  {/* Availability */}
                  <div className='mb-20'>
                    <label className='form-label'>Availability</label>
                    <select
                      className={`form-control radius-8 ${errors.availability ? 'border-danger' : ''}`}
                      {...register("availability")}
                    >
                      <option value="">-- Select --</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                    {errors.availability && <small className="text-danger">{errors.availability.message}</small>}
                  </div>

                  {/* Actions */}
                  <div className='d-flex justify-content-between mt-4'>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={() => router.push('/doctor-list')}
                    >
                      Cancel
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Save
                    </button>
                  </div>
                </form>

                {showSuccess && <SuccessToast message="Doctor added successfully!" onClose={() => setShowSuccess(false)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorLayer;
