"use client";

import Header from "../components/Header";
import CancelPage, { BookedRoom } from "../sections/CancelPage";
import ConfirmPage from "../sections/ConfirmPage";
import DonePage from "../sections/DonePage";
import DatetimePage from "../sections/DatetimePage";
import FiltersPage from "../sections/FiltersPage";
import MainPage from "../sections/MainPage";
import RoomsPage, { Building, Utility } from "../sections/RoomsPage";

import { format } from "date-fns";

import { useState } from "react";
import { Room } from "@/components/RoomCard";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("main");
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<Set<number>>(
    new Set<number>([])
  );
  const [filters, setFilters] = useState({
    capacity: new Set<string>(["Any"]),
    utilities: new Set<Utility>([]),
    buildings: new Set<Building>(["Any"]),
  });
  const [selectedRoom, setSelectedRoom] = useState<Room>({
    score: 0,
    capacityMatches: true,
    matchingUtilities: [],
    missingUtilities: [],
    buildingMatches: true,
    name: "",
    capacity: 0,
    utilities: new Set<Utility>(),
    building: "",
    image: "",
    numOutlets: 0,
  });

  const [completedStages, setCompletedStages] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);

  let next = undefined,
    back = undefined,
    stage = undefined,
    renderedPage = null;

  const reset = () => {
    setSelectedDay(new Date());
    setSelectedSlots(new Set<number>([]));
    setFilters({
      capacity: new Set<string>(["Any"]),
      utilities: new Set<Utility>([]),
      buildings: new Set<Building>(["Any"]),
    });
    setCompletedStages(0);
  }

  switch (currentPage) {
    case "main":
      renderedPage = (
        <MainPage
          setCurrentPage={setCurrentPage}
          bookedRooms={bookedRooms}
          setBookedRooms={setBookedRooms}
        ></MainPage>
      );
      break;
    case "datetime":
      back = "main";
      next = "filters";
      stage = 0;
      renderedPage = (
        <DatetimePage
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          nextButtonDisabled={nextButtonDisabled}
          setNextButtonDisabled={setNextButtonDisabled}
          setCompletedStages={setCompletedStages}
        ></DatetimePage>
      );
      break;
    case "filters":
      back = "datetime";
      next = "rooms";
      stage = 1;
      renderedPage = (
        <FiltersPage
          filters={filters}
          setFilters={setFilters}
          setCompletedStages={setCompletedStages}
        ></FiltersPage>
      );
      break;
    case "rooms":
      back = "filters";
      stage = 2;
      renderedPage = (
        <RoomsPage
          filters={filters}
          setSelectedRoom={setSelectedRoom}
          setCurrentPage={setCurrentPage}
        ></RoomsPage>
      );
      break;
    case "confirm":
      back = "rooms";
      stage = 3;
      renderedPage = (
        <ConfirmPage
          room={selectedRoom}
          date={format(selectedDay, "EEEE, LLLL d, yyyy")}
          startTime={indexToTime(Math.min(...Array.from(selectedSlots)) - 1)}
          endTime={indexToTime(Math.max(...Array.from(selectedSlots)))}
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          bookedRooms={bookedRooms}
          setBookedRooms={setBookedRooms}
        ></ConfirmPage>
      );
      break;
    case "done":
      renderedPage = (
        <DonePage
          room={selectedRoom}
          date={format(selectedDay, "EEEE, LLLL d, yyyy")}
          startTime={indexToTime(Math.min(...Array.from(selectedSlots)) - 1)}
          endTime={indexToTime(Math.max(...Array.from(selectedSlots)))}
          setCurrentPage={setCurrentPage}
          setSelectedRoom={setSelectedRoom}
          reset={reset}
          bookedRooms={bookedRooms}
          setBookedRooms={setBookedRooms}
        ></DonePage>
      );
      break;
    case "cancel":
      back = "main";
      renderedPage = (
        <CancelPage
          bookedRooms={bookedRooms}
          setBookedRooms={setBookedRooms}
        // date={format(selectedDay, "EEEE, LLLL d, yyyy")}
        // startTime={indexToTime(Math.min(...Array.from(selectedSlots)) - 1)}
        // endTime={indexToTime(Math.max(...Array.from(selectedSlots)))}
        ></CancelPage>
      );
      break;
    default:
      break;
  }

  const headerProps = {
    back,
    next,
    stage,
    currentPage,
    setCurrentPage,
    reset,
    nextButtonDisabled,
    setNextButtonDisabled,
    completedStages,
    setCompletedStages,
  };

  return (
    <>
      <Header {...headerProps}></Header>
      <div className={`
        ${currentPage === "main" || currentPage === "done" || currentPage === "cancel" ? "" :
          "pt-52 relative"}
        `}>{renderedPage}</div>
    </>
  );
}

function indexToTime(i: number) {
  return `${(Math.floor(i / 2 + 7) % 12) + 1}:${i % 2 == 0 ? "0" : "3"}0${i / 2 + 8 <= 11 ? "AM" : "PM"
    }`;
}
