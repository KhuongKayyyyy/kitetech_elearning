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
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Add your login logic here
      console.log("Login attempt:", { email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <Card className='backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10'>
          <CardHeader className='space-y-2 pb-8'>
            <div className='w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Lock className='h-6 w-6 text-white' />
            </div>
            <CardTitle className='text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Welcome back
            </CardTitle>
            <CardDescription className='text-center text-gray-600 text-base'>
              Sign in to your account to continue learning
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-6 px-8'>
              {error && (
                <Alert
                  variant='destructive'
                  className='border-red-200 bg-red-50'>
                  <AlertDescription className='text-red-700'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className='space-y-3'>
                <Label
                  htmlFor='email'
                  className='text-sm font-semibold text-gray-700'>
                  Email Address
                </Label>
                <div className='relative group'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-11 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white/50'
                    required
                  />
                </div>
              </div>

              <div className='space-y-3'>
                <Label
                  htmlFor='password'
                  className='text-sm font-semibold text-gray-700'>
                  Password
                </Label>
                <div className='relative group'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pl-11 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white/50'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none'>
                    {showPassword ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between pt-2'>
                <div className='flex items-center space-x-3'>
                  <input
                    id='remember'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors'
                  />
                  <Label
                    htmlFor='remember'
                    className='text-sm text-gray-600 font-medium'>
                    Remember me
                  </Label>
                </div>
                <Link
                  href='/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors'>
                  Forgot password?
                </Link>
              </div>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4 px-8 pb-8'>
              <Button
                type='submit'
                className='w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:scale-[1.02]'
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className='relative my-6'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-white text-gray-500 font-medium'>
                    or
                  </span>
                </div>
              </div>

              <div className='text-center text-sm text-gray-600'>
                Don't have an account?{" "}
                <Link
                  href='/signup'
                  className='text-blue-600 hover:text-blue-500 font-semibold transition-colors'>
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
