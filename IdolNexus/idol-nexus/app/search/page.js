"use client";

import { useState, useEffect } from "react";

export default function SearchPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    location: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = filters.date ? event.date === filters.date : true;
    const matchesCategory = filters.category
      ? event.category === filters.category
      : true;
    const matchesLocation = filters.location
      ? event.location === filters.location
      : true;

    return matchesSearch && matchesDate && matchesCategory && matchesLocation;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Events</h1>

      <input
        type="text"
        placeholder="Search by event name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Category: {event.category}</p>
            <p>Location: {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
