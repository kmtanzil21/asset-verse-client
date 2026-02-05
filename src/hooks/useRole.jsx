import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxios from "./useAxios";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { isLoading, data } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`); // your route
      return res.data; // { role: "hr" }
    },
  });

  // ✅ convert object -> string
  const role = data?.role || "employee";

  return { role, isLoading };
};

export default useRole;
