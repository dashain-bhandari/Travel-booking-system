"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/contour expeditions logo.png";

// SOCIAL images
import Instagram from "@/public/social/instagram.png";
import Facebook from "@/public/social/facebook.png";
import Whatsapp from "@/public/social/whatsapp.png";
import { ClientSideAxiosInstance } from "@/utils/config";

const formSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: "Vendor email must be at least 8 character.",
    })
    .max(40, {
      message: "Vendor email must be less than 40 characters.",
    })
    .email(),

  password: z
    .string()
    .min(7, {
      message: "Password must be at least 7 character.",
    })
    .max(22, {
      message: "Password must be less than 22 characters.",
    }),
});

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // Define a submit handler
  const [isLoging, setILoging] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setILoging(true);
      const res = await ClientSideAxiosInstance.post("/users/login", values);
      console.log(res);

      if (res.data.accessToken && res.data.user.role !== "super-admin" && res.data.user.role !== "admin") {
        // localStorage.setItem("accessToken", res.data.accessToken);
        // setILoging(false);
        // toast.success("Hey Chief, Welcome back to the dashboard.");
        // router.push("/dashboard/admin/collections");
        toast.error("You are not authorized.");
        setILoging(false);
        return;
      }
      if (res.data.accessToken && (res.data.user.role === "super-admin" || res.data.user.role == "admin")) {
        localStorage.setItem("accessToken", res.data.accessToken);
        setILoging(false);
        toast.success("Hey Chief, Welcome back to the dashboard.");
        router.push("/dashboard/admin/");
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setILoging(false);
      router.push("/");
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen  flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="  ">
          <Card className="w-[400px]">
            <CardHeader>
              <div className=" flex flex-col items-center gap-1 text-lg text-primary">
                <Image
                  alt=""
                  src={Logo}
                  className="w-[8rem]"></Image>
              </div>

              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your credentials below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-yellow-500 text-sm">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you aremail@gmail.com"
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
                    <FormItem className=" relative">
                      {/* <FormLabel>Password</FormLabel> */}
                      <div className="flex items-center">
                        <FormLabel>
                          Password <span className="text-yellow-500 text-sm">*</span>
                        </FormLabel>
                        <Link
                          href="/forgot-my-password"
                          className="ml-auto inline-block text-sm underline ">
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
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
                {/* 
                  <Button
                    disabled={isLoging}
                    type="submit"
                    className="w-full flex items-center"
                  >
                    {isLoging && (
                      <Loader size={16} className="animate-spin mr-2" />
                    )}
                    Login
                  </Button> */}

                <button
                  disabled={isLoging}
                  type="submit"
                  className="text-white flex items-center gap-2 justify-center z-10  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center ">
                  {isLoging && (
                    <Loader
                      size={14}
                      className="animate-spin mr-2"
                    />
                  )}
                  Login
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
