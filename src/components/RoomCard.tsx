import { GrGroup, GrPlug } from 'react-icons/gr';
import { MdCheck } from "react-icons/md";
import { BiError } from "react-icons/bi";
import Image from 'next/image';
import { utilityToIcon } from '@/sections/FiltersPage';
import { Utility } from '@/sections/RoomsPage';
import { useState } from 'react';

export type Room = {
  score: number;
  capacityMatches: boolean | null;
  matchingUtilities: Utility[];
  missingUtilities: Utility[];
  buildingMatches: boolean | null;
  name: string;
  capacity: number;
  utilities: Set<Utility>;
  building: string;
  image: string;
  numOutlets: number;
}

interface RoomCard {
  room: Room;
  setSelectedRoom: Function;
  setCurrentPage: Function;
}

export default function RoomCard({
  room,
  setSelectedRoom,
  setCurrentPage,
}: RoomCard) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex h-[250px] p-4 border-red border-4 rounded-xl gap-4 w-full md:w-[750px]">
      {/* image */}
      <div className="h-full aspect-square rounded-xl hidden sm:block relative">
        <Image
          src={`/images/room-images/${room.image}`}
          width={210}
          height={210}
          className="rounded-xl w-full h-full object-cover"
          alt="Picture of the room"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded &&
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
            </div>
          </div>
        }
      </div>

      {/* info */}
      <div className="flex flex-col gap-4 text-red flex-1">
        <div className="">
          <div className={`flex gap-2 items-center ${room.buildingMatches === false ? "text-rose-700" : ""}`}>
            <BiError size={24} className={`${room.buildingMatches !== false ? "hidden" : ""}`} />
            <div>{room.building}</div>
            {room.buildingMatches === true && <MdCheck className="-ml-1" size={24} />}
          </div>
          <div className="text-4xl leading-7 -mt-[5px]">{room.name}</div>
        </div>
        <div className="w-full flex">
          <div className={`basis-1/2 flex items-center gap-2 ${room.capacityMatches === false ? "text-rose-700" : ""}`}>
            {room.capacityMatches !== false ?
              <GrGroup size={24} />
              :
              <BiError size={24} className={`${room.capacityMatches ? "hidden" : ""}`} />
            }
            <span>{room.capacity} people</span>
            {room.capacityMatches === true && <MdCheck className="-ml-1" size={24} />}
          </div>
          <div className="basis-1/2 flex items-center gap-2">
            <GrPlug className="" size={24} />
            <span className="">{room.numOutlets} outlets</span>
          </div>
        </div>
        <div className="flex">
          {(room.matchingUtilities.length > 0 || room.utilities.size > 0) &&
            <ul className="basis-1/2">
              {
                room.matchingUtilities.map((util, i) => {
                  return (
                    <li
                      className="flex items-center gap-2 text-red"
                      key={i}
                    >
                      {utilityToIcon[util]}
                      <span className="">{util}</span>
                      <MdCheck className="-ml-1" size={24} />
                    </li>
                  );
                })
              }
              {
                Array.from(room.utilities).filter((util) => !room.matchingUtilities.includes(util)).map((util, i) => {
                  return (
                    <li
                      className="flex items-center gap-2 text-red"
                      key={i}
                    >
                      {utilityToIcon[util]}
                      <span className="">{util}</span>
                    </li>
                  );
                })
              }
            </ul>
          }
          {room.missingUtilities.length > 0 &&
            <ul className="basis-1/2">
              {room.missingUtilities.map((util, i) => {
                return (
                  <li
                    className="flex items-center gap-2 text-rose-700"
                    key={i}
                  >
                    <BiError className="" size={24} />
                    <span className="">No {util[0].toLowerCase()}{util.slice(1)}</span>
                  </li>
                );
              })}
            </ul>
          }
        </div>
      </div>

      {/* match */}
      <div className="flex flex-col h-full p-4 gap-4">
        <div className="h-full flex justify-center items-center">
          <ProgressCircle percentFilled={room.score} />
        </div>
        <button
          className="w-full text-white bg-amber-350 rounded-xl px-4 py-2 text-center"
          onClick={() => {
            setSelectedRoom(room);
            setCurrentPage('confirm');
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

function ProgressCircle({ percentFilled }: { percentFilled: number }) {
  return (
    <div className="relative w-28 h-28 text-red">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* <!-- Background circle --> */}
        <circle
          className="text-gray-200 stroke-current"
          stroke-width="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* <!-- Progress circle --> */}
        <circle
          className="text-red progress-ring__circle stroke-current"
          stroke-width="10"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          // https://stackoverflow.com/a/77095851
          stroke-dashoffset={`calc(400 - (250 * ${percentFilled}) / 100)`}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center leading-[14px]">
        {percentFilled}%<br />
        Match
      </div>
    </div>
  );
}
