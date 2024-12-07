"use client"
import PageHero from '@/components/comp/PageHero'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AxiosInstance } from '@/utils'
export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    console.log(pathname);
    const slug = pathname?.split("/")[2]
    console.log(slug);

    const [training, setTraining] = useState<any>({});
    useEffect(() => {
        const fetchTraining = async () => {
            try {
                const { data } = await AxiosInstance.get(`/training/${slug}`);
                console.log(data)
                setTraining(data?.data);
            } catch (error: any) {
                console.log(error?.message)
            }
        }
        fetchTraining()
    }, [slug])
    return (<>
        <div>
            <PageHero
                heading={training?.title}
                desc={training?.heading}
                heroImg={training?.thumbnail}
                imgHeight="70vh"
                alt="contour-team-image"
            />
            <div>{children}</div>
        </div>
    </>
    )
}

