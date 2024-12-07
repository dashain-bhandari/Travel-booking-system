"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilePenLine, Loader, Trash2, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import Image from "next/image";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import useCloudinaryMultipleImageUpload from "@/hooks/useCloudinaryMultipleImageUpload";
import { IconCollection } from "@/components/svg-icons/IconCollection";
import slugify from "react-slugify";
import { formSchema } from "..";
import FieldOptionalText from "@/components/dashboard/FieldOptionalText";
import { AxiosInstance } from "@/utils/config";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Checkbox } from "@/components/ui/checkbox";

export default function ActivityEditSheet({ id, setRefreshNow, collections }: any) {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      images: [],
      description: "",
      banner:"",
      price:0,
      previousPrice:0
    
    },
  });

  const [value, setValue] = useState("");


  // Update slug whenever name changes
  const slug = slugify(form.watch("name"));
  React.useEffect(() => {
    form.setValue("slug", slugify(form.watch("name")));
    form.setValue("description", value);
  }, [form, slug, value]);

  const [activity, setActivity] = useState<any>(undefined);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await AxiosInstance.get(`activities/${id}`);
        console.log(data?.data);
        setActivity(data?.data);
        setValue(data?.data?.description);
        setImageUrl(data?.data?.images);
        setPreviewUrl(data?.data?.images);
        setImageUrl1(data?.data?.banner);
        setPreviewUrl1(data?.data?.banner);
      } catch (error: any) {
        console.error("Failed to fetch activities:", error.message);
        return;
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (activity) {
      form.reset({
        name: activity.name || "",
        slug: activity.slug || "",
        banner: activity.banner || "",
        images: activity.image || [],
        description: activity.description || "",
        price:activity.price || 0,
        previousPrice:activity.previousPrice || 0
      
      });
    }
  }, [form, activity]);

  // Define a submit handler
  const [previewUrl, setPreviewUrl] = useState<any[]>([]);
  const { uploading, handleFileUpload, imageUrl, setImageUrl } = useCloudinaryMultipleImageUpload();
  const { uploading: uploading1, handleFileUpload: handleFileUpload1, imageUrl: imageUrl1, setImageUrl: setImageUrl1 } = useCloudinaryFileUpload();
  const [previewUrl1, setPreviewUrl1] = useState<any>("");
  useEffect(() => {
    setPreviewUrl(imageUrl)
  }, [imageUrl])

  useEffect(() => {
    setPreviewUrl1(imageUrl1)
  }, [imageUrl1])


  const removeImg = (item: any) => {
    const newArr = imageUrl.filter((i: any) => i !== item);
    setImageUrl(newArr);
    setPreviewUrl(newArr)
  }

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    try {
      const { data } = await AxiosInstance.patch(`activities/${activity.activityId}`, { ...values, images: imageUrl,banner:imageUrl1 });
      form.reset();
      setRefreshNow(true);
      setIsUpdating(false);
      setValue("");
      setImageUrl([]);
      setImageUrl1("");

      toast.success("Activity updated successfully.");
    } catch (error: any) {
      setIsUpdating(false);
      if(error?.response?.data?.message && error?.response?.data?.message?.includes("duplicate key"))
        {
          toast.error("Slug must be unique");
        }
       else{
        toast.error(error.details|| "An error occurred during update. Please try again.");
  
       } 
      return;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">View Details</span>
      </SheetTrigger>

      <SheetContent className="sm:max-w-8xl h-screen overflow-y-scroll overflow-x-hidden pb-20">
        <SheetHeader className=" mb-4">
          <SheetTitle className=" flex items-center gap-2">
            Edit Activity 
            <span className="text-primary">({activity?.name})</span>
            <IconCollection className=" h-4 w-4 text-primary" />{" "}
          </SheetTitle>
          <SheetDescription>Insert necessary data and click edit activity when you are done.</SheetDescription>
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
                  <div className={`grid grid-cols-4 gap-4 rounded-md  justify-center w-full ${previewUrl && previewUrl.length > 0 ? 'border border-dashed' : ''}`}>
                    {
                      previewUrl && previewUrl.length > 0 && previewUrl.map((item, idx) => (
                        <FormControl key={idx} className=" flex flex-row w-full justify-start " >
                          <button
                            type="button"
                            className="flex  w-56 overflow-hidden h-56  mx-auto  items-center justify-center    " >
                            <div className=" absolute bg-primary/20 p-2 rounded-full ">
                              <Trash2 className="h-4 w-4 text-primary " onClick={() => removeImg(item)} />
                              <span className="sr-only">Upload</span>
                            </div>
                            <Image
                              key={idx}
                              src={item}
                              alt=""
                              height={400}
                              width={400}
                              className=" h-56 w-56 rounded-md object-cover  "
                            />
                          </button>
                        </FormControl>
                      ))
                    }
                    <FormControl className=" flex flex-row justify-start w-full">
                      <button
                        type="button"
                        className={`flex  overflow-hidden h-56  mx-auto  items-center justify-center   rounded-md ${previewUrl?.length==0?"border border-dashed w-full":"border-x border-dashed w-56"}`}>
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
                              // setPreviewUrl1((prevUrls: any) => [...prevUrls, preview]);
                            }

                          }}
                          type="file"
                          multiple
                          className=" w-56 absolute  cursor-pointer   z-50 opacity-0"
                        />


                      </button>

                    </FormControl>
                  </div>
                  <FormMessage />
                  {uploading && <p className="text-primary  text-[12px] text-center -mt-14">Uploading images please wait...</p>}
                </FormItem>
              )}
            />
            
            <Button
              disabled={uploading || isUpdating}
              className=" float-end"
              type="submit">
              {isUpdating ? (
                <Loader
                  size={16}
                  className=" animate-spin mr-2 "
                />
              ) : (
                <FilePenLine
                  size={16}
                  className="mr-1"
                />
              )}
              Save Changes
            </Button>
          </form>
        </Form>

      </SheetContent>
    </Sheet>
  );
}
