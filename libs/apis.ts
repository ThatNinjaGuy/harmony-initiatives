import { CreateBookingDto, Room } from "@/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from "axios";

export async function getFeaturedRooms() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomsQuery,
    {},
    // Fetch data everytime afresh
    { cache: "no-cache" }
    //   Fetch data automatically every 30 mins
    // { next: { revalidate: 1800 } }
  );
  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );
  return result;
}

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};
