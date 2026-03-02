import { FC } from 'react';
import { Bell } from 'lucide-react';
import { WelcomeCard, AnnouncementCard } from '../components';

// Static announcements data (can be fetched from API in the future)
const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Welcome to the 12GA Dealer Portal',
    content: 'Your new hub for product information, technical specifications, and dealer support. Explore the Technical Sheets section to access detailed product information.',
    date: 'Today',
    isNew: true,
    type: 'info' as const,
  },
  {
    id: '2',
    title: 'New Product Line Coming Soon',
    content: 'Stay tuned for our upcoming release of premium truck accessories. More details will be announced shortly.',
    date: 'Jan 25, 2025',
    type: 'promo' as const,
  },
  {
    id: '3',
    title: 'System Update Completed',
    content: 'We have upgraded our portal with improved performance and new features. Thank you for your patience during the maintenance window.',
    date: 'Jan 20, 2025',
    type: 'update' as const,
  },
];

export const DashboardPage: FC = () => {
  return (
    <div className="py-4 space-y-8">
      {/* Welcome Section */}
      <WelcomeCard />

      {/* Announcements Section */}
      <section>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Announcements
            </h2>
            <p className="text-xs text-text-secondary">
              Latest news and updates from 12GA
            </p>
          </div>
        </div>

        {/* Announcements list */}
        <div className="space-y-3">
          {ANNOUNCEMENTS.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              content={announcement.content}
              date={announcement.date}
              isNew={announcement.isNew}
              type={announcement.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
