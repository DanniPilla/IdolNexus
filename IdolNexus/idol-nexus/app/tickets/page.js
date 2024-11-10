"use client";
import { useState } from "react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      eventName: "Jpop Idol Fest",
      date: "2024-12-05",
      location: "Tokyo Dome, Tokyo",
      description: "A festival celebrating Jpop idols with live performances.",
    },
    {
      id: 2,
      eventName: "Summer Music Wave",
      date: "2024-08-20",
      location: "Yoyogi Park, Tokyo",
      description: "Outdoor music event with top idols from around Japan.",
    },
  ]);

  const addTicket = () => {
    const newTicket = {
      id: tickets.length + 1,
      eventName: "New Event",
      date: "2024-09-15",
      location: "Shibuya, Tokyo",
      description: "Exciting Jpop idol event.",
    };
    setTickets([...tickets, newTicket]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <button
        onClick={addTicket}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Ticket (for testing)
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{ticket.eventName}</h2>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span> {ticket.date}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Location:</span> {ticket.location}
            </p>
            <p className="text-gray-600 mt-2">{ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
