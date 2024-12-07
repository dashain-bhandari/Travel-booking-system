

"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
import { AxiosInstance } from "@/utils/config"
import { formatDistanceToNow } from "date-fns";

import Link from "next/link"

function Notification() {
    const [unreadCount,setUnreadCount]=useState(0)

    useEffect(()=>{
const getUnread=async()=>{
try {
    const {data}=await AxiosInstance.get('/notifications/unread');
    console.log(data)
    setUnreadCount(data?.count)
} catch (error:any) {
    console.log(error.message)
}
}
getUnread()
    },[])
    const [notifications, setNotifications] = useState<any[]>([])
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await AxiosInstance.get('/notifications');
                console.log(data?.data)
                setNotifications(data?.data)
            } catch (error: any) {
                console.log(error?.message)
            }
        }
        fetchNotifications()
    }, [])

    const markAsRead=async()=>{
        try {
            const result=await AxiosInstance.put('/notifications/markRead');
            console.log(result)
        } catch (error:any) {
            console.log(error.message)
        }
    }
  return (
    <Card>
        
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have {unreadCount} unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              
                <div>
                    {notifications.map((notification, index) => (
                       <>
                       {
                        index<=1 && ( <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            { <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />}
                            <div className="space-y-1 border-b border-1 border-gray-200 pb-2">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                               
                                    {notification?.createdAt && formatDistanceToNow(notification?.createdAt)} ago
                                </p>
                            </div>
                        </div>)
                       }
                       </>
                    ))}
                  
                </div>
            </CardContent>
            {notifications?.length>1 && (<CardFooter className="flex  w-full">
                <Link href={`/dashboard/admin/notifications`} className="w-fit ">
                   <Button onClick={markAsRead}>View all</Button>
                </Link>
            </CardFooter>)}
        
        </Card>
  )
}

export default Notification