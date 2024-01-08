import { Room } from "@/components/RoomCard";
import RoomDetails from "@/components/RoomDetails";
import { BookedRoom } from "./CancelPage";
import { MdCheck } from "react-icons/md";

interface DonePage {
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  setCurrentPage: Function;
  setSelectedRoom: Function;
  reset: Function;
  bookedRooms: BookedRoom[];
  setBookedRooms: Function;
}

export default function DonePage({
  room,
  date,
  startTime,
  endTime,
  setCurrentPage,
  setSelectedRoom,
  reset,
  bookedRooms,
  setBookedRooms,
}: DonePage) {
  return (
    <>
      <main className="w-screen h-screen flex justify-center items-center">
        <div className="w-full flex flex-row items-center justify-center mx-20 gap-32">
          <div className="flex flex-col items-end basis-1/2">
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
              {/* Cancel Button */}
              {
                bookedRooms[bookedRooms.length - 1].bookingCancelled ?
                  <div className="w-full flex gap-1 justify-center items-center text-red py-2 my-5">
                    <div className="">
                      Booking Cancelled
                    </div>
                    <MdCheck className="" size={24} />
                  </div>
                  :
                  <button
                    className="bg-red text-white rounded-lg w-full py-2 my-5"
                    onClick={() => {
                      setBookedRooms(bookedRooms.map((bookedRoom, i) => {
                        if (i === bookedRooms.length - 1) {
                          bookedRoom.bookingCancelled = true;
                        }
                        return bookedRoom;
                      }));
                    }}
                  >
                    Cancel Reservation
                  </button>}
            </div>
          </div>
          <div className="flex flex-col items-start basis-1/2">
            {room.score != 0 ? (
              <>
                <h1 className="text-4xl font-bold text-red">
                  Booking Confirmed!
                </h1>
                <div className="flex gap-1 items-center text-red mb-5 text-2xl">
                  <p className="font-bold">
                    Email Confirmation Sent
                  </p>
                  <MdCheck />
                </div>
              </>
            ) : (
              <></>
            )}
            <button
              onClick={() => { reset(); setCurrentPage("main"); }}
              className="w-3/4 text-center text-white rounded sm:text-lg md:text-xl lg:text-2xl py-1 md:py-2 lg:py-4 bg-yellow"
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
