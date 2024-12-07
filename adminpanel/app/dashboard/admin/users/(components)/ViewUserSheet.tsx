"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { IconCollection } from "@/components/svg-icons/IconCollection";
import { formSchema } from "../index";
import { AxiosInstance } from "@/utils/config";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { Inbox } from "lucide-react";

export default function ViewUserSheet({ id, setRefreshNow, collections }: any) {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            middleName:"",
            lastName:"",
            email: "",
            address: "",
            message: "",
            phoneNo: "",
            availability: [],
            priceRange:""

        },
    });


    const [user, setUser] = useState<any>(undefined);
    const [sel, setSel] = useState<any[]>([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await AxiosInstance.get(`users/${id}`);
                console.log(data)
                setUser(data?.data);

            } catch (error: any) {

                console.error("Failed to fetch message:", error.message);
                return;
            }
        };
        fetch();
    }, [id]);


    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user?.firstName || "",
                middleName: user?.middleName || "",
                lastName: user?.lastName || "",
                email: user?.email || "",
                address: user?.address || "",
                availability: user?.availability || "",
                phoneNo: user?.phoneNo || "",
                priceRange: user?.priceRange || "",


            });

            const newArr = user?.availability?.map((item: any) => ({
                startDate: new Date(item?.startDate),
                endDate: new Date(item?.endDate),
                key: "selection"
            }))
            setSel(newArr)
        }
    }, [form, user]);


    let selectionRange = [];


    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">View Details</span>
            </SheetTrigger>

            <SheetContent className="sm:max-w-sm h-screen overflow-y-scroll overflow-x-hidden pb-20">
                <SheetHeader className=" mb-4">
                    <SheetTitle className=" flex items-center gap-2">
                        View {user?.role}<IconCollection className=" h-4 w-4 text-primary" />{" "}
                    </SheetTitle>
                    {/* <SheetDescription>Insert necessary data and click edit group departure when you are done.</SheetDescription> */}
                </SheetHeader>

                <Form {...form}>
                    <form

                        className="w-[500px]  space-y-6">


                       
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly

                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="middleName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Middle Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly

                                            placeholder="Middle Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly

                                            placeholder="Last Name"
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
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly

                                            placeholder="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly

                                            placeholder="address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly

                                            placeholder="+977-9837465363"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        
                      
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
