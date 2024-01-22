import { useRef } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";
import NoteCard from './NoteCard';
import ProfileNoteCard from "./ProfileNoteCard";

interface ProfileFeedProps {
  pubkey: string;
}

const ProfileFeed: React.FC<ProfileFeedProps> = ({ pubkey }) => {
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

  const filteredEvents = events.filter((event) => event.content.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0]);

  return (
    <>
    <h2>Profile Feed</h2>
      {filteredEvents.map((event) => (
        // <p key={event.id}>{event.pubkey} posted: {event.content}</p>
        <ProfileNoteCard key={event.id} pubkey={event.pubkey} text={event.content} />
      ))}
    </>
  );
}

export default ProfileFeed;