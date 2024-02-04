import { useRef } from "react";
import { useNostrEvents, dateToUnix } from "nostr-react";
import NoteCard from './NoteCard';

interface NotePageComponentProps {
  id: string;
}

const NotePageComponent: React.FC<NotePageComponentProps> =  ({ id }) => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { events } = useNostrEvents({
    filter: {
      // since: dateToUnix(now.current), // all new events from now
      // since: 0,
      ids: [id],
      limit: 1,
      kinds: [1],
    },
  });

  return (
    <>
      {events.map((event) => (
        // <p key={event.id}>{event.pubkey} posted: {event.content}</p>
        <div key={event.id} className="py-6">
          <NoteCard key={event.id} pubkey={event.pubkey} text={event.content} eventId={event.id} tags={event.tags} event={event} showViewNoteCardButton={false} />
        </div>
      ))}
    </>
  );
}

export default NotePageComponent;