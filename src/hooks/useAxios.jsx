import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

// Export this instance separately (shared axios client)
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // If AuthContext not ready, return plain instance (no interceptors)
  if (!auth) return axiosInstance;

  const { user, logOut } = auth;

  useEffect(() => {
    // Request interceptor: attach Firebase ID token
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          if (user) {
            // Always get a valid token (refresh if needed)
            const token = await user.getIdToken();
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          // If token fetching fails, proceed without it
          console.error("Failed to attach token:", e);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: handle unauthorized globally
    const resInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status;

        if ((status === 401 || status === 403) && logOut) {
          try {
            await logOut();
          } catch (e) {
            console.error("Logout failed:", e);
          }
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxios;
