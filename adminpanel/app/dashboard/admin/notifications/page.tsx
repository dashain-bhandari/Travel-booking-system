"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useContext, useEffect, useState } from "react";
import { AxiosInstance } from "@/utils/config";
import { formatDistanceToNow } from "date-fns";

import Link from "next/link";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type CardProps = React.ComponentProps<typeof Card>;

export default function Page() {
  const [sendGmail, setSendGmail] = useState<any>(false);
  const { currentUser }: any = useContext(GlobalContext);
  const [refreshNow, setRefreshNow] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setSendGmail(currentUser?.sendGmailForAdminNotifications);
    }
  }, [currentUser]);

  const updateSwitch = async (e: any) => {
    try {
      const { data } = await AxiosInstance.patch(`/users/${currentUser?.userId}`, { sendGmailForNotifications: e.target.value });
      console.log(data?.data);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const [notifications, setNotifications] = useState<any[]>([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await AxiosInstance.get("/notifications");
        console.log(data?.data);
        setNotifications(data?.data);
        setRefreshNow(false);
      } catch (error: any) {
        console.log(error?.message);
      }
    };
    fetchNotifications();
  }, [refreshNow]);


  const deleteNotification=async(id:any)=>{
    try {
      console.log(id)
      const {data}=await AxiosInstance.delete(`/notifications/${id}`)
      console.log(data);
      toast.success("Delete success")
      setRefreshNow(true)
    } catch (error:any) {
      console.log(error.message);
      toast.error("Something went wrong")
    }
  }
  return (
    <>
      <Card className="w-full max-h-[650px] overflow-y-auto">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className=" grid grid-cols-[25px_1fr] items-start  last:mb-0 last:pb-0">
                {<span className="flex h-2 w-2 self-center translate-y-1 rounded-full bg-sky-500" />}
                <div className="relative group space-y-1 py-4 border-b border-1 border-gray-200 hover:bg-gray-50">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification?.createdAt && formatDistanceToNow(notification?.createdAt)} ago</p>
                 
                  <AlertDialog>
                <AlertDialogTrigger asChild>
                <div className="absolute  opacity-0 group-hover:opacity-100 inset-y-0 right-4 flex items-center transition-opacity cursor-pointer">
                <Ellipsis className="h-6 w-6 text-gray-800" />
            </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete notification</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your data and remove your data from our servers.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className=" bg-red-500/90 hover:bg-red-500"
                      onClick={() =>deleteNotification(notification?.notificationId)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
           
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}