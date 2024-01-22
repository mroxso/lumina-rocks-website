import { useRef } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";
import NoteCard from './NoteCard';

const GlobalFeed: React.FC = () => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { events } = useNostrEvents({
    filter: {
      // since: dateToUnix(now.current), // all new events from now
      since: 0,
      limit: 10,
      kinds: [1],
    },
  });

  return (
    <>
    <h2>Global Feed</h2>
      {events.map((event) => (
        // <p key={event.id}>{event.pubkey} posted: {event.content}</p>
        <NoteCard key={event.id} pubkey={event.pubkey} text={event.content} eventId={event.id}/>
      ))}
    </>
  );
}

export default GlobalFeed;