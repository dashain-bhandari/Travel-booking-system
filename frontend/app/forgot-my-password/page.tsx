"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TOTP } from "totp-generator";
import { useSearchParams } from "next/navigation";
import React from "react";
import { sendEmail } from "@/hooks/useSendEmail";
import OtpForm from "./(components)/OtpForm";
import { ResetPasswordMessageTemplateLiteral } from "@/mail-templates/ResetPasswordMessageTemplateLiteral";
import Image from "next/image";
import Logo from "@/public/contour expeditions logo.png";
import crypto from "crypto";
import { ClientSideAxiosInstance } from "@/utils";

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
});

function SuspenseForm() {
  const searchParams = useSearchParams();
  const isOtpArea = searchParams.get("isotparea");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();

  // Define a submit handler
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSendingOTP(true);

    const token = crypto.randomBytes(20).toString("hex");

    // send OTP to email
    const result = await sendEmail(values.email, "Reset Your Password", ResetPasswordMessageTemplateLiteral(token)); // to, subject, message

    if (result?.status === "success") {
      const res = await ClientSideAxiosInstance.post("/password-reset", {
        email: values.email,
        token: token,
        valid: true,
      });

      toast.success("Reset link sent successfully, please check your email.");
      form.reset();
      setIsSendingOTP(false);
    } else {
      toast.error(result.error);
    }
    setIsSendingOTP(false);
  };

  return (
    <div className="flex items-center justify-center h-screen w-11/12 mx-auto  md:w-full">
      {isOtpArea ? (
        <OtpForm />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <Card className="mx-auto max-w-sm  shadow-sm">
              <CardHeader>
                <div className=" flex flex-col items-center gap-1 text-lg text-primary">
                  <Image
                    alt="contour-logo"
                    src={Logo}
                    className="w-[8rem]"></Image>
                </div>

                <CardTitle className="text-2xl pt-4">Reset your password</CardTitle>
                <CardDescription>Enter the email address associated with your account, and we’ll send reset link to your inbox.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="youremail@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel>Password</FormLabel>
          
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
        /> */}

                  {/* <Button
                    disabled={isSendingOTP}
                    type="submit"
                    className="w-full flex items-center">
                    {isSendingOTP && (
                      <Loader
                        size={16}
                        className="animate-spin mr-2"
                      />
                    )}
                    Send OTP
                  </Button> */}
                  <button
                    disabled={isSendingOTP}
                    type="submit"
                    className="primary-button">
                    {isSendingOTP && (
                      <Loader
                        size={16}
                        className="animate-spin mr-2"
                      />
                    )}
                    Send Reset Link
                  </button>
                </div>
                <div className="mt-4 text-center text-sm">
                  I know my credentials !{" "}
                  <Link
                    href="/login"
                    className="underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <SuspenseForm />
    </Suspense>
  );
}
