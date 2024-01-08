import { Room } from "@/components/RoomCard";
import RoomDetails from "@/components/RoomDetails";
import { MdCheck } from "react-icons/md";

export type BookedRoom = {
  bookingId: number;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  bookingCancelled: boolean;
};

interface CancelPage {
  bookedRooms: BookedRoom[];
  setBookedRooms: Function;
}

export default function CancelPage({
  bookedRooms,
  setBookedRooms,
}: CancelPage) {
  return (
    <>
      <main className="pt-32 flex flex-col gap-4 justify-center items-center pb-8">
        <h1 className="text-2xl font-bold text-red mb-2">Future Reservations</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 w-full px-32 justify-items-center place-items-stretch">
          {bookedRooms.length === 0 ? (
            <div className="text-red text-2xl">No future reservations</div>
          ) : (
            bookedRooms.map((bookedRoom, index) => (
              <div key={index} className="flex flex-col items-start justify-start">
                <RoomDetails
                  room={bookedRoom.room}
                  date={bookedRoom.date}
                  startTime={bookedRoom.startTime}
                  endTime={bookedRoom.endTime}
                  cancelButton={
                    bookedRoom.bookingCancelled ?
                      <div className="w-full flex gap-1 justify-center items-center text-red py-2">
                        <div className="">
                          Booking Cancelled
                        </div>
                        <MdCheck className="" size={24} />
                      </div>
                      :
                      <button
                        className="bg-red text-white rounded-lg w-full py-2"
                        onClick={() => {
                          setBookedRooms(bookedRooms.map((bookedRoom, i) => {
                            if (i === index) {
                              bookedRoom.bookingCancelled = true;
                            }
                            return bookedRoom;
                          }));
                        }}
                      >
                        Cancel Reservation
                      </button>
                  }
                ></RoomDetails>
                {/* <button
                className="bg-red text-white rounded-lg w-full py-2 my-5"
                onClick={() => {
                  setBookedRooms(bookedRooms.filter((_, i) => i !== index));
                }}
              >
                Cancel Reservation
              </button> */}
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
