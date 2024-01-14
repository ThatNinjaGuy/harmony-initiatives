import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (props) => {
  const {
    room: { coverImage, name, type, description, slug, isBooked },
  } = props;
  return (
    <div className="flex flex-col rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={name}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4 bg-white">
        <div>
          <div className="flex justify-between text-xl font-semibold">
            <p>{name}</p>
            {/* Price can be shown here if needed */}
          </div>
          <p className="pt-2 text-xs">{type} Room</p>
          {/* Set a fixed number of lines for the description */}
          {/* <p className="pt-3 pb-6 overflow-hidden text-xs line-clamp-N">
            {description}
          </p> */}
          <p className="pt-3 pb-6">{description.slice(1, 100)}...</p>
        </div>
        <Link
          href={`/ideas/${slug.current}`}
          className="bg-primary mt-4 inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {isBooked ? "Impact More" : "Shape Lives"}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
