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
        <span
          className={`${
            discount ? "text-gray-400 line-through" : ""
          } font-bold text-xl`}
        >
          ₹ {price}{" "}
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            | Discount {discount}%. Now{" "}
            <span className="text-tertiary-dark">₹ {discountPrice}</span>
          </span>
        ) : (
          ""
        )}
      </h3>
      <div className="w-full border-b-2 border-b-secondary my-2" />
      <h4>{specialNote}</h4>
      <div className="w-full my-3" />

      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check In Date
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary-600"
          />
        </div>
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check Out Date
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkInDate}
            minDate={calculateMinimumCheckoutDate()}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary-600"
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={minAdults}
            max={maxAdults}
            className="w-full border border-gray-300 rounded-lg p-2.5 "
          />
        </div>
        <div className="w-1/2 pr-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={childrenNum}
            onChange={(e) => setChildrenNum(+e.target.value)}
            min={minChildren}
            max={maxChildren}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>
      {calculateNumberOFDays() > 0 ? (
        <p className="mt-3">
          Total Price: ${calculateNumberOFDays() * discountPrice}{" "}
        </p>
      ) : (
        <></>
      )}
      <button
        onClick={handleBookNowClick}
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? "Booked" : "Book Now!"}
      </button>
    </div>
  );
};

export default BookRoomCta;
