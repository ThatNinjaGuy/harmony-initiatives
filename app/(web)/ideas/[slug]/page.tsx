"use client";

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/app/components/HotelPhotoGallery/HotelPhotoGallery";
import BookRoomCta from "@/app/components/BookRoomCta/BookRoomCta";
import { useState } from "react";
import { toast } from "react-hot-toast";
import YouTubeEmbed from "@/app/components/YoutubeVideoPlayer/YoutubeVideoPlayer";
import Image from "next/image";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  // THis is currently being harcoded but room capacity should be taken as
  //     room parameter and should be passed here to make it dynamic
  const maxAdults = 4,
    minAdults = 1,
    maxChildren = 5,
    minChildren = 0;

  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch rooms details");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch room details");

  if (!room) return <LoadingSpinner />;
  console.log(room);

  const calculateMinimumCheckoutDate = () => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const calculateNumberOfDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const modifyDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return modifyDays;
  };

  const handleBookNowClick = () => {
    if (!checkInDate)
      return toast.error("Please provide appropriate check in date");

    if (!checkOutDate)
      return toast.error("Please provide appropriate check out date");

    if (checkInDate >= checkOutDate)
      return toast.error("Please choose a valid checkin period");

    if (adults < minAdults || adults > maxAdults)
      return toast.error(
        `Number of adults should be between ${minAdults} and ${maxAdults}`
      );

    if (childrenNum < minChildren || childrenNum > maxChildren)
      return toast.error(
        `Number of children should be between ${minChildren} and ${maxChildren}`
      );

    const numOfDays = calculateNumberOfDays();
    const hotelRoomSlug = room.slug.current;
    //   Integrate Stripe

    console.log("Will start booking room now");
  };

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />
      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <h2 className="font-bold text-left text-lg md:text-2xl mb-4">
              {room.name}
            </h2>
            <div className="my-11 w-full h-80 items-center">
              <Image
                alt="gallery"
                className="img"
                src="/images/hero-1.jpg"
                width={200}
                height={200}
              />
            </div>
            {/* <YouTubeEmbed videoId="_dtel_5Mt8o" /> */}
            <div className="my-11">
              <h2 className="font-bold text-3xl mb-2">The Problem!</h2>
              <p>{room.description}</p>
            </div>
            <div className="my-11">
              <h2 className="font-bold text-3xl mb-2">
                How your contribution helps?
              </h2>
              <p>{room.description}</p>
            </div>
            {/* <div className="my-11">
              <h2 className="font-bold text-3xl mb-2">Our Success Story</h2>
              <YouTubeEmbed videoId="_dtel_5Mt8o" />
            </div> */}
            <div className="my-11">
              <h2 className="font-bold text-3xl mb-2">Our Success Story</h2>
              <div className="grid grid-cols-3 gap-5 sm:grid-row">
                {/* <div className="grid grid-cols-3 gap-5 md:flex md:flex-row"> */}
                <YouTubeEmbed videoId="LQhHyCHrgYQ" />
                <YouTubeEmbed videoId="m2fMergvliY" />
                <YouTubeEmbed videoId="MGhxgaKM07Y" />
              </div>
            </div>
            <div className="shadow dark:shadow-white rounded-lg p-6">
              <div className="items-center mb-4">
                <p className="md:text-lg font-semibold">Customer Reviews</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reviews */}
              </div>
            </div>
          </div>
          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
            <BookRoomCta
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              calculateMinimumCheckoutDate={calculateMinimumCheckoutDate}
              adults={adults}
              childrenNum={childrenNum}
              setAdults={setAdults}
              setChildrenNum={setChildrenNum}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
              minAdults={minAdults}
              maxAdults={maxAdults}
              minChildren={minChildren}
              maxChildren={maxChildren}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
