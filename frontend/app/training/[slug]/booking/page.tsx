"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  phone: z.string().min(1, {
    message: "Number is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  dob: z.string().min(1, {
    message: "Dob is required.",
  }),
  startDate: z.string(),
  endDate: z.string(),
  postalCode:z.coerce.number(),
  trainingName: z.string().optional()

})

import React, { useContext, useEffect, useState } from 'react'
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AxiosInstance } from "@/utils"
import { toast } from "sonner"
import { Loader, Save } from "lucide-react"
import { GlobalContext } from "@/context/GlobalContext"

type Props = {
  params: {
    slug: string;
  };
};
function Page({ params }: Props) {

  const { currentUser } = useContext(GlobalContext) as any
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      dob: "",
      startDate: "",
      endDate: "",
      postalCode:0
    },
  })

  const trainingname = form.watch("trainingName");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { watch, setValue } = form;
  const arrivalDate = watch('startDate');
  const departureDate = watch('endDate');
  const dob = watch('dob');



  const [training, setTraining] = useState<any>({});
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const { data } = await AxiosInstance.get(`/training/${params?.slug}`);
        console.log(data)
        setTraining(data?.data);
        setValue("trainingName", data?.data?.title)
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchTraining()
  }, [params?.slug])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);

    try {
      console.log(values);
      const { data } = await AxiosInstance.post("bookings", { ...values, training: training?._id, user: currentUser?._id ,type:"training"});
      form.reset();
      setIsCreating(false);
      toast.success("Booking success");
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong");
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className="w-11/12 4xl:w-10/12 relative  mx-auto py-[5rem]">
        <div className="flex rounded-lg w-full  flex-col items-center py-[2rem] pb-[5rem] px-[1rem] md:px-[5rem] lg:px-[10rem] gap-10 bg-[#FFF]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <Link href={`/training/${params?.slug}`} className="self-start underline-offset-1 underline text-yellow-500">back</Link>

              <div className="flex  lg:flex-row flex-col gap-3 justify-center items-center">

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Full Name <span className="text-yellow-500">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="trainingName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Training Name <span className="text-yellow-500"></span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          readOnly
                          placeholder="Scooba"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div className="flex lg:flex-row flex-col gap-3 w-full justify-center items-center">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Phone number <span className="text-yellow-500">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          className="w-full"
                          defaultCountry="ua"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                          Postal Code <span className="text-yellow-500">*</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input
                            className="w-full"
                            type="number"
                            placeholder="649469"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Email <span className="text-yellow-500">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="w-full"
                          type="email"
                          placeholder="ram@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <div className="flex  lg:flex-row flex-col gap-3 justify-center items-center">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Country <span className="text-yellow-500">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="w-full"

                          placeholder="Nepal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Date of birth <span className="text-yellow-500">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          type="date"
                          className="w-full"

                          placeholder="Nepal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex  lg:flex-row flex-col gap-3 justify-center items-center">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        Start Date <span className="text-yellow-500"></span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          type="date"
                          className="w-full"


                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-semibold">
                        End Date <span className="text-yellow-500"></span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input
                          type="date"
                          className="w-full"


                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit"

              >

                {isCreating ? (
                  <Loader
                    size={16}
                    className=" animate-spin mr-2 "
                  />
                ) : (
                  <Save
                    size={16}
                    className="mr-1"
                  />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>


    </>
  )
}

export default Page