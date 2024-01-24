import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useProfile } from "nostr-react";

interface ProfileInfoCardProps {
  pubkey: string;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ pubkey }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub;
  const description = userData?.about?.replace(/(?:\r\n|\r|\n)/g, '<br>');
  return (
    <>
      <h2>{title}</h2>
      <Card style={{ margin: '1rem' }}>
        <Card.Body>
          {/* <Card.Title>{title}</Card.Title> */}
          <Card.Text dangerouslySetInnerHTML={{ __html: description || "" }}></Card.Text>
          {/* <Card.Text>
            {description}
          </Card.Text> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileInfoCard;