import OtherActivitiesMain from "@/components/website/OtherActivities/OtherActivitiesMain";
import { AxiosInstance } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    activity: string;
  };
};

// Function to fetch activity data
async function fetchActivityData(activity: string) {
  console.log(activity)
  try {
    const res: any = await AxiosInstance.get(`/activities/${activity}`);
    return res?.data?.data || {};
  } catch (error: any) {
    console.error("Failed to fetch activity:", error.message);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const activity = params?.activity;
  const activityData = await fetchActivityData(activity);

  if (!activityData) {
    return {
      title: "Activity not found",
      openGraph: {
        images: [],
      },
    };
  }

  const activityTitle = activityData.name || "Default Title";
  const activityDescription = activityData.slug || "Default Description";
  const activityImage = activityData.banner || "";

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${activityTitle} | Contour Expedition`,
    description: activityDescription,
    openGraph: {
      title: `${activityTitle} | Contour Expedition`,
      description: activityDescription,
      images: [activityImage, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const activity = params?.activity;
  const activityData = await fetchActivityData(activity);

  if (!activityData) {
    return (
      <main className="z-[20] bg-[#EAEAEA]">
        <p>Activity not found</p>
      </main>
    );
  }

  return (
    <main className="z-[20] bg-[#EAEAEA]">
      <OtherActivitiesMain activity={activityData} />
    </main>
  );
}
