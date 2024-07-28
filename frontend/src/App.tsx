import { useState, useEffect } from "react";
import Card from "./cardComp";
import Pagination from "./pagination";
import { searchRetreats, Retreat } from "./fetch";

// Utility function to debounce input changes
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function App() {
  const [data, setData] = useState<Retreat[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date_asc");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [durationFilter, setDurationFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(8);
  const [totalCount, setTotalCount] = useState<number>(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const handleFetchRetreats = async () => {
      try {
        const response = await searchRetreats(
          debouncedSearchTerm,
          sortBy,
          locationFilter,
          durationFilter === "All" ? "" : durationFilter,
          page,
          pageSize
        );
        setData(response.retreats);
        setTotalCount(response.total_count);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
        setTotalCount(0);
      }
    };

    handleFetchRetreats();
  }, [
    debouncedSearchTerm,
    sortBy,
    locationFilter,
    durationFilter,
    page,
    pageSize,
  ]);

  return (
    <div className="bg-gradient-to-r from-customGreen to-customPink h-auto pb-40">
      <div className="text-5xl font-bold text-white text-center m-auto pt-2">
        Wellness Retreats
      </div>
      <div>
        {/* Search Bar */}
        <div className="m-auto w-full text-center">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black text-2xl font-bold w-3/4 m-auto p-2 mt-8 rounded-full text-center"
          />
        </div>
      </div>
      {/* Sorting and Filtering */}
      <div className="m-auto w-full text-center flex justify-center">
        <div className="text-black md:text-2xl text-sm md:font-bold m-auto p-2 md:mt-8 mt-4 rounded-full flex flex-col md:flex-row justify-center gap-2">
          <div className="md:mr-2 md:p-2 text-white">Sort by date</div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-black md:text-2xl text-sm md:font-bold text-center m-auto p-2 rounded-full"
          >
            <option value="date_asc">Ascending</option>
            <option value="date_desc">Descending</option>
          </select>
        </div>
        <div className="text-black md:text-2xl text-sm md:font-bold m-auto p-2 md:mt-8 mt-4  rounded-full flex flex-col justify-center gap-2 md:flex-row ">
          <div className="md:mr-2 md:p-2 text-white">Filter by Location</div>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="text-black md:text-2xl text-sm md:font-bold text-center m-auto p-2 rounded-full"
          >
            <option value="">All</option>
            <option value="Goa">Goa</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <div className="text-black md:text-2xl text-sm md:font-bold m-auto p-2 md:mt-8 mt-4 rounded-full flex flex-col justify-center gap-2 md:flex-row ">
          <div className="md:mr-2 md:p-2 text-white">Filter by Duration</div>
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="text-black md:text-2xl text-sm md:font-bold text-center m-auto p-2 rounded-full"
          >
            <option value="All">All</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="4">4 Days</option>
            <option value="5">5 Days</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 m-2 md:pl-10">
          {data.map((item) => (
            <Card
              key={item.retreat_id}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
              duration={item.duration}
              date={item.date}
              location={item.location}
              retreat_id={item.retreat_id}
            />
          ))}
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        total={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
