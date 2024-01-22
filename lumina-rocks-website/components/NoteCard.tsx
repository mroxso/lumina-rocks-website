import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useProfile } from "nostr-react";

interface NoteCardProps {
  pubkey: string;
  text: string;
  eventId: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ pubkey, text, eventId }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub;
  // const imageSrc = text.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0];
  const imageSrc = text.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0].split(' ');
  const textWithoutImage = text.replace(/https?:\/\/.*\.(?:png|jpg|gif)/g, '');

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
          <small className="text-muted">ID: {eventId}</small><br />
          <small className="text-muted">Pubkey: {pubkey}</small>
        </Card.Footer>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default NoteCard;