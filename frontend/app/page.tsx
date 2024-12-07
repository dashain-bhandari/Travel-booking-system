import HomeMain from "@/components/website/Homepage/HomeMain";
import NewHomeMain from "@/components/website/Homepage/NewHomeMain";
import { AxiosInstance } from "@/utils";

export default async function Page() {
  // Handle fetch best seller expeditions
  let bestSellerExpeditions: any[] = [];
  try {
    const res = await AxiosInstance.get(
      `/expeditions/get-all/plane-data-without-populate`,
      {
        params: {
          isBestseller: true,
          isPublished:true
         
        },
      }
    );
    bestSellerExpeditions = res?.data?.data || [];
  } catch (error: any) {
    console.error("Error", error);
  }

  return (
    <>
      <main className=" z-[20]  bg-[#EAEAEA]">
        {/* <HomeMain bestSellerExpeditions={bestSellerExpeditions} /> */}
        <NewHomeMain bestSellerExpeditions={bestSellerExpeditions} />
      </main>
    </>
  );
}
