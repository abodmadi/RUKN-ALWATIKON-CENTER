"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["admin", "patient", "volunteer", "doctor", "accountant"], "Please select a valid role"),
});

const SignInLayer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/authentication/signin/${data.role}`;

    try {
      const response = await axios.post(loginUrl, {
        email: data.email,
        password: data.password,
      }, { withCredentials: true });

      localStorage.setItem("token", response.data.accessToken);

      const redirectMap = {
        admin: "/",
        patient: "/email",
        volunteer: "/text-generator",
        doctor: "/chat-message",
        accountant: "/Payment-Transactions",
      };

      router.push(`http://localhost:3000${redirectMap[data.role] || "/"}`);
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      {/* <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div> */}
      <div className="py-32 px-24 d-flex justify-content-center align-items-center " style={{ minHeight: "100vh", width: "100%" }}>
        <div
  className="bg-white shadow rounded-4 p-20 p-md-5 w-100"
  style={{ maxWidth: "460px" }}
>
          {/* <Link href="/" className="mb-40 max-w-290-px">
            <img src="assets/images/logo.png" alt="Logo" />
          </Link> */}
          <h4 className="mb-12">Sign In to your Account</h4>
          <p className="mb-32 text-secondary-light text-lg">
            Welcome back! Please enter your details
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.email ? 'border-danger' : ''}`}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            {/* Password Field */}
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type="password"
                  className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.password ? 'border-danger' : ''}`}
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>

            {/* Role Dropdown */}
            <div className="mb-16">
              <label htmlFor="role" className="form-label">Select Role</label>
              <select
                id="role"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.role ? 'border-danger' : ''}`}
                {...register("role")}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
                <option value="volunteer">Volunteer</option>
                <option value="doctor">Doctor</option>
                <option value="accountant">Accountant</option>
              </select>
              {errors.role && <small className="text-danger">{errors.role.message}</small>}
            </div>

            <div className="d-flex justify-content-between gap-2">
              <div className="form-check style-check d-flex align-items-center">
                <input className="form-check-input border border-neutral-300" type="checkbox" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <Link href="#" className="text-primary-600 fw-medium">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Don’t have an account?{" "}
                <Link href="/sign-up" className="text-primary-600 fw-semibold">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
    </section>
  );
};

export default SignInLayer;
