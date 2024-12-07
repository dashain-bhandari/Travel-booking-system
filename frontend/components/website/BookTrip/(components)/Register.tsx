"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "@/public/contour_expeditions_logo.png";
import Image from "next/image";
// import { supabase } from "@/utils/supabase/supabaseClient";
import { Eye, EyeOff, Loader } from "lucide-react";

// SOCIAL images
import Instagram from "@/public/Social/instagram.png";
import Facebook from "@/public/Social/facebook.png";
import Whatsapp from "@/public/Social/whatsapp.png";
import { AxiosInstance } from "@/utils";
import { toast } from "sonner";

type Props = {};

const formSchema = z
  .object({
    email: z
      .string()
      .min(8, {
        message: "Must be at least 10 characters.",
      })
      .email()
      .max(40, {
        message: "Must be less than 40 characters.",
      }),

    password: z
      .string()
      .min(7, {
        message: "Password must be at least 7 characters.",
      })
      .max(22, {
        message: "Password must be less than 22 characters.",
      }),

    confirmPassword: z
      .string()
      .min(7, {
        message: "Password must be at least 7 characters.",
      })
      .max(22, {
        message: "Password must be less than 22 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterTab({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsRegistering(true);
      const res = await AxiosInstance.post("/users/register", values);
      toast.success(res.data.msg);
      setIsRegistering(false);
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setIsRegistering(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full  md:col-span-2  "
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    Email <span className="text-yellow-500 text-sm">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    Password <span className="text-yellow-500 text-sm">*</span>
                  </FormLabel>
                  {/* <FormControl>
                    <Input type="text" placeholder="Password" {...field} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl> */}
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      size={18}
                      className="absolute top-1/2 right-2 transform cursor-pointer text-primary-400 "
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      size={18}
                      className="absolute top-1/2 right-2 transform cursor-pointer text-primary-400 "
                    />
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>
                    Confirm Password{" "}
                    <span className="text-yellow-500 text-sm">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      //   type={showPassword ? 'text' : 'password'}
                      // type="text"
                      placeholder="********"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  {showConfirmPassword ? (
                    <EyeOff
                      onClick={() => setShowConfirmPassword(false)}
                      size={18}
                      className="absolute right-2 top-1/2 transform cursor-pointer text-primary-400 "
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowConfirmPassword(true)}
                      size={18}
                      className="absolute right-2 top-1/2 transform cursor-pointer text-primary-400 "
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 
                  <Button
                    disabled={isRegistering}
                    type="submit"
                    className="flex w-full items-center"
                  >
                    {isRegistering && (
                      <Loader size={16} className="mr-2 animate-spin" />
                    )}
                    Register
                  </Button> */}

            <button
              disabled={isRegistering}
              type="submit"
              className="text-white  w-fit  bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-10 py-2.5 text-center me-2  flex items-center gap-1"
            >
              {isRegistering && (
                <Loader size={16} className="animate-spin mr-2" />
              )}
              Register
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
