// import AllExpPackage from "@/components/website/AllExpPackage/AllExpPackage";
import { AxiosInstance } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Logo from "@/public/contour_expeditions_logo.png";
import AllExpPackage from "@/components/website/AllExpPackage/AllExpPackage";

type Props = {
  params: {
    distance: string;
  };
  searchParams: {
    cat?: string;
  };
};

// Function to fetch category data
async function fetchCategoryData(distance: string) {
  try {
    const res: any = await AxiosInstance.get(
      `/categories/collection/${distance}`
    );
    console.log("data", res?.data?.data);
    return res?.data?.data || [];
  } catch (error: any) {
    console.error("Failed to fetch categories:", error.message);
    return [];
  }
}

// Function to fetch category data
async function fetchParticularCategoryData(search: string) {
  try {
    const res: any = await AxiosInstance.get(`/categories/${search}`);
    console.log("data", res?.data?.data);
    return res?.data?.data || [];
  } catch (error: any) {
    console.error("Failed to fetch categories:", error.message);
    return [];
  }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const distance = params?.distance;
  const categories = await fetchCategoryData(distance);

  console.log("categories", categories);
  const categoryName = categories.filter(
    (obj: any) => obj._id == searchParams.cat
  );
  // Use categories data to generate metadata
  const title = `Contour Expedition | ${categoryName[0]?.name} | ${categories[0]?.collections?.name}`;
  const description = `${categoryName[0]?.description}.`;
  const images: any = categoryName[0]?.image || []; // Add logic to include relevant images if needed

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [...images, ...previousImages],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const distance = params?.distance;
  console.log(distance);
  const search = searchParams.cat || "";
  const categories = await fetchCategoryData(distance);
  const category = await fetchParticularCategoryData(search);
  return (
    <main className="z-[20] relative w-full">
      <AllExpPackage
        distance={distance}
        query={category?._id}
        categories={categories}
      />
    </main>
  );
}
