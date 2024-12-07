import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm } from "react-hook-form";
import SharePhoto from "@/public/training/training1.png";
import ReviewProfile from "@/public/Team/MD.jpg";
import { GlobalContext } from "@/context/GlobalContext";
import useCloudinaryMultipleImageUpload from "@/hooks/useCloudinaryMultipleImageUpload";
import { AxiosInstance } from "@/utils";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { whileViewVarients } from "../Animation/WhileViewVarients";
type Props = {
  id: any;
};

const reviews: any = [
  {
    id: 1,
    name: "John Doe",
    country: "USA",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, temporibus minus! Eaque eligendi pariatur neque officiis id obcaecati accusamus totam.",
    media: [
      { type: "image", name: "SharePhoto", src: SharePhoto },
      {
        type: "video",
        name: "SampleVideo",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      { type: "image", name: "SharePhoto", src: SharePhoto },
      { type: "image", name: "SharePhoto", src: SharePhoto },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    country: "Canada",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, temporibus minus! Eaque eligendi pariatur neque officiis id obcaecati accusamus totam.",
    media: [
      { type: "image", name: "SharePhoto", src: SharePhoto },
      { type: "image", name: "SharePhoto", src: SharePhoto },
      {
        type: "video",
        name: "SampleVideo",
        src: "https://www.w3schools.com/html/movie.mp4",
      },
      { type: "image", name: "SharePhoto", src: SharePhoto },
    ],
  },
];

export default function TripReview({ id }: Props) {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  // const { currentUser } = useContext(GlobalContext);

  const [accessToken, setAccessToken] = useState(null);

  const { uploading, handleFileUpload, imageUrl, setImageUrl } =
    useCloudinaryMultipleImageUpload();
  const [previewUrl, setPreviewUrl] = useState<any[]>([]);
  const { currentUser }: any = useContext(GlobalContext);

  console.log(currentUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const allInputField = watch();

  const handleOpenForm = () => {
    if (currentUser) {
      setOpenForm(true);
      document.body.style.overflowY = "hidden";
    } else {
      router.push("/login");
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    document.body.style.overflowY = "auto";
  };

  const handleMediaClick = (item: any) => {
    setSelectedMedia(item);
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
  };

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    const token: any = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `review/by-expiditionId/${id}`
        );
        // const { data } = await axios.get(`http://localhost:5017/api/review/by-expiditionId/${id}`);
        data?.data && setReviews(data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchReviews();
  }, [id]);

  // console.log("reviews list", reviews);

  const onSubmit = async () => {
    try {
      const { data } = await AxiosInstance.post("review", {
        ...allInputField,
        images: imageUrl,
        rating,
        expedition: id,
        user: currentUser?._id,
      });
      // const { data } = await axios.post('http://localhost:5017/api/review', { ...allInputField, images: imageUrl, rating, expedition: id, user: currentUser?._id });

      toast.success("Review submitted.");
      setOpenForm(false);
    } catch (error: any) {
      toast.success("Something went wrong.");
      setOpenForm(false);
    }
  };

  const formatDate = (dateString: any) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const [viewMore, setViewMore] = useState<any>(false);

  const handleViewMore = (reviewId: any) => {
    setViewMore(!viewMore);
  };

  const verifiedReviews =
    reviews && reviews.filter((review: any) => review.isVerified);

  return (
    <>
      <div className="w-full md:px-[2rem] px-[1rem]">
        <motion.div
          variants={whileViewVarients}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className={`relative rounded-md bg-white p-5 grid ${
            accessToken === null ? "lg:grid-cols-1" : "lg:grid-cols-2"
          } gap-2 justify-center items-start w-full h-full text-start`}
        >
          <div className="md:text-2xl text-xl !font-bold uppercase flex items-center gap-1 itinerary it relative tracking-wide title">
            Customer Review
          </div>
          {accessToken === null ? (
            <p className="text-center">
              Please{" "}
              <span className="text-primary-btn">
                <a href="/login">log in</a>{" "}
              </span>
              to submit a review.
            </p>
          ) : (
            <button
              className="primary-button w-[5rem]"
              onClick={handleOpenForm}
            >
              Write review ?
            </button>
          )}
        </motion.div>
        <div className="w-full mt-[3rem] flex overflow-visible justify-center items-center relative">
          <div className="w-full mx-auto  ">
            {verifiedReviews && verifiedReviews.length > 0 && (
              <>
                <div className="border-l-4 border-l-red-500">
                  <p className="text-main-title-md heading  font-primary text-text-dark mb-2  ml-4 text-left ">
                    All Reviews
                  </p>
                </div>

                <div className="w-full mt-[3rem] grid md:grid-cols-2  lg:grid-cols-2 sm:grid-cols-1 gap-4">
                  {reviews.map((review: any, index: any) => (
                    <>
                      {review?.isVerified && (
                        <>
                          <motion.div
                            variants={whileViewVarients}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            key={review.id}
                            className="relative border rounded-md px-5 py-6 flex flex-col items-center w-full max-w-lg bg-white shadow-md mt-6 h-auto "
                          >
                            {/* <div className="flex flex-col w-full justify-center items-center text-left gap-4">
                          <div className="flex gap-3 items-start w-full justify-start">
                            <span className="bg-black w-16 h-16 rounded-full overflow-hidden">
                              <Image
                                alt="customer-profile-img"
                                src={ReviewProfile}
                                className="w-full h-full object-cover object-center"
                              />
                            </span>
                            <div className="flex flex-col text-start">
                              <span className="font-semibold text-zinc-800 text-lg">
                                {review?.name}
                              </span>
                              <span className="font-medium text-sm text-zinc-700">
                                {review?.email}
                              </span>
                              <div className="flex items-center">
                                {[...Array(review?.rating || 0)].map((_, i) => (
                                  <Icon
                                    key={i}
                                    icon="material-symbols:star"
                                    className="text-yellow-400 w-3 h-3"
                                  />
                                ))}
                                <span className="ml-2 text-[13px] font-semibold text-zinc-500">
                                  {review?.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-zinc-700 text-[15px]">
                            {review?.message}
                          </div>
                          <div className="flex w-full justify-start items-center gap-4">
                            {review?.images?.map((item: any, index: any) => (
                              <div
                                key={index}
                                onClick={() => handleMediaClick(item)}
                                className="h-[3rem] w-[3rem] md:w-[4rem] md:h-[4rem] border border-yellow-400 group cursor-pointer hover:rotate-3 duration-200 hover:scale-105 rounded-md bg-black"
                              >
                                {item.includes("image/upload") ? (
                                  <Image
                                    alt="photo-review"
                                    src={item}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover rounded-md object-center brightness-50 group-hover:brightness-100"
                                  />
                                ) : (
                                  <video
                                    src={item}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div> */}
                            <div
                              className="relative w-full"
                              key={review.reviewId}
                            >
                              {/* Profile Image */}
                              <div className="absolute -top-[3.5rem] left-1/2 transform -translate-x-1/2">
                                <img
                                  src={review.user.profile}
                                  alt={review.name}
                                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                                />
                              </div>

                              {/* Rating Stars */}
                              <div className="absolute top-2 right-2 flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-yellow-400"
                                  >
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.055 5.843 1.454 8.268L12 18.902 5.601 23.417l1.454-8.268L1 9.306l8.332-1.151z" />
                                  </svg>
                                ))}
                              </div>

                              {/* Review Content */}
                              <div className="pt-8 text-center">
                                <h3 className="font-semibold text-lg">
                                  {review.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {formatDate(review.createdAt)}
                                </p>
                                <p className="text-gray-700 mt-3">
                                  {!viewMore
                                    ? review.message.slice(0, 100)
                                    : review.message}{" "}
                                  {review.message.length >= 50 ? (
                                    !viewMore ? (
                                      <span
                                        onClick={() =>
                                          handleViewMore(review.id)
                                        }
                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                      >
                                        ...Read More
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          handleViewMore(review.id)
                                        }
                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                      >
                                        Read Less
                                      </span>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Review Images */}
                            {/* <div className="flex mt-4 space-x-2">
                          {review.images?.map((image: any, index: any) => (
                            <img
                              key={index}
                              src={image}
                              alt="Review Image"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div> */}
                          </motion.div>
                        </>
                      )}
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Custom Media Viewer */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            {selectedMedia?.includes("image") ? (
              <Image
                src={selectedMedia}
                alt="Selected media"
                width={600}
                height={600}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] object-contain"
              />
            )}
            <button
              className="absolute top-4 right-4 bg-black text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
              onClick={closeMediaViewer}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-[105] backdrop-blur-md bg-black/40 h-screen flex items-center justify-center"
          >
            <div className="w-full max-w-md mx-auto px-6 py-12 bg-white relative border-0 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md">
              <span
                onClick={handleCloseForm}
                className="absolute uppercase top-[5%] cursor-pointer right-[5%] text-zinc-800"
              >
                <Icon
                  icon="material-symbols:close"
                  className="text-zinc-600 w-6 h-6"
                />
              </span>
              <h1 className="text-2xl font-bold mb-8">Fill up the form</h1>
              <form
                id="form"
                className="relative"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative z-0 w-full mb-5">
                  <input
                    type="text"
                    placeholder="Full name"
                    {...register("name", { required: true })}
                    className="pt-3 text-sm pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 focus:border-zinc-300 border-gray-200"
                  />
                </div>
                <div className="relative z-0 w-full mb-5">
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("email", { required: true })}
                    className="pt-3 text-sm pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 focus:border-zinc-300 border-gray-200"
                  />
                </div>
                <div className="flex py-3 gap-2 items-center justify-center w-full">
                  <span className="text-sm text-nowrap font-medium text-zinc-600">
                    Select photo:
                  </span>
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 cursor-pointer p-2 border border-zinc-300 rounded-md shadow-sm bg-white hover:bg-zinc-100"
                  >
                    <span className="text-sm text-zinc-600">Choose image</span>
                    {/* <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("file")}
                    /> */}
                    <input
                      onChange={(e: any) => {
                        handleFileUpload(e.target.files);
                        for (let file of e.target.files) {
                          const preview = URL?.createObjectURL(file);
                          setPreviewUrl((prevUrls: any) => [
                            ...prevUrls,
                            preview,
                          ]);
                        }
                      }}
                      type="file"
                      multiple
                      className=" w-full absolute  cursor-pointer   z-50 opacity-0"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 overflow-auto w-full gap-1 py-3">
                  {previewUrl &&
                    previewUrl.length !== 0 &&
                    previewUrl.map((item: any, idx: any) => (
                      <>
                        {item.includes("image/upload") ? (
                          <>
                            <Image
                              src={item}
                              alt="Selected media"
                              width={200}
                              height={200}
                              className="max-w-full max-h-[90vh] object-contain"
                            />
                          </>
                        ) : (
                          <>
                            <video
                              src={item}
                              controls
                              autoPlay
                              className="max-w-full max-h-[90vh] object-contain"
                            />
                          </>
                        )}
                      </>
                    ))}
                </div>
                <div className="flex gap-1 mb-5">
                  <span className="text-sm font-medium text-zinc-600">
                    Rate :
                  </span>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={rating}
                    onChange={setRating}
                    isRequired
                  />
                </div>
                <div className="relative z-0 w-full mb-5">
                  <textarea
                    {...register("message")}
                    placeholder="Write your thoughts.."
                    className="pt-3 text-sm h-[10rem] p-2 block w-full px-3 mt-0 bg-transparent rounded-md border appearance-none focus:outline-none focus:ring-0 focus:border-zinc-300 border-gray-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="text-white w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-md text-sm py-2.5 text-center"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
