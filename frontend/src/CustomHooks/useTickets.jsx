import { useState, useMemo } from "react";

function useTickets(ticketsData, filter, searchField, searchQuery) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const filteredTickets = useMemo(() => {
    return ticketsData.filter((ticket) => {
      if (filter !== "ALL" && ticket.stato !== filter) return false;
      if (searchQuery) {
        const value = ticket[searchField]?.toString().toLowerCase() ?? "";
        return value.startsWith(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [ticketsData, filter, searchField, searchQuery]);

  const sortedTickets = useMemo(() => {
    if (sortConfig.key) {
      return [...filteredTickets].sort((a, b) => {
        let [aValue, bValue] = [a[sortConfig.key], b[sortConfig.key]];
        aValue = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
        bValue = typeof bValue === "string" ? bValue.toLowerCase() : bValue;
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredTickets;
  }, [filteredTickets, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  return { sortedTickets, requestSort, sortConfig };
}

export default useTickets;
