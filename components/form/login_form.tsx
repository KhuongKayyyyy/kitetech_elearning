"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Loader2,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useAuthentication } from "@/app/data/hooks/useAuthentication";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("nguyendatkhuong");
  const [password, setPassword] = useState("datkhuong1123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error } = useAuthentication();
  const [localError, setLocalError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    try {
      const result = await login({ username: email, password });
      console.log("Login result with user info:", result);
      router.push("/course");
      toast.success(`Welcome back, ${result.userInfo?.full_name || "User"}!`);
    } catch (err: any) {
      setLocalError(
        err?.message || "Invalid username or password. Please try again."
      );
    }
  };

  return (
    <div className='w-full max-w-lg'>
      <Card className='backdrop-blur-xl bg-white/95 border border-white/30 shadow-2xl shadow-blue-500/20 rounded-3xl overflow-hidden'>
        <CardHeader className='space-y-4 pb-8 bg-gradient-to-r from-blue-600/10 to-indigo-600/10'>
          <div className='w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30'>
            <GraduationCap className='h-10 w-10 text-white' />
          </div>
          <CardTitle className='text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            Welcome Back
          </CardTitle>
          <CardDescription className='text-center text-gray-600 text-lg max-w-sm mx-auto leading-relaxed'>
            Sign in to access your student portal and continue your academic
            journey
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-8 px-8 py-6'>
            {(localError || error) && (
              <Alert
                variant='destructive'
                className='border-red-200 bg-red-50/90 backdrop-blur-sm rounded-xl animate-in slide-in-from-top-2 duration-300'>
                <AlertDescription className='text-red-700 font-medium'>
                  {localError ||
                    (typeof error === "string" ? error : error?.message)}
                </AlertDescription>
              </Alert>
            )}

            <div className='space-y-3'>
              <Label
                htmlFor='email'
                className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                <User className='h-4 w-4 text-blue-600' />
                Username
              </Label>
              <div className='relative group'>
                <Input
                  id='email'
                  type='text'
                  placeholder='Enter your username'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl text-lg placeholder:text-gray-400 hover:border-gray-300 hover:shadow-lg'
                  required
                />
                <div className='absolute inset-y-0 right-4 flex items-center'>
                  {email && (
                    <CheckCircle className='h-5 w-5 text-green-500 animate-in zoom-in-50 duration-200' />
                  )}
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <Label
                htmlFor='password'
                className='text-sm font-bold text-gray-700 flex items-center gap-2'>
                <Lock className='h-4 w-4 text-blue-600' />
                Password
              </Label>
              <div className='relative group'>
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-14 pr-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl text-lg placeholder:text-gray-400 hover:border-gray-300 hover:shadow-lg'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-all duration-200 focus:outline-none p-2 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-500/20'>
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between pt-4'>
              <div className='flex items-center space-x-3'>
                <div className='relative'>
                  <input
                    id='remember'
                    type='checkbox'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className='h-5 w-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200 cursor-pointer hover:border-blue-400'
                  />
                </div>
                <Label
                  htmlFor='remember'
                  className='text-sm text-gray-700 font-medium cursor-pointer select-none hover:text-gray-900 transition-colors'>
                  Remember me for 30 days
                </Label>
              </div>
              <Link
                href='/forgot-password'
                className='text-sm text-blue-600 hover:text-blue-700 font-semibold transition-all duration-200 hover:underline hover:scale-105'>
                Forgot password?
              </Link>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col space-y-6 px-8 pb-8'>
            <Button
              type='submit'
              className='w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='mr-3 h-5 w-5 animate-spin' />
                  Signing you in...
                </>
              ) : (
                <>
                  <Lock className='mr-3 h-5 w-5' />
                  Sign In to Portal
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}
