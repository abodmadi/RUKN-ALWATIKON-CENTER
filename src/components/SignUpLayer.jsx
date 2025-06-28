import { Icon } from "@iconify/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Patient Signup Schema
const patientSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required").matches(/^05[0-9]{8}$/, "Enter a valid UAE phone number"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  address: yup.string().required("Address is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpLayer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    alert("Patient signed up successfully!");
    reset();
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      {/* <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="Sign Up Visual" />
        </div>
      </div> */}

      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center "  style={{ minHeight: "100vh", width: "100%" }}>
        <div className="mx-auto py-20 w-100 rounded-5 shadow-lg" style={{ maxWidth: "460px" }}>
          {/* <Link href="/" className="mb-40 max-w-290-px d-block">
            <img src="assets/images/logo.png" alt="Logo" />
          </Link> */}

          <h4 className="mb-12 d-flex justify-content-center">Sign Up to your Account</h4>
          <p className="mb-32 text-secondary-light text-lg d-flex justify-content-center">
            Welcome! Please enter your details
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Username */}
            <div className="icon-field mb-3">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="f7:person" />
              </span>
              <input
                type="text"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.name ? "border-danger" : ""}`}
                placeholder="Username"
                {...register("name")}
              />
              {errors.name && <small className="text-danger">{errors.name.message}</small>}
            </div>

            {/* Email */}
            <div className="icon-field mb-3">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.email ? "border-danger" : ""}`}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            {/* Phone */}
            <div className="icon-field mb-3">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="bx:phone" />
              </span>
              <input
                type="text"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.phone ? "border-danger" : ""}`}
                placeholder="Phone"
                {...register("phone")}
              />
              {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
            </div>

            {/* Date of Birth */}
            <div className="icon-field mb-3">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="bi:calendar" />
              </span>
              <input
                type="date"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.dateOfBirth ? "border-danger" : ""}`}
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && <small className="text-danger">{errors.dateOfBirth.message}</small>}
            </div>

            {/* Address */}
            {/* <div className="icon-field mb-3">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="fluent:home-16-regular" />
              </span>
              <input
                type="text"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.address ? "border-danger" : ""}`}
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && <small className="text-danger">{errors.address.message}</small>}
            </div> */}

            {/* Password */}
            <div className="icon-field mb-4">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="solar:lock-password-outline" />
              </span>
              <input
                type="password"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.password ? "border-danger" : ""}`}
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
              <span className="mt-2 d-block text-sm text-secondary-light">
                Password must be at least 8 characters
              </span>
            </div>

            {/* Confirm Password */}
            <div className="icon-field mb-4">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="solar:lock-password-outline" />
              </span>
              <input
                type="password"
                className={`form-control h-56-px bg-neutral-50 radius-12 ${errors.confirmPassword ? "border-danger" : ""}`}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
            </div>


            <button type="submit" className="btn btn-primary w-100 py-3 radius-12">
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="mb-0">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary-600 fw-semibold">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
