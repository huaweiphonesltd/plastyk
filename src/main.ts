// Main TypeScript entry point for Plastyk website

export type EventListing = {
  upcoming: Event[];
  past: Event[];
};

interface Event {
  date: string;
  venue: string;
  lineup?: string[];
  tba: boolean;
}

class PlastykApp {
  constructor() {}

  events: EventListing = {
    upcoming: [],
    past: [],
  };

  async fetchEvents() {
    try {
      const response = await fetch("/assets/events.json");
      this.events = await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    const upcomingEventsContainer = document.getElementById("upcoming-events-container");
    if (!upcomingEventsContainer) {
      console.error("Events container not found!");
      return;
    }

    upcomingEventsContainer.innerHTML = "";

    this.events.upcoming.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    this.events.upcoming.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.className = "event-item";

      const dateElement = document.createElement("h4");
      dateElement.className = "event-date";
      dateElement.textContent = event.date;

      const venueElement = document.createElement("p");
      venueElement.className = "event-venue";
      venueElement.style.textAlign = "center";
      venueElement.textContent = `${event.venue}`;

      const lineupElement = document.createElement("p");
      lineupElement.className = "event-lineup";

      if (event.tba) {
        lineupElement.style.fontSize = "1.8rem";
        lineupElement.style.textAlign = "center";
        lineupElement.textContent = "TBA";
      } else if (event.lineup && event.lineup.length > 0) {
        lineupElement.style.whiteSpace = "pre-line";
        lineupElement.style.fontWeight = "bold";
        lineupElement.style.textAlign = "center";
        lineupElement.textContent = `${event.lineup.join("\n").toUpperCase()}`;
      }

      eventElement.appendChild(dateElement);
      eventElement.appendChild(venueElement);
      eventElement.appendChild(lineupElement);

      upcomingEventsContainer.appendChild(eventElement);
    });

    const pastEventsContainer = document.getElementById(
      "past-events-container"
    );
    if (!pastEventsContainer) {
      console.error("Past events container not found!");
      return;
    }
    pastEventsContainer.innerHTML = "";

    this.events.past.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.events.past.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.className = "event-item";

      const dateElement = document.createElement("h4");
      dateElement.className = "event-date";
      dateElement.textContent = event.date;

      const venueElement = document.createElement("p");
      venueElement.className = "event-venue";
      venueElement.style.textAlign = "center";
      venueElement.textContent = `${event.venue}`;

      const lineupElement = document.createElement("p");
      lineupElement.className = "event-lineup";

      if (event.tba) {
        lineupElement.style.fontSize = "1.8rem";
        lineupElement.style.textAlign = "center";
        lineupElement.textContent = "TBA";
      } else if (event.lineup && event.lineup.length > 0) {
        lineupElement.style.whiteSpace = "pre-line";
        lineupElement.style.fontWeight = "bold";
        lineupElement.style.textAlign = "center";
        lineupElement.textContent = `${event.lineup.join("\n").toUpperCase()}`;
      }

      eventElement.appendChild(dateElement);
      eventElement.appendChild(venueElement);
      eventElement.appendChild(lineupElement);

      pastEventsContainer.appendChild(eventElement);
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new PlastykApp();
  app.fetchEvents();
});
