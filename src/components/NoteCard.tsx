import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useProfile } from "nostr-react";

interface NoteCardProps {
  pubkey: string;
  text: string;
  eventId: string;
  tags: string[][];
  event: any;
}

const NoteCard: React.FC<NoteCardProps> = ({ pubkey, text, eventId, tags, event }) => {
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
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {
            /* {text} */
            // imageSrc ? <img src={imageSrc[0]} style={{ maxWidth: '100%' }} /> : text
            imageSrc ? imageSrc.map((src, index) => <img key={index} src={src} style={{ maxWidth: '100%' }} />) : ""
          }
          {textWithoutImage}
        </Card.Text>
        <Card.Footer>
          <small className="text-muted">{createdAt.toLocaleString()}</small><br />
          <small className="text-muted">ID: {eventId}</small><br />
          <small className="text-muted">Pubkey: {pubkey}</small><br />
          {/* <small className="text-muted">Tags: {tags.map((tag, index) => <span key={index}>{tag[0]} - {tag[1]}</span>)}</small> */}
          {tags.map((tag, index) => <p key={index}><span>{tag[0]} - {tag[1]}</span></p>)}
        </Card.Footer>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default NoteCard;