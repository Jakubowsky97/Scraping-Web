"use client";
import { useEffect, useState } from "react";
import {
  useLazyGetAllScrapsQuery,
  useLazyGetScrapByTitleQuery,
  useRemoveScrapByTitleMutation,
} from "../scrapsApi";
import { ScrapCard } from "./ScrapCard";

export const ScrapSelect = () => {
  const [title, setTitle] = useState("");
  const [removeScrapByTitle] = useRemoveScrapByTitleMutation();
  const [triggerScrap, { data: scraps, isLoading }] = useLazyGetAllScrapsQuery();
  const [triggerByTitle, { data: scrapByTitle, isLoading: isLoadingTitle }] = useLazyGetScrapByTitleQuery();

  const [allScraps, setAllScraps] = useState([]);

  const handleGetAll = async () => {
    const result = await triggerScrap();

    if (result?.data) {
      setAllScraps(result.data.data);
    }
  };

  const handleSearchByTitle = async (title) => {
    const result = await triggerByTitle(title);  // Użyj triggera z tytulem
    console.log("result", result);
    if (result?.data) {
      setAllScraps([result.data]);  // Jeśli jest wynik, ustaw scrap w stanie
    }
  };

  const handleDelete = async (scrapTitle) => {
    try {
      const result = await removeScrapByTitle(scrapTitle);  // Przekaż tylko tytuł
      if (result?.data) {
        setAllScraps((prevScraps) => prevScraps.filter((scrap) => scrap.title !== scrapTitle));  // Filtruj usunięte wiadomości
      }
    } catch (error) {
      console.error("Błąd przy usuwaniu:", error);
    }
  };

  if (isLoading || isLoadingTitle) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Lista wiadomości</h2>
      <div className="flex flex-col gap-2">
        <h3>Wybierz formę pobierania wiadomości</h3>
        <div className="flex gap-2">
          <button
            className="bg-blue-400 p-2 rounded hover:bg-blue-500 text-white"
            onClick={handleGetAll}
          >
            Pokaż wszystkie
          </button>
          <form
            className="flex gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const inputValue = e.target.elements[0].value;
              if (inputValue) {
                setTitle(inputValue);
                await handleSearchByTitle(inputValue);  // Poczekaj na wynik przed resetowaniem
                e.target.reset();
              }
            }}
          >
            <input
              type="text"
              placeholder="Wyszukaj po tytule"
              className="border border-gray-300 p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Szukaj
            </button>
          </form>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Wybierz wiadomość, aby zobaczyć szczegóły
      </p>
      <div className="flex flex-col gap-4">
        {allScraps?.length ? (
          allScraps.map((scrap) => (
            <ScrapCard
              key={scrap.id}
              scrap={scrap}
              onDelete={() => handleDelete(scrap.title)}
            />
          ))
        ) : (
          <p>Brak wiadomości</p>
        )}
      </div>
    </div>
  );
};
