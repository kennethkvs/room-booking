'use client';

import { useEffect, useState } from 'react';

const timeslots = [
  { key: 1, name: "8:00 AM - 8:30 AM" },
  { key: 2, name: "8:30 AM - 9:00 AM" },
  { key: 3, name: "9:00 AM - 9:30 AM" },
  { key: 4, name: "9:30 AM - 10:00 AM" },
  { key: 5, name: "10:00 AM - 10:30 AM" },
  { key: 6, name: "10:30 AM - 11:00 AM" },
  { key: 7, name: "11:00 AM - 11:30 AM" },
  { key: 8, name: "11:30 AM - 12:00 PM" },
  { key: 9, name: "12:00 PM - 12:30 PM" },
  { key: 10, name: "12:30 PM - 1:00 PM" },
  { key: 11, name: "1:00 PM - 1:30 PM" },
  { key: 12, name: "1:30 PM - 2:00 PM" },
  { key: 13, name: "2:00 PM - 2:30 PM" },
  { key: 14, name: "2:30 PM - 3:00 PM" },
  { key: 15, name: "3:00 PM - 3:30 PM" },
  { key: 16, name: "3:30 PM - 4:00 PM" },
  { key: 17, name: "4:00 PM - 4:30 PM" },
  { key: 18, name: "4:30 PM - 5:00 PM" },
  { key: 19, name: "5:00 PM - 5:30 PM" },
  { key: 20, name: "5:30 PM - 6:00 PM" },
  { key: 21, name: "6:00 PM - 6:30 PM" },
  { key: 22, name: "6:30 PM - 7:00 PM" },
  { key: 23, name: "7:00 PM - 7:30 PM" },
  { key: 24, name: "7:30 PM - 8:00 PM" },
  { key: 25, name: "8:00 PM - 8:30 PM" },
  { key: 26, name: "8:30 PM - 9:00 PM" },
  { key: 27, name: "9:00 PM - 9:30 PM" },
  { key: 28, name: "9:30 PM - 10:00 PM" },
  { key: 29, name: "10:00 PM - 10:30 PM" },
  { key: 30, name: "10:30 PM - 11:00 PM" },
  { key: 31, name: "11:00 PM - 11:30 PM" },
  { key: 32, name: "11:30 PM - 12:00 AM" },
];

interface Timeslots {
  selectedSlots: Set<number>;
  setSelectedSlots: Function;
  nextButtonDisabled: boolean;
  setNextButtonDisabled: Function;
  setCompletedStages: Function;
}

export default function Timepicker({
  selectedSlots,
  setSelectedSlots,
  nextButtonDisabled,
  setNextButtonDisabled,
  setCompletedStages,
}: Timeslots) {
  const [dragOperation, setDragOperation] = useState<
    'Selecting' | 'Deselecting' | 'None'
  >('None');
  const [dragStartIndex, setDragStartIndex] = useState<number>(-1);

  // some pretty ugly logic...
  // basically, clicking will start a drag where slots are selected/deselected
  // + some other features to make it nice
  const handleMouseDown = (key: number) => {
    setDragStartIndex(key);
    // if we're clicking on a selected slot, deselect it
    if (selectedSlots.has(key)) {
      setDragOperation('Deselecting');
      selectedSlots.delete(key);
      // if we deselect in a block of slots, deselect everything after it too
      if (selectedSlots.has(key - 1) && selectedSlots.has(key + 1)) {
        for (let i = key; i <= timeslots.length; i++) {
          if (selectedSlots.has(i)) {
            selectedSlots.delete(i);
          }
        }
      }
    }
    // if we're clicking on an unselected slot, select it
    else {
      setDragOperation('Selecting');
      // if there's already a block of selected slots, unselect them and select this one
      if (!selectedSlots.has(key - 1) && !selectedSlots.has(key + 1)) {
        selectedSlots.clear();
        selectedSlots.add(key);
      }
      // in this case we're selecting next to a block of selected slots
      else {
        selectedSlots.add(key);
      }
    }
    setSelectedSlots(new Set(selectedSlots));
    setCompletedStages(0);
  };

  // logic to select/deselect slots while dragging
  const handleDrag = (key: number) => {
    // if we simply select/deselect the slot, then slots can get skipped over
    // because the mouse moves faster than the event handler can fire
    // so we need to make sure to select/deselect all the slots in between
    for (
      let i = Math.min(dragStartIndex, key);
      i <= Math.max(dragStartIndex, key);
      i++
    ) {
      if (dragOperation === 'Selecting' && !selectedSlots.has(i)) {
        selectedSlots.add(i);
      }
      if (dragOperation === 'Deselecting' && selectedSlots.has(i)) {
        selectedSlots.delete(i);
      }
    }
    setSelectedSlots(new Set(selectedSlots));
  };

  // stop dragging when we let go of the mouse or it leaves the timeslots div
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDragOperation('None');
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDragOperation('None');
  };
  // if we don't include this, the browser will select text and everything will get messed up
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setNextButtonDisabled(selectedSlots.size == 0);
  }, [selectedSlots, setNextButtonDisabled]);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col border-2 border-red rounded-md w-[300px] h-full"
        id="timeslots"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {timeslots.map((slot, i) => (
          <div
            key={slot.key}
            className={`relative border-2 border-red flex-1 ${
              selectedSlots.has(slot.key) ? 'bg-red/40' : ''
            }`}
            onMouseEnter={() => handleDrag(slot.key)}
            onMouseDown={() => handleMouseDown(slot.key)}
          >
            {i % 2 == 0 && ( // show the time on every other slot
              <div className="absolute text-red z-10 -mt-[14px] ml-[100%] pl-2">
                {indexToTime(i)}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedSlots.size == 0
        ? 'Select a time slot'
        : `You selected ${indexToTime(
            Math.min(...Array.from(selectedSlots)) - 1
          )} to ${indexToTime(Math.max(...Array.from(selectedSlots)))}`}
      .
    </div>
  );
}

function indexToTime(i: number) {
  return `${(Math.floor(i / 2 + 7) % 12) + 1}:${i % 2 == 0 ? '0' : '3'}0${
    i / 2 + 8 <= 11 ? 'AM' : 'PM'
  }`;
}
