"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Upload } from "lucide-react";
import useCloudinaryMultipleImageUpload from "@/hooks/useCloudinaryMultipleImageUpload";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import { toast } from "sonner";
import { IconAdd } from "@/components/svg-icons/IconAdd";
import { IconCollection } from "@/components/svg-icons/IconCollection";
import slugify from "react-slugify";
import { formSchema } from "..";
import FieldOptionalText from "@/components/dashboard/FieldOptionalText";
import "react-quill/dist/quill.snow.css";
import { AxiosInstance } from "@/utils/config";
import dynamic from "next/dynamic";
import { Checkbox } from "@/components/ui/checkbox";

export default function ActivityCreateSheet({ setRefreshNow }: any) {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            images: "",
            slug: "",
            banner: "",
            price:0,
            previousPrice:0
        },
    });

    // Quill Editor content
    const [value, setValue] = useState("");

    // Update slug whenever name changes
    const slug = slugify(form.watch("name"));
    useEffect(() => {
        form.setValue("slug", slugify(form.watch("name")));
        form.setValue("description", value);
    }, [form, slug, value]);

    // Define a submit handler
    const { uploading, handleFileUpload, imageUrl, setImageUrl } = useCloudinaryMultipleImageUpload();
    const [previewUrl, setPreviewUrl] = useState<any[]>([]);
    const { uploading: uploading1, handleFileUpload: handleFileUpload1, imageUrl: imageUrl1, setImageUrl: setImageUrl1 } = useCloudinaryFileUpload();
    const [previewUrl1, setPreviewUrl1] = useState<any>("");
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsCreating(true);

        try {
            console.log(values);
            const { data } = await AxiosInstance.post("activities", { ...values, images: imageUrl,banner:imageUrl1 });
            form.reset();
            setPreviewUrl([]);
            setPreviewUrl1("");
            setIsCreating(false);
            setRefreshNow(true);
            setImageUrl([]);
            setImageUrl1("");
            setValue("");
            toast.success("Activity created successfully");
        } catch (error: any) {
            console.log(error)
            if (error?.response?.data?.message && error?.response?.data?.message?.includes("duplicate key")) {
                toast.error("Slug must be unique");
            }
            else {
                toast.error(error.details || "An error occurred during create. Please try again.");

            }
            setIsCreating(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    <IconAdd className=" mr-1" />
                    Add New Activity
                </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-8xl h-screen overflow-y-scroll overflow-x-hidden pb-20">
                <SheetHeader className=" mb-4">
                    <SheetTitle className=" flex items-center gap-2">
                        Create New Activity <IconCollection className=" h-4 w-4 text-primary" />{" "}
                    </SheetTitle>
                    <SheetDescription>Insert necessary data and click create activity when you are done.</SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Paragliding"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug *</FormLabel>
                                    <FormControl>
                                        <Input
                                            defaultValue={slug}
                                            placeholder="paragliding"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price *</FormLabel>
                                    <FormControl>
                                        <Input
                                        type="number"
                                            placeholder="0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                          <FormField
                            control={form.control}
                            name="previousPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Previous price *</FormLabel>
                                    <FormControl>
                                        <Input
                                        type="number"
                                            placeholder="0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Description *
                                    </FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={setValue}
                                            className=" h-64 pb-8"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="banner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Thumbnail *
                                    </FormLabel>
                                    <FormControl>
                                        <button
                                            type="button"
                                            className="flex   overflow-hidden h-56 w-full mx-auto  items-center justify-center   rounded-md border border-dashed">
                                            <div className=" absolute bg-primary/20 p-2 rounded-full ">
                                                {uploading1 ? <Loader className=" animate-spin h-4 w-4 text-primary" /> : <Upload className="h-4 w-4 text-primary " />}
                                                <span className="sr-only">Upload</span>
                                            </div>
                                            <Input
                                                onChange={(e: any) => {
                                                    field.onChange(e.target.files[0]);
                                                    handleFileUpload1(e.target.files[0]);
                                                    const preview = URL?.createObjectURL(e.target.files[0]);
                                                    setPreviewUrl1(preview);
                                                    e.target.value=null;
                                                }}
                                                type="file"
                                                className=" w-full absolute  cursor-pointer   z-50 opacity-0"
                                            />

                                            {previewUrl1 && (
                                                <Image
                                                    src={previewUrl1}
                                                    alt=""
                                                    height={400}
                                                    width={400}
                                                    className="h-56 w-full object-scale-down"
                                                />
                                            )}
                                        </button>
                                    </FormControl>
                                    <FormMessage />
                                    {uploading1 && <p className="text-primary  text-[12px] text-center -mt-14">Uploading image please wait...</p>}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Images <FieldOptionalText /></FormLabel>
                                    <FormControl>
                                        <button
                                            type="button"
                                            className="flex   overflow-hidden h-56 w-full mx-auto  items-center justify-center   rounded-md border border-dashed">
                                            <div className=" absolute bg-primary/20 p-2 rounded-full ">
                                                {uploading ? <Loader className=" animate-spin h-4 w-4 text-primary" /> : <Upload className="h-4 w-4 text-primary " />}
                                                <span className="sr-only">Upload</span>
                                            </div>
                                            <Input
                                                onChange={(e: any) => {
                                                    field.onChange(e.target.files);
                                                    handleFileUpload(e.target.files);
                                                    for (let file of e.target.files) {
                                                        const preview = URL?.createObjectURL(file);
                                                        setPreviewUrl((prevUrls: any) => [...prevUrls, preview]);
                                                    }
                                                }}
                                                type="file"
                                                multiple
                                                className=" w-full absolute  cursor-pointer   z-50 opacity-0"
                                            />

                                            <div className="flex flex-row overflow-auto w-full">
                                                {previewUrl && previewUrl.length !== 0 && previewUrl.map((item: any, idx: any) => (

                                                    <Image
                                                        key={idx}
                                                        src={item}
                                                        alt=""
                                                        height={400}
                                                        width={400}
                                                        className=" h-56  "
                                                    />


                                                ))}
                                            </div>
                                        </button>

                                    </FormControl>

                                    <FormMessage />
                                    {uploading && <p className="text-primary  text-[12px] text-center -mt-14">Uploading image please wait...</p>}
                                </FormItem>
                            )}
                        />



                        <Button
                            disabled={uploading || isCreating}
                            className=" float-end"
                            type="submit">
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
                            Create Activity
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
