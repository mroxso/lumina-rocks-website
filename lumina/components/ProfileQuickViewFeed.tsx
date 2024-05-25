import { useRef, useState } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";
import { Skeleton } from "@/components/ui/skeleton";
import QuickViewNoteCard from "./QuickViewNoteCard";

interface ProfileQuickViewFeedProps {
  pubkey: string;
}

const ProfileQuickViewFeed: React.FC<ProfileQuickViewFeedProps> = ({ pubkey }) => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const [limit, setLimit] = useState(20);

  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      limit: limit,
      kinds: [1],
    },
  });

  let filteredEvents = events.filter((event) => event.content.match(/https?:\/\/.*\.(?:png|jpg|gif|mp4|webm|mov)/g)?.[0]);
  // filter out all replies (tag[0] == e)
  filteredEvents = filteredEvents.filter((event) => !event.tags.some((tag) => { return tag[0] == 'e' }));

  const loadMore = () => {
    setLimit(limit => limit + 20);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {filteredEvents.length === 0 ? (
          <>
            <div>
              <Skeleton className="h-[125px] rounded-xl" />
              <div className="space-y-2 py-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            <div>
              <Skeleton className="h-[125px] rounded-xl" />
              <div className="space-y-2 py-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            <div>
              <Skeleton className="h-[125px] rounded-xl" />
              <div className="space-y-2 py-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </>
        ) : (filteredEvents.map((event) => (
          <QuickViewNoteCard key={event.id} pubkey={event.pubkey} text={event.content} event={event} tags={event.tags} eventId={event.id} linkToNote={true} />
        )))}
        <button onClick={loadMore}>Load More</button>
      </div>
    </>
  );
}

export default ProfileQuickViewFeed;