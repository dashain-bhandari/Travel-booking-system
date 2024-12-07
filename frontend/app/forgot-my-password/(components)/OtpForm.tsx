"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import { Eye, EyeOff, Loader, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TOTP } from "totp-generator";
import { useSearchParams } from "next/navigation";

const formSchema = z
  .object({
    otp: z.string().length(6, {
      message: "OTP must be 6 characters.",
    }),

    password: z
      .string()
      .min(7, {
        message: "Password must be at least 7 characters.",
      })
      .max(22, {
        message: "Password must be less than 22 characters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function OtpForm() {
  const searchParams = useSearchParams();
  const isOtpArea = searchParams.get("isotparea");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  // Define a submit handler
  const [isResettingPassword, setIsResettingPassword] =
    useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsResettingPassword(true);

    // // check if OTP exists in db or not
    // const { data, error, status } = await supabase
    //   .from("OTP")
    //   .select()
    //   .eq("otp", values.otp)
    //   .single();

    // // check if OTP is valid or not considering isActive and expires parameters
    // if (data === null || data?.isActive || data?.expires > new Date()) {
    //   toast.error("OTP is invalid or expired.");
    //   setIsResettingPassword(false);
    //   return;
    // }




























    // const { data:ss, error:sss } = await supabase.auth.admin.updateUserById(merchant?.user.id, { user_metadata: { accountStatus: value } });

    // check if email exists in db or not

    // const { data: user } = await supabase.from("profiles").select(`email`).eq("email", values.email).single();

    // if (!user) {
    //   toast.error("User with this email does not exist.");
    //   setIsResettingPassword(false);
    //   return;
    // }

    // // generate OTP if user exists
    // const { otp, expires } = TOTP.generate("JBSWY3DPEHPK3PXP");

    // // send OTP to email
    // const result = await sendEmail(values.email, "Reset Your Password", ResetPasswordMessageTemplateLiteral(otp)); // to, subject, message

    // if (result?.status === "success") {
    //   // after sending OTP , save it to db for verification

    //   // Calculate the expiration time
    //   const expires = new Date(Date.now() + 60 * 1000); // 1 minute from now

    //   const { data, error } = await supabase
    //     .from("OTP")
    //     .insert([{ email: values.email, otp: otp, isActive: true, expires: expires }])
    //     .select();

    //   toast.success("OTP sent successfully, please check your email.");
    //   form.reset();
    // } else {
    //   toast.error(result.error);
    // }
    setIsResettingPassword(false);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mx-auto max-w-sm  shadow-sm">
            <CardHeader>
              <div className=" flex flex-col items-center gap-1 text-lg text-primary">
                <Package size={40} />
                <p className=" text-2xl font-medium">Contour Expedition</p>
              </div>

              <CardTitle className="text-2xl pt-4">
                Reset your password
              </CardTitle>
              <CardDescription>
                Enter the email address associated with your account, and we’ll
                send OTP to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP *</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="New Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className=" relative">
                      <FormLabel>Confirm Password</FormLabel>

                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password"
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

                <Button
                  disabled={isResettingPassword}
                  type="submit"
                  className="w-full flex items-center">
                  {isResettingPassword && (
                    <Loader
                      size={16}
                      className="animate-spin mr-2"
                    />
                  )}
                  Send OTP
                </Button>
                {/* <button
                  disabled={isResettingPassword}
                  type="submit"
                  className="text-white  z-10  bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
                >
                  {isResettingPassword && (
                    <Loader size={16} className="animate-spin mr-2" />
                  )}
                  Send OTP
                </button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                I know my credentials !{" "}
                <Link href="/login" className="underline">
                  Reset Password
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
