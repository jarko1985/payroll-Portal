"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  email: z.string().email("Invalid email"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://payroll-portal-backend.onrender.com/auth/forgot-password",
        values
      );
      console.log(response);

      if (response.data.success === true) {
        toast.success("Check your email!!");
        form.reset();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="bg-white rounded-md shadow-md max-w-md mx-auto p-8 mt-28">
        <img
          src="/images/logo.svg"
          alt="logo"
          width="150px"
          height="100px"
          className="mx-auto"
        />
        <h2 className="text-center text-2xl font-semibold mt-6">
          Forgot Password
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button
                disabled={isLoading}
                className="mx-auto block w-[120px] bg-[#F72717] hover:bg-[#F72717] transition-transform hover:translate-y-[-.2rem] duration-200"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Please wait</span>
                    <svg
                      className="animate-spin h-5 w-5 text-white inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  </>
                ) : (
                  "Send Email"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* <p className="text-center pt-4">
          Already Registered?{" "}
          <span className="font-semibold underline">
            <a href="/login">Login here</a>
          </span>
        </p> */}
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
