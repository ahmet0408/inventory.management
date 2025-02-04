import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../env";

const useValidateToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Move navigation inside useEffect to avoid conditional hook calls
      localStorage.removeItem("token");
      navigate("/login");
      setIsLoading(false);
      return;
    }
    fetch(`${api}/user/validate-token`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error();
        setIsValid(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  return { isLoading, isValid };
};

export default useValidateToken;
