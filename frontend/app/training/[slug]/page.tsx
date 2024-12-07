
import TrainingDetail from "@/components/website/Training/TrainingDetail/TrainingDetail";
import React from "react";
import { usePathname } from "next/navigation";
import { AxiosInstance } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import TrainingData from "@/data/TrainingData";
type Props = {
  params: {
    slug: string;
  };
};

async function fetchTrainingData(slug: string) {
  console.log(slug)
  try {
    const res: any = await AxiosInstance.get(`/training/${slug}`);
    return res?.data?.data || {};
  } catch (error: any) {
    console.error("Failed to fetch training:", error.message);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params?.slug;
  const trainingData = await fetchTrainingData(slug);

  if (!trainingData) {
    return {
      title: "Training not found",
      
    };
  }

  const trainingHeading = trainingData?.heading|| "Default Title";
  const trainingDescription = trainingData?.description || "Default Description";

  

  return {
    title: `${trainingHeading} | Contour Expedition`,
    description: trainingDescription,
   
  };
}
export default  async function Page({ params }: any) {
  
  const { slug } = params;

  const trainingData = await fetchTrainingData(slug);

  if (!trainingData) {
    return (
      <main className="z-[20] bg-[#EAEAEA]">
        <p>Training not found</p>
      </main>
    );
  }
  return (
    <div className="">
      <TrainingDetail training={trainingData} />
    </div>
  );
}
