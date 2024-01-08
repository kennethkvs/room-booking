"use client";
import React, { useState } from "react";

import RoomDetails from "@/components/RoomDetails";
import { Room } from "@/components/RoomCard";
import { BookedRoom } from "./CancelPage";

let counter = 0;

interface ConfirmPage {
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  setCurrentPage: Function;
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  bookedRooms: BookedRoom[];
  setBookedRooms: Function;
}

export default function ConfirmPage({
  room,
  date,
  startTime,
  endTime,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  bookedRooms,
  setBookedRooms,
}: ConfirmPage) {
  const [email, setEmail] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const values = [...email];
    values[index] = e.target.value;
    setEmail(values);
  };

  const handleDeleteField = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const values = [...email];
    values.splice(index, 1);
    setEmail(values);
    counter--;
  };

  return (
    <>
      <main className={`flex flex-row ${isLoggedIn ? "" : "items-center"} justify-center mx-20`}>
        <div className="flex flex-col items-start w-1/2 mr-5">
          {isLoggedIn ? (
            <>
              <h1 className="text-2xl font-bold text-red">
                Email Confirmation will be sent to:
              </h1>
              <h1 className="text-2xl font-bold text-slate-500">
                YourMacID@mcmaster.ca
              </h1>
              <h1 className="text-2xl font-bold text-red mt-10">
                Optionally add group member emails to send them confirmation & directions:
              </h1>
              <div className="flex flex-col items-start w-full">
                {email.map((email, index) => (
                  <div key={index} className="flex flex-row flex-nowrap">
                    <input
                      className="text-red rounded-md outline-3 outline outline-red w-72 my-2 py-1 px-2 focus:outline-amber-350"
                      type="email"
                      placeholder="MacID@mcmaster.ca"
                      value={email}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <button
                      className="text-red rounded-md outline-3 outline my-2 mx-3 py-1 px-2"
                      onClick={(e) => handleDeleteField(e, index)}
                    >
                      X
                    </button>
                  </div>
                ))}
                {counter < 5 ? (
                  <button
                    className="text-red rounded-md outline-3 outline-dashed w-[80%] my-2 py-1 px-2"
                    onClick={() => {
                      setEmail([...email, ""]);
                      counter++;
                    }}
                  >
                    Add Email
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <button
              className="bg-yellow text-white rounded-lg w-[80%] px-10 py-4 my-5"
              onClick={() => setIsLoggedIn(true)}
            >
              Log In With Avenue
            </button>
          )}
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-red mb-2">
            Room Details
          </h1>
          <RoomDetails
            room={room}
            date={date}
            startTime={startTime}
            endTime={endTime}
          />
          {/* Confirmation Button */}
          <button
            disabled={!isLoggedIn}
            className={`${isLoggedIn
              ? ""
              : "opacity-40 cursor-not-allowed"
              } ${!isLoggedIn ? "bg-red" : "bg-yellow"}
          text-white rounded-lg w-full py-2 my-5`}
            onClick={() => {
              setCurrentPage("done");
              setBookedRooms([...bookedRooms, {
                room: room,
                date: date,
                startTime: startTime,
                endTime: endTime,
                bookingId: Math.max(...bookedRooms.map((bookedRoom: BookedRoom) => bookedRoom.bookingId), 0) + 1,
                bookingCancelled: false,
              }]);
            }}
          >
            Confirm
          </button>
        </div>
      </main>
    </>
  );
}
