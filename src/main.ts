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

  headlines: string[] = [];
  currentHeadlineIndex: number = 0;
  headlineRotationInterval: ReturnType<typeof setInterval> | null = null;

  async fetchEvents() {
    try {
      const response = await fetch("./events.json");
      this.events = await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    const upcomingEventsContainer = document.getElementById(
      "upcoming-events-container"
    );
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

      const dateElement = document.createElement("p");
      dateElement.className = "event-date";
      dateElement.style.textAlign = "center";
      dateElement.textContent = `${event.date}`;

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

  async fetchHeadlines() {
    try {
      const response = await fetch("./headlines.json");
      this.headlines = await response.json();
    } catch (error) {
      console.error("Error fetching headlines:", error);
      return;
    }

    for (let i = this.headlines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.headlines[i], this.headlines[j]] = [
        this.headlines[j],
        this.headlines[i],
      ];
    }

    const headlinesContainer = document.getElementById("headlines-container");
    if (!headlinesContainer) {
      console.error("Headlines container not found!");
      return;
    }

    // Add the headlines-container class for styling
    headlinesContainer.className += " headlines-container";
    headlinesContainer.innerHTML = "";

    // Create headline elements
    this.headlines.forEach((headline, index) => {
      const headlineElement = document.createElement("p");
      headlineElement.className = index === 0 ? "headline active" : "headline";
      headlineElement.textContent = headline;

      // Set dynamic font size based on text length
      this.setDynamicFontSize(headlineElement, headline, 1.25);

      headlinesContainer.appendChild(headlineElement);
    });

    // Start the rotation
    this.startHeadlineRotation();
  }

  startHeadlineRotation() {
    // Clear any existing interval
    if (this.headlineRotationInterval) {
      clearInterval(this.headlineRotationInterval);
    }

    // Set up 15-second rotation
    this.headlineRotationInterval = setInterval(() => {
      this.rotateToNextHeadline();
    }, 15000);
  }

  rotateToNextHeadline() {
    const headlinesContainer = document.getElementById("headlines-container");
    if (!headlinesContainer || this.headlines.length === 0) return;

    const headlines =
      headlinesContainer.querySelectorAll<HTMLElement>(".headline");
    const currentHeadline = headlines[this.currentHeadlineIndex];

    // Calculate next index
    const nextIndex = (this.currentHeadlineIndex + 1) % this.headlines.length;
    const nextHeadline = headlines[nextIndex];

    // Animate current headline out to the left
    currentHeadline.classList.remove("active");
    currentHeadline.classList.add("exit-left");

    // Prepare next headline to enter from right
    nextHeadline.classList.remove("active", "exit-left");
    nextHeadline.classList.add("enter-right");

    // After a brief delay, animate next headline in
    setTimeout(() => {
      nextHeadline.classList.remove("enter-right");
      nextHeadline.classList.add("active");
    }, 100);

    // Clean up the previous headline classes after animation
    setTimeout(() => {
      currentHeadline.classList.remove("exit-left");
    }, 700);

    this.currentHeadlineIndex = nextIndex;
  }

  setDynamicFontSize(
    element: HTMLElement,
    text: string,
    multiplier: number = 1.0
  ) {
    const textLength = text.length;
    const numberOfWords = text
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const longestWord = text
      .split(/\s+/)
      .reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        ""
      );
    const averageWordLength = textLength / numberOfWords || 0;

    // Get container width for responsive considerations
    const containerWidth =
      element.offsetWidth || element.parentElement?.offsetWidth || 400;

    let baseFontSize: number;
    let lineHeight: number;

    // Primary logic based on word count with character length modifiers
    if (numberOfWords <= 1) {
      // Single word or very short text
      if (textLength <= 8) {
        baseFontSize = 5.0; // Very large for short single words
      } else if (textLength <= 15) {
        baseFontSize = 4.0; // Large for medium single words
      } else {
        baseFontSize = 3.0; // Smaller for long single words
      }
      lineHeight = 0.9;
    } else if (numberOfWords <= 3) {
      // Short headlines
      if (textLength <= 20) {
        baseFontSize = 4.0;
      } else if (textLength <= 35) {
        baseFontSize = 3.5;
      } else {
        baseFontSize = 3.0;
      }
      lineHeight = 1.0;
    } else if (numberOfWords <= 6) {
      // Medium headlines
      if (textLength <= 40) {
        baseFontSize = 3.0;
      } else if (textLength <= 60) {
        baseFontSize = 2.75;
      } else {
        baseFontSize = 2.5;
      }
      lineHeight = 1.1;
    } else if (numberOfWords <= 10) {
      // Longer headlines
      if (textLength <= 70) {
        baseFontSize = 2.5;
      } else if (textLength <= 100) {
        baseFontSize = 2.25;
      } else {
        baseFontSize = 2.0;
      }
      lineHeight = 1.1;
    } else {
      // Very long text
      if (textLength <= 120) {
        baseFontSize = 2.0;
      } else if (textLength <= 160) {
        baseFontSize = 1.75;
      } else {
        baseFontSize = 1.5;
      }
      lineHeight = 1.2;
    }

    // Adjust for unusually long words that might cause wrapping issues
    if (longestWord.length > 12) {
      baseFontSize = Math.max(baseFontSize * 0.9, 1.25);
    } else if (longestWord.length > 20) {
      baseFontSize = Math.max(baseFontSize * 0.8, 1.0);
    }

    // Adjust for very high average word length (technical/complex text)
    if (averageWordLength > 7) {
      baseFontSize = Math.max(baseFontSize * 0.95, 1.25);
    }

    // Responsive adjustments based on container width
    if (containerWidth < 300) {
      baseFontSize = Math.max(baseFontSize * 0.8, 1.0);
    } else if (containerWidth < 500) {
      baseFontSize = Math.max(baseFontSize * 0.9, 1.25);
    }

    // Apply the multiplier
    const fontSize = baseFontSize * multiplier;

    // Ensure minimum readable size and maximum reasonable size
    const finalFontSize = Math.max(2.0, Math.min(fontSize, 6.0));

    // Apply styles
    element.style.fontSize = `${finalFontSize}rem`;
    element.style.lineHeight = lineHeight.toString();

    // Optional: Add word-break for very long words
    if (longestWord.length > 15) {
      element.style.wordBreak = "break-word";
      element.style.hyphens = "auto";
    } else {
      element.style.wordBreak = "normal";
      element.style.hyphens = "none";
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new PlastykApp();
  app.fetchEvents();
  app.fetchHeadlines();
});
