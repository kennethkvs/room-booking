"use client";
import Popup from "reactjs-popup";
import { GrGroup } from "react-icons/gr";
import { FaXmark } from "react-icons/fa6";
import { utilityToIcon } from "@/sections/FiltersPage";
import { Room } from "./RoomCard";
import Image from "next/image";
import { useState } from "react";

interface RoomDetails {
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  cancelButton?: JSX.Element;
}

export default function RoomDetails({
  room,
  date,
  startTime,
  endTime,
  cancelButton,
}: RoomDetails) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1 items-start border-4 border-red p-5 rounded-lg w-[350px] h-full">
        <h2 className="text-xl font-bold">
          {room.building} - {room.name}
        </h2>
        <button
          className="text-red underline"
          onClick={() => setOpen((o) => !o)}
        >
          {" "}
          Get Directions{" "}
        </button>
        <Popup open={open} closeOnDocumentClick onClose={closeModal} overlayStyle={{ background: 'rgba(0,0,0,0.2)' }} >
          <div className="w-[80vw] h-[80vh] bg-white border-4 border-red flex flex-col items-center">
            <button
              className="cursor-pointer absolute block p-1 -right-4 -top-4 bg-white border-4 border-red rounded-full"
              onClick={closeModal}
            >
              <FaXmark size={24} />
            </button>
            <div className="h-full w-full flex flex-col">
              <div className="text-center text-2xl text-red pt-2">{room.building} {room.name} Floor Plan</div>
              <div className="w-full h-full relative">
                <Image
                  className="object-scale-down w-full h-[90%] p-4"
                  src={`/images/floor-plans/${room.image}`}
                  width={800}
                  height={800}
                  alt="Floor plan"
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
            </div>
          </div>
        </Popup>
        <p className="text-lg">Date: {date}</p>
        <p className="text-lg">
          Time: {startTime} - {endTime}
        </p>
        <ul className="flex flex-col gap-1">
          <li className="flex items-center gap-2">
            <GrGroup className="" size={24} />
            <span className="">{room.capacity} people</span>
          </li>
          {
            Array.from(room.utilities).map((util, i) => {
              return (
                <li
                  className="flex items-center gap-2"
                  key={i}
                >
                  {utilityToIcon[util]}
                  <span className="">{util}</span>
                </li>
              );
            })
          }
        </ul>
        {cancelButton &&
          <div className="w-full pt-5 mt-auto">
            {cancelButton}
          </div>
        }
      </div>
    </>
  );
}
