"use client"
import PageHero from '@/components/comp/PageHero'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AxiosInstance } from '@/utils'
import OtherActivitiesHero from '@/components/website/OtherActivities/OtherActivitiesHero'
export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    console.log(pathname);
    const slug = pathname?.split("/")[2]
    console.log(slug);

    const [activity, setActivity] = useState<any>({});
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const { data } = await AxiosInstance.get(`/activities/${slug}`);
                console.log(data)
                setActivity(data?.data);
            } catch (error: any) {
                console.log(error?.message)
            }
        }
        fetchActivity()
    }, [slug])
    return (<>
        <div>
        <OtherActivitiesHero activity={activity} />
            
            <div>{children}</div>
        </div>
    </>
    )
}

