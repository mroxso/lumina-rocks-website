import { useRef } from "react";
import { useNostrEvents } from "nostr-react";
import { Skeleton } from "@/components/ui/skeleton";
import GalleryCard from "./GalleryCard";
import ProfileReelCard from "./ProfileReelCard";

interface ProfileReelsViewFeedProps {
  pubkey: string;
}

const ProfileReelsViewFeed: React.FC<ProfileReelsViewFeedProps> = ({ pubkey }) => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { isLoading, events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      limit: 100,
      kinds: [1063],
    },
  });

  console.log(events);

  // filter event (search for a "url" tag and then check with regex if this url is a picture url)
  let filteredEvents = events.filter((event) => event.tags.some((tag) => tag[0] === 'url' && tag[1].match(/https?:\/\/.*\.(?:png|jpg|gif|mp4|webm|mov|jpeg)/g)?.[0]));


  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {filteredEvents.length === 0 && isLoading ? (
          <>
            <div>
              <Skeleton className="h-[125px] rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-[125px] rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-[125px] rounded-xl" />
            </div>
          </>
        ) : (
          filteredEvents.map((event) => (
            <ProfileReelCard
              linkToNote={true}
              event={event}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ProfileReelsViewFeed;