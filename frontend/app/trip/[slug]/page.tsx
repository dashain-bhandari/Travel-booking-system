import NewTripDetailMain from "@/components/website/TripDetail/NewTripDetail";

import { AxiosInstance } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

// Function to fetch expedition data
async function fetchExpeditionData(slug: string) {
  try {
    const res: any = await AxiosInstance.get(`/expeditions/${slug}`);
    console.log(res?.data);
    return res?.data?.data || {};
  } catch (error: any) {
    console.error("Failed to fetch expedition:", error.message);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params?.slug;
  console.log(slug);
  const expedition = await fetchExpeditionData(slug);

  if (!expedition) {
    return {
      title: "Expedition not found",
      openGraph: {
        images: [],
      },
    };
  }

  const expeditionTitle = expedition.name || "Contour Expedition | Mount";
  const expeditionDescription =
    expedition.subheading ||
    `${expeditionTitle} - One of the greatest mountain.`;
  const expeditionImage = expedition.banner || "";

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${expeditionTitle} | Contour Expedition`,
    description: expeditionDescription,
    openGraph: {
      title: `Contour-Expedition: ${expeditionTitle}`,
      description: expeditionDescription,
      images: [expeditionImage, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = params?.slug;
  const expedition = await fetchExpeditionData(slug);

  if (!expedition) {
    return (
      <main className="z-[20]">
        <p>Expedition not found</p>
      </main>
    );
  }

  return (
    <main className="z-[20]">
      <NewTripDetailMain expedition={expedition} />
    </main>
  );
}
