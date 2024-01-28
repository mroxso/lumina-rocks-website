import { useRef } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";
import { Skeleton } from "@/components/ui/skeleton";
import QuickViewNoteCard from "./QuickViewNoteCard";

interface ProfileQuickViewFeedProps {
  pubkey: string;
}

const ProfileQuickViewFeed: React.FC<ProfileQuickViewFeedProps> = ({ pubkey }) => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { events } = useNostrEvents({
    filter: {
      // since: dateToUnix(now.current), // all new events from now
      authors: [pubkey],
      // since: 0,
      // limit: 10,
      kinds: [1],
    },
  });

  let filteredEvents = events.filter((event) => event.content.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0]);
  // filter out all replies (tag[0] == e)
  filteredEvents = filteredEvents.filter((event) => !event.tags.some((tag) => { return tag[0] == 'e' }));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col space-y-3" style={{ flex: '1 0 33.33%' }}>
            <Skeleton className="h-[125px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (filteredEvents.map((event) => (
          <div key={event.id} className="py-6" style={{ flex: '1 0 33.33%' }}>
            <QuickViewNoteCard key={event.id} pubkey={event.pubkey} text={event.content} event={event} tags={event.tags} eventId={event.id} />
          </div>
        )))}
      </div>
    </>
  );
}

export default ProfileQuickViewFeed;