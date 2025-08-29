"use client";
import { useEffect, useState } from "react";
import { authService } from "@/app/data/services/authService";
import { authRepository } from "@/app/data/respository/authRepository";

let cachedUser: any = null;
let cachedLoading: boolean = false;
let cachedError: Error | null = null;

export const useAuthentication = () => {
  const [user, setUser] = useState<any>(cachedUser);
  const [loading, setLoading] = useState(cachedLoading);
  const [error, setError] = useState<Error | null>(cachedError);

  useEffect(() => {
    if (cachedUser !== null) return;
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        cachedLoading = true;
        setError(null);
        cachedError = null;
        const response = await authRepository.getUserInfo();
        setUser(response.data);
        cachedUser = response.data;
      } catch (err: any) {
        setError(err);
        cachedError = err;
        setUser(null);
        cachedUser = null;
      } finally {
        setLoading(false);
        cachedLoading = false;
      }
    };
    fetchUser();
  }, []);

  const login = async (payload: { username: string; password: string }) => {
    try {
      setLoading(true);
      cachedLoading = true;
      setError(null);
      cachedError = null;
      const result = await authService.login(payload);
      setUser(result.userInfo);
      cachedUser = result.userInfo;
      return result;
    } catch (err: any) {
      setError(err);
      cachedError = err;
      setUser(null);
      cachedUser = null;
      throw err;
    } finally {
      setLoading(false);
      cachedLoading = false;
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      cachedUser = null;
    } catch (err) {
      setError(err as Error);
      cachedError = err as Error;
    }
  };

  return { user, setUser, loading, error, login, logout };
};