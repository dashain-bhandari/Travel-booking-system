import { Poppins } from "next/font/google";
// import Footer from "@/components/Footer";
import "../globals.css";
// import OurExpert from "@/components/website/Homepage/OurExpert";
// import Nav from "@/components/Nav";
import { AxiosInstance } from "@/utils";
import { Metadata } from "next";
import { GlobalContextProvider } from "@/context/GlobalContext";
import { Toaster } from "sonner";
import NewNav from "@/components/NewNav";

import NewOurExpert from "@/components/website/Homepage/NewOurExpert";
import NewFooter from "@/components/NewFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/Fav.png",
  },
  title:
    "Contour Expeditions Pvt. Ltd. | Expeditions and Travels Company in Nepal",
  openGraph: {
    title:
      "Contour Expeditions Pvt. Ltd. | Expeditions and Travels Company in Nepal",
    description:
      "Experience the best trekking, mountaineering, and travel experiences in Nepal with Contour Expeditions. Join our expert guides for unforgettable adventures in the heart of the Himalayas.",
    images: [
      "https://res.cloudinary.com/dafkafxrd/image/upload/v1722849515/Contour_Expeditions_Homepage_fxgfdm.png",
    ],
  },
  description:
    "Experience the best trekking, mountaineering, and travel experiences in Nepal with Contour Expeditions. Join our expert guides for unforgettable adventures in the heart of the Himalayas.",
};

export default async function NewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [dimension, setDimension] = useState({ width: 0, height: 0 });
  // useEffect(() => {
  //   const lenis = new Lenis();
  //   const raf = (time: any) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };
  //   const resize = () => {
  //     setDimension({ width: window.innerWidth, height: window.innerHeight });
  //   };

  //   window.addEventListener("resize", resize);
  //   requestAnimationFrame(raf);
  //   resize();

  //   return () => {
  //     window.removeEventListener("resize", resize);
  //   };
  // }, []);

  // const [loading, setLoading] = useState(true);

  // useGSAP(() => {
  //   const textSplit = new SplitType(".opening-title");
  //   const tl = gsap.timeline();
  //   // Perform the animations
  //   tl.from(
  //     textSplit.chars,
  //     {
  //       opacity: 0,
  //       duration: 1.5,
  //       stagger: 0.05,
  //       ease: "sine.inOut",
  //     },
  //     "show"
  //   );
  //   tl.to(
  //     ".opening-image",
  //     {
  //       opacity: 1,
  //       duration: 1,
  //       ease: "sine.inOut",
  //     },
  //     "show"
  //   );
  //   tl.to(
  //     ".opening-image",
  //     {
  //       width: "100vw",
  //       height: "100vh",
  //       duration: 2,
  //       ease: "sine.inOut",
  //     },
  //     "same"
  //   );
  //   tl.to(
  //     ".text",
  //     {
  //       // marginTop: "30%",
  //       display: "none",
  //       duration: 0.5,
  //       ease: "sine.inOut",
  //     },
  //     "same"
  //   );
  //   tl.to(".opening-container", {
  //     opacity: 0,
  //     display: "none",
  //     duration: 0.5,
  //     ease: "sine.inOut",
  //     onComplete: function () {
  //       // Unlock the body scroll after the last animation completes
  //       document.body.style.overflowY = "auto";
  //       setLoading(false);
  //     },
  //   });
  //   document.body.style.overflowY = "hidden";
  // });
  function nestData(data: any) {
    const collectionsMap = new Map();
    const categoriesMap = new Map();

    // Ensure 'data.expedition', 'data.collections', and 'data.categories' are arrays
    if (!Array.isArray(data.expedition)) {
      console.error("Expected 'data.expedition' to be an array.");
      return [];
    }
    if (!Array.isArray(data.collections)) {
      console.error("Expected 'data.collections' to be an array.");
      return [];
    }
    if (!Array.isArray(data.categories)) {
      console.error("Expected 'data.categories' to be an array.");
      return [];
    }

    // Initialize collectionsMap from data.collections
    data.collections.forEach((collection: any) => {
      collectionsMap.set(collection._id, {
        _id: collection._id,
        name: collection.name,
        image: collection.image,
        categories: new Map(),
      });
    });

    // Initialize categoriesMap from data.categories
    data.categories.forEach((category: any) => {
      categoriesMap.set(category._id, {
        _id: category._id,
        name: category.name,
        image: category.image,
        expeditions: [],
      });
    });

    // Process expeditions
    data.expedition.forEach((expedition: any) => {
      // Ensure 'collections' and 'category' exist
      if (!expedition.collections || !expedition.category) {
        console.error(
          "Missing 'collections' or 'category' in expedition:",
          expedition
        );
        return;
      }

      const { collections, category, ...rest } = expedition;

      // Add categories to collections if they are referenced in the expedition
      const collection = collectionsMap.get(collections._id);
      if (collection) {
        if (!collection.categories.has(category._id)) {
          collection.categories.set(category._id, {
            _id: category._id,
            name: category.name,
            image: category.image,
            expeditions: [],
          });
        }

        const cat = collection.categories.get(category._id);
        if (cat) {
          cat.expeditions.push(rest);
        }
      }
    });

    // Convert maps to arrays and structure the final result
    const result = Array.from(collectionsMap.values()).map((collection) => ({
      ...collection,
      categories: Array.from(collection.categories.values()),
    }));

    return result;
  }
  // NavBar SSR FETCH FUNCTION
  let nested: any;
  try {
    const res = await AxiosInstance.get(
      "/nested-data-route/get-data-for-navbar",
      { headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }
    );
    const response = res.data;
    const dataNested = nestData(response);
    nested = dataNested;
  } catch (error) {
    console.log(error);
  }
  let other: any;
  try {
    const params = {
      select: "name activityId slug ",
    };
    const res = await AxiosInstance.get("/activities", {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
      data: params,
    });
    const response = res.data.data;
    other = response;
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang="en" className={poppins.className}>
      <body className="">
        {/* <div className="w-full opening-container h-screen bg-white fixed flex justify-center items-center top-0 left-0 z-[200]">
          <div className="flex flex-col gap-10 items-center">
            <div className="bg-black opening-image  opacity-0 overflow-hidden w-[20rem] h-[20rem]">
              <Image
                src={HeroImg}
                alt=""
                className="w-full h-[105vh] object-cover object-center brightness-[0.5]"
              ></Image>
            </div>
            <div className=" text-2xl opening-title absolute bottom-[5vh] text  font-semibold uppercase text-zinc-800">
              Path for everone, make your journyey..
            </div>
          </div>
        </div> */}

        <NewNav navData={nested} other={other} />
        <div
          className={`w-full mx-auto h-full bg-[#EAEAEA] "
            z-20`}
        >
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </div>
        <NewOurExpert />
        <Toaster />
        <NewFooter />
      </body>
    </html>
  );
}
