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
  const [showPassword, setShowPassword] = useState(false);

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
      // document.cookie = `token=${token}; path=/; max-age=86400`;
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = {
    admin: "solar:shield-user-bold",
    patient: "solar:user-heart-rounded-bold",
    volunteer: "solar:hand-heart-bold",
    doctor: "solar:medical-kit-bold",
    accountant: "solar:calculator-bold"
  };

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center" 
             style={{ 
               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
               fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
             }}>
      
      {/* Background Pattern */}
      <div className="position-absolute w-100 h-100" 
           style={{
             backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
             zIndex: 1
           }}>
      </div>

      <div className="container-fluid px-4" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-lg" 
                 style={{ 
                   borderRadius: "24px",
                   backdropFilter: "blur(20px)",
                   background: "rgba(255, 255, 255, 0.95)",
                   boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                 }}>
              
              <div className="card-body p-4 p-md-5">
                
                {/* Header Section */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 p-3">
                      <Icon icon="solar:lock-keyhole-bold" className="text-primary" style={{ fontSize: "2rem" }} />
                    </div>
                  </div>
                  <h2 className="fw-bold text-dark mb-2" style={{ fontSize: "1.75rem" }}>Welcome Back</h2>
                  <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                    Sign in to your account to continue
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                  
                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="form-label fw-medium text-dark mb-2" style={{ fontSize: "0.9rem" }}>
                      Email Address
                    </label>
                    <div className="position-relative">
                      <div className="position-absolute top-50 translate-middle-y ms-3" style={{ zIndex: 3 }}>
                        <Icon icon="solar:letter-bold" className="text-muted" />
                      </div>
                      <input
                        type="email"
                        className={`form-control ps-5 py-3 ${errors.email ? 'is-invalid border-danger' : ''}`}
                        placeholder="Enter your email"
                        style={{
                          borderRadius: "12px",
                          border: "2px solid #e9ecef",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#667eea"}
                        onBlur={(e) => !errors.email && (e.target.style.borderColor = "#e9ecef")}
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-flex align-items-center mt-2">
                          <Icon icon="solar:danger-circle-bold" className="me-1" />
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label className="form-label fw-medium text-dark mb-2" style={{ fontSize: "0.9rem" }}>
                      Password
                    </label>
                    <div className="position-relative">
                      <div className="position-absolute top-50 translate-middle-y ms-3" style={{ zIndex: 3 }}>
                        <Icon icon="solar:key-bold" className="text-muted" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ps-5 pe-5 py-3 ${errors.password ? 'is-invalid border-danger' : ''}`}
                        placeholder="Enter your password"
                        style={{
                          borderRadius: "12px",
                          border: "2px solid #e9ecef",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#667eea"}
                        onBlur={(e) => !errors.password && (e.target.style.borderColor = "#e9ecef")}
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 translate-middle-y end-0 me-2 p-1"
                        style={{ zIndex: 3 }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon 
                          icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} 
                          className="text-muted"
                        />
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback d-flex align-items-center mt-2">
                          <Icon icon="solar:danger-circle-bold" className="me-1" />
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-medium text-dark mb-2" style={{ fontSize: "0.9rem" }}>
                      Select Your Role
                    </label>
                    <div className="position-relative">
                      <div className="position-absolute top-50 translate-middle-y ms-3" style={{ zIndex: 3 }}>
                        <Icon icon="solar:users-group-rounded-bold" className="text-muted" />
                      </div>
                      <select
                        className={`form-select ps-5 py-3 ${errors.role ? 'is-invalid border-danger' : ''}`}
                        style={{
                          borderRadius: "12px",
                          border: "2px solid #e9ecef",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#667eea"}
                        onBlur={(e) => !errors.role && (e.target.style.borderColor = "#e9ecef")}
                        {...register("role")}
                      >
                        <option value="">Choose your role</option>
                        <option value="admin">👑 Admin</option>
                        <option value="patient">🏥 Patient</option>
                        <option value="volunteer">🤝 Volunteer</option>
                        <option value="doctor">👨‍⚕️ Doctor</option>
                        <option value="accountant">💼 Accountant</option>
                      </select>
                      {errors.role && (
                        <div className="invalid-feedback d-flex align-items-center mt-2">
                          <Icon icon="solar:danger-circle-bold" className="me-1" />
                          {errors.role.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="remember"
                        style={{ borderRadius: "4px" }}
                      />
                      <label className="form-check-label text-muted" htmlFor="remember" style={{ fontSize: "0.9rem" }}>
                        Remember me
                      </label>
                    </div>
                    <Link 
                      href="#" 
                      className="text-decoration-none fw-medium"
                      style={{ color: "#667eea", fontSize: "0.9rem" }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="btn w-100 py-3 mb-4 fw-bold text-white border-0 position-relative overflow-hidden"
                    disabled={loading}
                    style={{
                      background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      transform: loading ? "scale(0.98)" : "scale(1)"
                    }}
                    onMouseEnter={(e) => !loading && (e.target.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => !loading && (e.target.style.transform = "scale(1)")}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    )}
                    {loading ? "Signing In..." : "Sign In"}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                      Don't have an account?{" "}
                      <Link 
                        href="/sign-up" 
                        className="fw-bold text-decoration-none"
                        style={{ color: "#667eea" }}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;