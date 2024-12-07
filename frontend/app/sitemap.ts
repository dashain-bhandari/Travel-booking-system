import { AxiosInstance } from "@/utils";
import { MetadataRoute } from "next";

const publicUrl = "https://staging.contourexpeditions.com";

export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await AxiosInstance.get(
    "/expeditions/get-all/plane-data-without-populate"
  );
  const expeditions = res?.data?.data || [];

  const expeditionUrls = expeditions.map((expedition: any) => ({
    url: `${publicUrl}/trip/${expedition.slug}`,

    lastModified: new Date(expedition.updatedAt).toISOString(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: publicUrl,
      changeFrequency: "always",
      priority: 1,
    },

    {
      url: `${publicUrl}/about_us`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${publicUrl}/contact_us`,
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${publicUrl}/our_team`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${publicUrl}/message_from_ceo`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${publicUrl}/certificates`,
      changeFrequency: "daily",
      priority: 0.8,
    },

    // Add other  here

    ...expeditionUrls,
  ];
}

// export const revalidate = 3600 // revalidate at most every hour
export const revalidate = 30; // revalidate at most every 30 second
