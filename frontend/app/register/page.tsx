"use client";
import React, { useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";

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
      })
      ,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterTab({}: Props) {
  const router = useRouter();
  const { currentUser }: any = useContext(GlobalContext);
  console.log(currentUser);

  // if (currentUser !== undefined) {
  //   router.push("/");
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsRegistering(true);
      const res = await AxiosInstance.post("/users/register", values);
      console.log(res.data.data)
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
    <div className="flex items-center justify-center pb-[3rem]  pt-[6rem] w-full">
      <div className="grid md:grid-cols-5 w-11/12 md:w-10/12 lg:w-8/12 rounded-lg min-h-[70vh] overflow-hidden mx-auto">
        <div className="w-full bg-black md:col-span-3 relative">
          <div className="absolute uppercase  md:w-8/12 flex flex-col gap-2 justify-center items-left text-lg font-semibold z-10 text-left text-zinc-50 bottom-5 left-5">
            <span className="w-11/12">Travel is the only thing you buy that makes you richer</span>
            <div className="flex gap-2 mt-3">
              <div className="w-[1.5rem] h-[1.5rem] hover:scale-105 cursor-pointer duration-200">
                <Image
                  src={Instagram}
                  alt="social-icon"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="w-[1.5rem] h-[1.5rem] hover:scale-105 cursor-pointer duration-200">
                <Image
                  src={Facebook}
                  alt="social-icon"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="w-[1.5rem] h-[1.5rem] hover:scale-105 cursor-pointer duration-200">
                <Image
                  src={Whatsapp}
                  alt="social-icon"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <Image
            width={5000}
            height={5000}
            alt="login-image"
            className="brightness-50 w-full h-[40vh] md:h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1545652985-5edd365b12eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></Image>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full  md:col-span-2  ">
            <Card className="mx-auto h-full !rounded-none py-2 md:py-[2rem]">
              <CardHeader>
                <Image
                  src={logo}
                  alt="logo"
                  width={200}
                  height={200}
                  className=" mx-auto mb-4 w-[8rem]"
                />
                <CardTitle className="text-2xl font-bold title">
                  Register
                </CardTitle>
                <CardDescription>
                  Enter your credentials below to register to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        {showPassword ? (
                          <EyeOff
                            onClick={() => setShowPassword(false)}
                            size={18}
                            className="absolute right-2 top-1/2 transform cursor-pointer text-primary-400 "
                          />
                        ) : (
                          <Eye
                            onClick={() => setShowPassword(true)}
                            size={18}
                            className="absolute right-2 top-1/2 transform cursor-pointer text-primary-400 "
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
                          Confirm Password <span className="text-yellow-500 text-sm">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...field}
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
                    className="primary-button"
                  >
                    {isRegistering && (
                      <Loader
                        size={16}
                        className="animate-spin mr-2"
                      />
                    )}
                    Register
                  </button>

                  <div className="ml-auto inline-block text-sm ">
                    <span className="underline">Already have an account?</span>{" "}
                    <Link
                      href="/login"
                      className="font-semibold">
                      Login
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
