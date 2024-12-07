"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { z } from "zod";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/utils";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage({ params }: any) {
  console.log(params.token);

  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [document, setdocument] = useState<any>();
  useEffect(() => {
    const fetchTokenDocument = async () => {
      try {
        const response = await AxiosInstance.get(`/password-reset/${params.token}`);
        setdocument(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTokenDocument();
  }, [params.token]);

  console.log(document);
  console.log(document?.token);
  console.log(params.token);

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsSubmitting(true);

    if (!document || document?.token !== params.token || document?.valid === false) {
      toast.error("Token is invalid");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await AxiosInstance.patch(`/users/password-reset/${document?.email}`, {
        password: values.password,
      });
      console.log(response);
      setIsSubmitting(false);
      form.reset();
      toast.success("Password reset successfully. You can now log in.");

      const res = await AxiosInstance.patch(`/password-reset/${document?.email}`, {
        email: document.email,
        token: "",
        valid: false,
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-11/12 mx-auto  md:w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          <Card className="mx-auto max-w-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        New Password <span className="text-yellow-500 text-sm">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirm New Password <span className="text-yellow-500 text-sm">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full primary-button flex items-center">
                  {isSubmitting && (
                    <Loader
                      size={16}
                      className="animate-spin mr-2"
                    />
                  )}
                  Reset Password
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
