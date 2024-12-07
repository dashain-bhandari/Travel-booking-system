"use client";
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
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClientSideAxiosInstance } from "@/utils";
import { GlobalContext } from "@/context/GlobalContext";

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

export default function Login({ setCheckCurrentUser }: any) {
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
      if (res.data.accessToken) {
        setCheckCurrentUser(true);
        localStorage.setItem("accessToken", res.data.accessToken);

        // toast.success("Login successful , Welcome back to the profile.");

        setILoging(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setILoging(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
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
                    Email <span className="text-yellow-500 text-sm">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="youremail@gmail.com"
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
                <FormItem className=" relative">
                  {/* <FormLabel>Password</FormLabel> */}
                  <div className="flex items-center">
                    <FormLabel>
                      Password{" "}
                      <span className="text-yellow-500 text-sm">*</span>
                    </FormLabel>
                    <Link
                      href="/forgot-my-password"
                      className="ml-auto inline-block text-sm underline "
                    >
                      Forgot your password?
                    </Link>
                  </div>
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
              className="text-white  w-fit   bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-10 py-2.5 text-center me-2  flex items-center gap-1"
            >
              {isLoging && <Loader size={16} className="animate-spin mr-2" />}
              Login
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
