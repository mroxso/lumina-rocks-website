import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useProfile } from "nostr-react";

interface ProfileNoteCardProps {
  pubkey: string;
  text: string;
}

const ProfileNoteCard: React.FC<ProfileNoteCardProps> = ({ pubkey, text }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub;

  return (
    <Card style={{ margin: '1rem' }}>
      <Card.Body>
        <Card.Text>
          {text}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default ProfileNoteCard;