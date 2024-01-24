import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNostrEvents, useProfile } from "nostr-react";

interface ProfileNoteCardProps {
  pubkey: string;
  text: string;
  event: any;
  tags: string[][];
}

const ProfileNoteCard: React.FC<ProfileNoteCardProps> = ({ pubkey, text, event, tags }) => {
  const { events } = useNostrEvents({
    filter: {
      // since: dateToUnix(now.current), // all new events from now
      // since: 0,
      // limit: 100,
      '#e': [event.id],
      kinds: [7],
    },
  });

  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub;
  // const imageSrc = text.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0];
  const imageSrc = text.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0].split(' ');
  const textWithoutImage = text.replace(/https?:\/\/.*\.(?:png|jpg|gif)/g, '');
  // const textWithoutImage = text.replace(/https?:\/\/.*\.(?:png|jpg|gif)(\?.*)?/g, '');
  const createdAt = new Date(event.created_at * 1000);

  return (
    <Card style={{ margin: '1rem' }}>
      <Card.Body>
        <Card.Text>
        {
            /* {text} */
            // imageSrc ? <img src={imageSrc[0]} style={{ maxWidth: '100%' }} /> : text
            imageSrc ? imageSrc.map((src, index) => <img key={index} src={src} style={{ maxWidth: '100%' }} />) : ""
          }
          {textWithoutImage}
          <hr />
          <Button variant="secondary">{events.length} Reactions</Button>
        </Card.Text>
        <Card.Footer>
          <small className="text-muted">{createdAt.toLocaleString()}</small><br />
          <small className="text-muted">ID: {event.id}</small><br />
          <small className="text-muted">Pubkey: {pubkey}</small><br />
          {/* <small className="text-muted">Tags: {tags.map((tag, index) => <span key={index}>{tag[0]} - {tag[1]}</span>)}</small> */}
          {tags.map((tag, index) => <p key={index}><span>{tag[0]} - {tag[1]}</span></p>)}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default ProfileNoteCard;