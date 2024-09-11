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
import { useNavigate, useParams } from "react-router-dom";
const formSchema = z.object({
  password: z.string().nonempty({
    message: "Password is required.",
  }),
});

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3001/auth/reset-password/" + token,
        values
      );
      console.log("Response from server:", response);

      if (response.data.success === true) {
        toast.success(response.data.message || "Password Reset Successful!!");
        form.reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
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
          Reset Password
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
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
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
