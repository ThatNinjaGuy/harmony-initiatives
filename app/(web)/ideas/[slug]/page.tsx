"use client";

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/app/components/HotelPhotoGallery/HotelPhotoGallery";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCta from "@/app/components/BookRoomCta/BookRoomCta";
import { useState } from "react";
import { toast } from "react-hot-toast";

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
            {/* Hotel Information */}
            <h2 className="font-bold text-left text-lg md:text-2xl">
              {room.name} ({room.dimension})
            </h2>
            <div className="flex my-11">
              {room.offeredAmenities.map((ammenity) => (
                <div
                  key={ammenity._key}
                  className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                >
                  <i className={`fa-solid ${ammenity.icon} md:text-2xl`} />
                  <p className="text-xs md:text-base pt-3">
                    {ammenity.amenity}
                  </p>
                </div>
              ))}
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">Description</h2>
              <p>{room.description}</p>
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">Offered Amenities</h2>
              <div className="grid grid-cols-2">
                {room.offeredAmenities.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="flex items-center md:my-0 my-1"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`} />
                    <p className="text-xs md:text-base pt-3 ml-2">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">Safety And Hygiene</h2>
              <div className="grid grid-cols-2">
                <div className="flex items-center my-1 md:my-0">
                  <MdOutlineCleaningServices />
                  <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <LiaFireExtinguisherSolid />
                  <p className="ml-2 md:text-base text-xs">
                    Fire Extinguishers
                  </p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <AiOutlineMedicineBox />
                  <p className="ml-2 md:text-base text-xs">
                    Disinfections & Sanitizations
                  </p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <GiSmokeBomb />
                  <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                </div>
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