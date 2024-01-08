import { useEffect, useState } from 'react';
import styles from '../styles/header.module.css';

const stateConstructor = (
  state: string,
  page: string
): { state: string; page: string } => {
  return { state, page };
};

const states = [
  stateConstructor('Select Date & Time', 'datetime'),
  stateConstructor('Select Filters', 'filters'),
  stateConstructor('Select Room', 'rooms'),
  stateConstructor('Confirm Booking', 'confirm'),
];

interface Header {
  back: string | undefined;
  next: string | undefined;
  reset: Function;
  stage: number | undefined;
  currentPage: string;
  setCurrentPage: Function;
  nextButtonDisabled: boolean;
  setNextButtonDisabled: Function;
  completedStages: number;
  setCompletedStages: Function;
}

/**
 * Header component for pages.
 * back: the page the back button should take you to. Leave undefined to hide.
 * next: the page the next button should take you to. Leave undefined to hide.
 * stage: the current room booking state from 0 to 3. Leave undefined to hide.
 */
export default function Header({
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
}: Header) {
  useEffect(() => {
    if (stage !== undefined && stage > completedStages) setCompletedStages(stage);
  }, [stage, completedStages, setCompletedStages]);


  return (
    <>
      <header className="w-screen flex items-center justify-center flex-col p-5 gap-5 select-none flex-wrap fixed bg-white z-50 border-b-4 border-red">
        {/* Back, Title, Next */}
        <nav className="flex-auto flex w-full text-red gap-1 sm:gap-3 lg:gap-5">
          <div className="flex-1 max-w-[12rem] min-w-[4rem]">
            {back && (
              <button
                onClick={() => {
                  if (back === 'main') reset();
                  setCurrentPage(back);
                }}
                className="flex items-center justify-center text-[0.7rem] sm:text-base lg:text-xl  border-4 rounded-xl border-red h-10 md:h-12 lg:h-16 w-full"
              >
                Back
              </button>
            )}
          </div>

          <button
            onClick={() => {
              reset();
              setCurrentPage('main');
            }}
            disabled={currentPage === 'main'}
            className="flex items-center justify-center text-center text-sm md:text-2xl lg:text-4xl border-solid border-4 rounded-xl border-red flex-auto h-10 md:h-12 lg:h-16"
          >
            McMaster Room Booking
          </button>

          <div className="flex-1 max-w-[12rem] min-w-[4rem]"></div>
        </nav>
        {/* Navigation Bar */}
        {stage !== undefined
          ?
          <nav className="flex w-full lg:w-3/4 h-10 lg:h-16">
            {states.map(({ state, page }, i) => {
              const clickable = i <= completedStages && i !== stage;
              const onClick = clickable ? { onClick: () => setCurrentPage(page) } : {};
              return (
                <div key={i} className={`flex-auto w-24 box-border relative inline-block
                ${i > completedStages ? 'bg-neutral-300' : 'bg-red'}
                 ${i === 0
                  ? styles['first-arrow']
                  : i === states.length - 1
                    ? styles['last-arrow']
                    : styles['middle-arrow']
                }`}>
                  <button
                    {...onClick}
                    className={`absolute top-[4px] bottom-[4px] left-[4px] right-[4px]
                    ${i === stage ? 'bg-red text-white' :
                      i <= completedStages ? 'bg-white text-red' :
                          'bg-neutral-300 text-white'
                      } 
                        text-[0.5rem] sm:text-xs lg:text-base ${i === 0
                        ? styles['inner-first-arrow']
                        : i === states.length - 1
                          ? styles['inner-last-arrow']
                          : styles['inner-middle-arrow']
                      } flex items-center justify-center`}
                    disabled={!clickable}
                  >
                    {state}
                  </button>
                </div>
              );
            })
            }
          </nav>
          : null}
      </header>

      {next && (
        <div className="w-screen h-screen fixed flex justify-end items-end pointer-events-none z-50">
          <button
            onClick={() => setCurrentPage(next)}
            disabled={nextButtonDisabled}
            // make cursor change to x when disabled

            className={`flex items-center justify-center text-[0.7rem] sm:text-base lg:text-xl text-white bg-yellow rounded-xl flex-1 h-10 md:h-12 lg:h-16 max-w-[12rem] min-w-[4rem] m-20 pointer-events-auto ${nextButtonDisabled ? 'opacity-40 cursor-not-allowed' : ''
              }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
