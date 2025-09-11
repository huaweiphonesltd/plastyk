// Main TypeScript entry point for Plastyk website

interface EventData {
        date: string;
        title: string;
        genre: string;
        time: string;
}

class PlastykApp {
        private events: EventData[] = [
                {
                        date: "FRI 15",
                        title: "Plastyk Night",
                        genre: "Electronic • House • Techno",
                        time: "10PM - 4AM"
                },
                {
                        date: "SAT 23",
                        title: "Special Guest",
                        genre: "Deep House • Progressive",
                        time: "9PM - 5AM"
                }
        ];

        constructor() {
                this.init();
        }

        private init(): void {
                this.setupSmoothScrolling();
                this.setupNavigation();
                this.setupEventCards();
                this.setupAnimations();
        }

        private setupSmoothScrolling(): void {
                const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

                navLinks.forEach(link => {
                        link.addEventListener('click', (e) => {
                                e.preventDefault();
                                const targetId = link.getAttribute('href')?.substring(1);
                                const targetElement = document.getElementById(targetId || '');

                                if (targetElement) {
                                        const header = document.querySelector('header');
                                        const headerHeight = header?.clientHeight || 0;
                                        // Add extra padding to ensure content isn't hidden behind header
                                        const targetPosition = targetElement.offsetTop - headerHeight - 20;

                                        window.scrollTo({
                                                top: targetPosition,
                                                behavior: 'smooth'
                                        });
                                }
                        });
                });
        }

        private setupNavigation(): void {
                const header = document.querySelector('header') as HTMLElement;

                window.addEventListener('scroll', () => {
                        if (window.scrollY > 100) {
                                header.style.background = 'rgba(0, 0, 0, 0.95)';
                        } else {
                                header.style.background = 'rgba(0, 0, 0, 0.9)';
                        }
                });
        }

        private setupEventCards(): void {
                const eventCards = document.querySelectorAll('.event-card');

                eventCards.forEach((card, index) => {
                        // Add staggered animation delay
                        (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;

                        // Add click handler for future event details
                        card.addEventListener('click', () => {
                                this.showEventDetails(this.events[index]);
                        });
                });
        }

        private showEventDetails(event: EventData): void {
                // Simple alert for now - can be enhanced with a modal
                alert(`Event: ${event.title}\nDate: ${event.date}\nGenre: ${event.genre}\nTime: ${event.time}`);
        }

        private setupAnimations(): void {
                // Intersection Observer for scroll animations
                const observerOptions = {
                        threshold: 0.1,
                        rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                        entry.target.classList.add('animate-in');
                                }
                        });
                }, observerOptions);

                // Observe elements for animation
                const animateElements = document.querySelectorAll('.event-card, .about-content, .contact-info');
                animateElements.forEach(el => observer.observe(el));
        }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
        new PlastykApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  .event-card,
  .about-content,
  .contact-info {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
