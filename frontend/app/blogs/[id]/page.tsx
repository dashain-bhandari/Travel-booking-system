import BlogDetailMain from "@/components/website/BlogDetail/BlogDetailMain";
import { AxiosInstance } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: any;
};

// Function to fetch blog data
async function fetchBlogData(slug: string) {
  try {
    const res: any = await AxiosInstance.get(`/blogs`, {
      params: {
        slug: slug,
      },
    });
    return res?.data?.data[0] || {};
  } catch (error: any) {
    console.error("Failed to fetch blog:", error.message);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params?.id;
  const blog = await fetchBlogData(slug);

  if (!blog) {
    // Handle the case where the blog data is not found
    return {
      title: "Blog not found",
      openGraph: {
        images: [],
      },
    };
  }

  const blogTitle = blog.title || "Contour-404";
  const blogDescription = blog.slug || "No such blog";
  const blogImage = blog.banner || "";

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${blogTitle} | Blog | Contour Expedition`,
    description: blogDescription,
    openGraph: {
      title: `Contour-Expedition : ${blogTitle}`,
      description: blogDescription,
      images: [blogImage, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const slug = params?.id;
  const blog = await fetchBlogData(slug);

  if (!blog) {
    // Handle the case where the blog data is not found
    return (
      <main className="z-[20] bg-[#EAEAEA]">
        <p>Blog not found</p>
      </main>
    );
  }

  return (
    <main className="z-[20] bg-[#EAEAEA]">
      <BlogDetailMain blog={blog} />
    </main>
  );
}
