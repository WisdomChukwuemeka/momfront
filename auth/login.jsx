import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../components/services/api";
import { useState, useEffect } from "react";

export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setcredentials((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const response = await AuthAPI.login(credentials);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem(
        "is_superuser",
        JSON.stringify(response.data.user.is_superuser)
      );
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(""), 2000);
      const is_superuser = JSON.parse(localStorage.getItem("is_superuser"));
      if (is_superuser) {
        navigate("/", { replace: true });
      }
      window.dispatchEvent(new Event("authChange"));
      onLogin(response.data.user);
    } catch (error) {
      setError(
        error.response?.data?.email?.[0] ||
          error.response?.data?.password?.[0] ||
          error.response?.data?.non_field_errors?.[0] ||
          error.response?.data?.detail ||
          "An unexpected error occurred. Please try again."
      );
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center p-8 md:p-30 container mx-auto ">
        <div className="">
          <div>
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome Admin
            </h2>
            {success && (
              <div className="text-green-600 text-center">{success}</div>
            )}
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="mt-1 block w-full px-4 py-3 md:py-4 md:text-2xl border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="mt-1 block w-full px-4 py-3 
                md:py-4 md:text-2xl border border-gray-300 
                rounded-md shadow-sm focus:ring-blue-500 
                focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-3 md:py-4 md:text-3xl flex justify-center items-center gap-2 
    ${
      loading
        ? "bg-green-400 cursor-not-allowed"
        : "bg-blue-800 hover:bg-blue-700"
    }
    rounded-md text-white font-semibold transition-colors`}
              >
                {loading && <i className="bi bi-arrow-repeat animate-spin"></i>}
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Extra link */}
            <p className="text-center text-sm md:text-2xl mt-6 text-gray/70">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
