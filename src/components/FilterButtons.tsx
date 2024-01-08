'use client';

interface FilterButtons {
  filters: Set<string>;
  setFilters: Function;
  items: Array<string>;
  setCompletedStages: Function;
}

export default function FilterButtons({
  filters,
  setFilters,
  items,
  setCompletedStages,
}: FilterButtons) {
  // note: need to create a new set to trigger rerender for any changes
  const handleClick = (name: string) => {
    // if "any" is selected, deselect everything else
    if (name === 'Any') {
      setFilters(new Set([name]));
      return;
    }

    // already selected, deselect
    if (filters.has(name)) {
      const updatedButtons = new Set(filters);
      updatedButtons.delete(name);
      // if everything is unselected, select any
      if (updatedButtons.size === 0 && items.includes('Any')) {
        setFilters(new Set(['Any']));
      }
      // otherwise just unselect
      else {
        setFilters(updatedButtons);
      }
    }
    // not selected, select
    else {
      const updatedButtons = new Set(filters);
      updatedButtons.add(name);
      updatedButtons.delete('Any');
      setFilters(updatedButtons);
    }
    setCompletedStages(1);
  };

  return (
    <>
      {/* Capacity*/}
      {items.map(
        (item, i) =>
          item !== '' && (
            <button
              key={i}
              onClick={() => handleClick(item)}
              className={`${
                filters.has(item)
                  ? 'text-white bg-red'
                  : 'text-red outline outline-3'
              }  rounded-md px-4 py-2 m-2`}
            >
              <span>{item}</span>
            </button>
          )
      )}
    </>
  );
}
