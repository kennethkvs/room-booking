import { GrGroup, GrPlug } from 'react-icons/gr';
import { FaRegBuilding } from "react-icons/fa";
import { BsProjector } from "react-icons/bs";
import { BiSolidChalkboard, BiChalkboard } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import FilterButtons from '../components/FilterButtons';
import Image from 'next/image';
import { Utility, buildings, utilities } from './RoomsPage';

// Capacity Options
const capacityOptions = ['Any', '1-4', '5-9', '10-20', '>20'];
// Utilities Options
const utilityOptions = utilities;
// Building Options
const buildingOptions = buildings;

export const utilityToIcon = {
  'Projector/TV': <BsProjector size={24} />,
  'Whiteboard': <BiChalkboard size={24} />,
  'Blackboard': <BiSolidChalkboard size={24} />,
  'Computer': <RiComputerLine size={24} />,
}

interface FiltersPage {
  filters: {
    capacity: Set<string>;
    utilities: Set<string>;
    buildings: Set<string>;
  };
  setFilters: Function;
  setCompletedStages: Function;
}

export default function FiltersPage({ filters, setFilters, setCompletedStages }: FiltersPage) {
  return (
    <>
      <main className="flex justify-center">
        <div className="flex flex-col items-start max-w-[500px] gap-5">
          {/* Capacity*/}
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              <GrGroup className="text-red" size={30} />
              <h1 className="text-2xl font-bold text-red algin-middle">
                Capacity
              </h1>
            </div>
            <div className="flex flex-row justify-start flex-wrap">
              {/* {displayCapacity} */}
              <FilterButtons
                filters={filters.capacity}
                setFilters={(newCapacities: Set<string>) =>
                  setFilters({ ...filters, capacity: newCapacities })
                }
                items={capacityOptions}
                setCompletedStages={setCompletedStages}
              />
            </div>
          </div>

          {/* Utilities */}
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              <GrPlug className="text-red" size={30} />
              <h1 className="text-2xl font-bold text-red algin-middle leading-[3rem]">
                Utilities
              </h1>
            </div>
            <div className="flex flex-row justify-start flex-wrap">
              {/* {displayUtilities} */}
              <FilterButtons
                filters={filters.utilities}
                setFilters={(newUtilities: Set<string>) =>
                  setFilters({ ...filters, utilities: newUtilities })
                }
                items={Array.from(utilityOptions)}
                setCompletedStages={setCompletedStages}
              />
            </div>
          </div>

          {/* Building */}
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              <FaRegBuilding  className="text-red" size={30} />
              <h1 className="text-2xl font-bold text-red algin-middle leading-[3rem]">
                Building
              </h1>
            </div>
            <div className="flex flex-row justify-start flex-wrap">
              {/* {displayBuilding} */}
              <FilterButtons
                filters={filters.buildings}
                setFilters={(newBuildings: Set<string>) =>
                  setFilters({ ...filters, buildings: newBuildings })
                }
                items={Array.from(buildingOptions)}
                setCompletedStages={setCompletedStages}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
