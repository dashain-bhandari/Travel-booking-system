"use client";
import { AxiosInstance } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Page({ params }: any) {
  const router = useRouter();

  const verify = async () => {
    try {
      const res = await AxiosInstance.get(
        `/users/verify-email/${params?.token}`
      );
      if (res.status === 200) {
        toast.success("Email verification success");
        router.push("/login");
      }
    } catch (error: any) {
      const errorMessage = JSON.parse(error.request.response).message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-8 md:p-12 shadow-lg w-11/12 relative md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg">
          <Link
            href={"/"}
            className="absolute text-sm font-medium flex items-center gap-1 top-5 left-5 text-simoBlue"
          >
            <Icon icon="gg:arrow-long-left" /> Home
          </Link>
          {/* <div className="flex items-center justify-center rounded-full mx-24 p-4 md:p-8 mb-6"></div> */}
          <h1 className="text-2xl  md:text-3xl lg:text-2xl text-center mt-6 font-bold text-gray-800">
            Click on verify button to verify your email
          </h1>
          <h2 className="text-center mt-2 text-gray-600">
            {/* <p className="flex flex-col">
              <span>Check your inbox and click the link to activate</span>
              <span>your account.</span>
            </p> */}
          </h2>
          <div className=" flex items-center  justify-center mt-4">
            <button
              onClick={verify}
              className="text-white flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm px-8 py-2.5 text-center "
            >
              {" "}
              Verify <Icon icon="tdesign:verify" className="w-4 h-4" />
            </button>
          </div>
          <div className=" flex items-center mt-4 justify-end hover:text-yellow-500 duration-200 text-sm  gap-4 tracking-wider font-medium  ">
            <Link href="/login" className=" underline font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
