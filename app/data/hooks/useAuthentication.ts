import { useEffect, useState } from "react";
import { authService } from "@/app/data/services/authService";
import { authRepository } from "@/app/data/respository/authRepository";

export const useAuthentication = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting to fetch user info...");
        const response = await authRepository.getUserInfo();
        setUser(response.data);
        console.log("Fetched user info:", response.data);
      } catch (err: any) {
        setError(err);
        setUser(null);
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const login = async (payload: { username: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Attempting login with:", payload);
      const result = await authService.login(payload);
      setUser(result.userInfo);
      console.log("Login successful, user info:", result.userInfo);
      return result;
    } catch (err: any) {
      setError(err);
      setUser(null);
      console.error("Login error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      console.log("Logged out successfully");
    } catch (err) {
      setError(err as Error);
      console.error("Logout error:", err);
    }
  };

  return { user, setUser, loading, error, login, logout };
}; 