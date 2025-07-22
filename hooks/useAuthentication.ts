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
        const response = await authRepository.getUserInfo();
        setUser(response.data);
      } catch (err: any) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (payload: { username: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.login(payload);
      setUser(result.userInfo);
      return result;
    } catch (err: any) {
      setError(err);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { user, setUser, loading, error, login, logout };
};