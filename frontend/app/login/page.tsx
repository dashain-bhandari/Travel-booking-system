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
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosInstance, ClientSideAxiosInstance } from "@/utils";
import Image from "next/image";
import Logo from "@/public/contour expeditions logo.png";

// SOCIAL images
import Instagram from "@/public/Social/instagram.png";
import Facebook from "@/public/Social/facebook.png";
import Whatsapp from "@/public/Social/whatsapp.png";
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

export default function Page() {
  const router = useRouter();
 


  // if (currentUser !== undefined) {
  //   router.push("/");
  // }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {currentUser,setCurrentUser}=useContext(GlobalContext) as any
  // Define a submit handler
  const [isLoging, setILoging] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setILoging(true);
      const res = await ClientSideAxiosInstance.post("/users/login", values);
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
     
        toast.success("Login successful , Welcome back to the profile.");
        console.log(res.data)
        res?.data?.user && setCurrentUser(res?.data?.user)
        router.push("/my-profile");
        // window.location.href = "/my-profile";
        setILoging(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setILoging(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center pb-[3rem]  pt-[6rem] w-full">
      <div className="grid md:grid-cols-5 w-11/12 md:w-10/12 lg:w-8/12 rounded-lg min-h-[70vh] overflow-hidden mx-auto">
        <div className="w-full bg-black md:col-span-3 relative">
          <div className="absolute uppercase md:w-8/12 flex flex-col gap-2 justify-center items-left text-lg font-semibold z-10 text-left text-zinc-50 bottom-5 left-5">
            <span className="w-11/12">
              Travel is the only thing you buy that makes you richer
            </span>
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
            src="https://images.unsplash.com/photo-1545652985-5edd365b12eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></Image>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full  md:col-span-2  "
          >
            <Card className="mx-auto h-full !rounded-none py-2 md:py-[2rem]">
              <CardHeader>
                <div className=" flex flex-col items-center gap-1 text-lg text-primary">
                  <Image alt="" src={Logo} className="w-[8rem]"></Image>
                </div>

                <CardTitle className="text-2xl font-bold title">
                  Login
                </CardTitle>
                <CardDescription>
                  Enter your credentials below to login to your account
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
                          Email{" "}
                          <span className="text-yellow-500 text-sm">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="youremail@gmail.com" {...field} />
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
                    disabled={isLoging}
                    type="submit"
                    className="w-full primary-button"
                  >
                    {isLoging && (
                      <Loader size={16} className="animate-spin mr-2" />
                    )}
                    Login
                  </Button>

                  <div className="ml-auto inline-block text-sm ">
                    <span className="underline">Already have an account?</span>{" "}
                    <Link href="/register" className="font-semibold">
                      Sign up
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
