"use client";

import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  price: number;
  discount: number;
  specialNote: string;
  checkInDate: Date | null;
  setCheckInDate: Dispatch<SetStateAction<Date | null>>;
  checkOutDate: Date | null;
  setCheckOutDate: Dispatch<SetStateAction<Date | null>>;
  calculateMinimumCheckoutDate: () => Date | null;
  adults: number;
  childrenNum: number;
  setAdults: Dispatch<SetStateAction<number>>;
  setChildrenNum: Dispatch<SetStateAction<number>>;
  isBooked: boolean;
  handleBookNowClick: () => void;
  minAdults: number;
  maxAdults: number;
  minChildren: number;
  maxChildren: number;
};

const BookRoomCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    calculateMinimumCheckoutDate,
    childrenNum,
    adults,
    setAdults,
    setChildrenNum,
    isBooked,
    handleBookNowClick,
    minAdults,
    minChildren,
    maxAdults,
    maxChildren,
  } = props;
  const discountPrice = price - (price / 100) * discount;

  const calculateNumberOFDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const modifyDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return modifyDays;
  };

  return (
    <div className="px-7 py-6">
      <h3>
        <span className="font-bold text-xl text-tertiary-dark ">Donate</span>
      </h3>
      <div className="w-full border-b-2 border-b-secondary my-2" />
      <div className="pt-2" />
      <h4 className=" text-gray-900 dark:text-gray-400">
        Join us in making a lasting impact on the world!
      </h4>
      <h4 className="">
        Your donation, big or small, fuels change. Corporates, embrace your CSR
        responsibility – partner with us to create a brighter future.
      </h4>
      <div className="pt-2" />
      <h4 className=" text-gray-900 dark:text-gray-400">
        Every contribution counts towards a better tomorrow.
      </h4>
      <div className="w-full my-6" />
      <div className="w-full pr-2 mb-2">
        <label
          htmlFor="adults"
          className="block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Donate
        </label>
        <div className="flex flex-cols gap-10 sm:flex-row">
          <input
            type="number"
            id="adults"
            // value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            // min={minAdults}
            // max={maxAdults}
            placeholder="₹ 9999"
            className="w-3/5 sm:w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 dark:text-gray-400"
          />
          <button
            onClick={handleBookNowClick}
            className="w-2/5 sm:w-full p-2 bg-tertiary-dark rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isBooked ? "Donate More" : "PLEDGE"}
          </button>
        </div>
      </div>
      <div>
        <h3 className="mt-4 mb-2 text-tertiary-dark font-semibold">
          Corporates! Want to understand how you can truly make an impact?
        </h3>
        <button
          onClick={handleBookNowClick}
          className="btn-primary w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isBooked ? "Booked" : "Talk to us!"}
        </button>
      </div>
    </div>
  );
};

export default BookRoomCta;
