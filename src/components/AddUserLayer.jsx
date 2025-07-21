'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SuccessToast from './SuccessToast'; 
import { useState } from 'react';

//schema 
const schema = yup.object().shape({
  name: yup.string().required("Full name is required").min(2,"name must be at least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+\d{7,15}$/, "Enter a valid phone number"),
  gender: yup.string().oneOf(["male", "female"], "Gender is required").required("Gender is required"),
});




const AddUserLayer = () => {
  const router = useRouter();

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
const [showSuccess, setShowSuccess] = useState(false);
  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      phone: data.phone,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authentication/signup/patient`, payload);
     if (response.status === 201) {
  setShowSuccess(true);     
  reset();                  
  setTimeout(() => {
    router.push('/users-list'); 
  }, 3000);
}

    } catch (error) {
      console.error("Error during registration:", error);
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
                <h6 className='text-md text-primary-light mb-16'>Add Student</h6>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Full Name */}
                  <div className='mb-20'>
                    <label className='form-label'>Full Name</label>
                    <input
                      type='text'
                      className={`form-control radius-8 ${errors.name ? 'border-danger' : ''}`}
                      placeholder='Enter Full Name'
                      {...register("name")}
                    />
                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
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

                  {/*  Phone Number with country selector */}
                  <div className='mb-20'>
                    <label className='form-label'>Phone Number</label>
                    <PhoneInput
                      country={'ae'} 
                      value={watch("phone")}
                      onChange={(value) => setValue("phone", `+${value}`,{shouldValidate:true})}
                      enableSearch={true}
                      inputClass={`form-control w-100 ${errors.phone ? 'border-danger' : ''}`}
                      specialLabel={null}
                      inputStyle={{ borderRadius: '8px' }}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                  </div>

                  {/* Gender */}
                  <div className='mb-20'>
                    <label className='form-label'>Gender</label>
                    <select
                      className={`form-control radius-8 ${errors.gender ? 'border-danger' : ''}`}
                      {...register("gender")}
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
                  </div>

                  <div className='d-flex justify-content-between mt-4'>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={() => router.push('/users-list')}
                    >
                      Cancel
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Save
                    </button>
                  </div>

                </form>
                {showSuccess && <SuccessToast onClose={() => setShowSuccess(false)} />}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserLayer;
