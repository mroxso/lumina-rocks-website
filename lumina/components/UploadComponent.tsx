import { useNostr } from 'nostr-react';
import { finalizeEvent, NostrEvent } from 'nostr-tools';
import React, { FormEvent } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'

const UploadComponent: React.FC = () => {

    const { publish } = useNostr();
    const { createHash } = require('crypto');
    const loginType = typeof window !== 'undefined' ? window.localStorage.getItem('loginType') : null;
  
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const desc = formData.get('description') as string;
      const file = formData.get('file') as File;
      let finalNoteContent = desc;
      let finalFileUrl = null;
      console.log('File:', file);
  
      if (file.size > 0) {
        const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
          });
        };
  
        try {
          const arrayBuffer = await readFileAsArrayBuffer(file);
          const hashBuffer = createHash('sha256').update(Buffer.from(arrayBuffer)).digest();
          const sha256 = hashBuffer.toString('hex');
  
          const unixNow = () => Math.floor(Date.now() / 1000);
          const newExpirationValue = () => (unixNow() + 60 * 5).toString();
  
          const pubkey = window.localStorage.getItem('pubkey');
          const createdAt = Math.floor(Date.now() / 1000);
  
          let authEvent = {
            kind: 24242,
            content: desc,
            created_at: createdAt,
            tags: [
              ['t', 'upload'],
              ['x', sha256],
              ['expiration', newExpirationValue()],
            ],
          };
  
          console.log(authEvent);
  
          let authEventSigned = {};
          if (loginType === 'extension') {
            authEventSigned = await window.nostr.signEvent(authEvent);
          } else if (loginType === 'amber') {
            // TODO: Sign event with amber
            alert('Signing with Amber is not implemented yet, sorry!');
          } else if (loginType === 'raw_nsec') {
            if (typeof window !== 'undefined') {
              let nsecStr = null;
              nsecStr = window.localStorage.getItem('nsec');
              if (nsecStr != null) {
                authEventSigned = finalizeEvent(authEvent, hexToBytes(nsecStr));
              }
            }
          }
          console.log(authEventSigned);
  
          await fetch('https://media.lumina.rocks/upload', {
            method: 'PUT',
            body: file,
            headers: { authorization: 'Nostr ' + btoa(JSON.stringify(authEventSigned)) },
          }).then(async (res) => {
            if (res.ok) {
              let responseText = await res.text();
              let responseJson = JSON.parse(responseText);
  
              finalFileUrl = responseJson.url;
  
              // let event = {
              //   kind: 1,
              //   content: responseJson.url + ' ' + desc,
              //   created_at: createdAt,
              //   tags: [],
              // };
  
              // let signedEvent: NostrEvent | null = null;
  
              // if (loginType === 'extension') {
              //   signedEvent = await window.nostr.signEvent(event);
              // } else if (loginType === 'amber') {
              //   // TODO: Sign event with amber
              //   alert('Signing with Amber is not implemented yet, sorry!');
              // } else if (loginType === 'raw_nsec') {
              //   if (typeof window !== 'undefined') {
              //     let nsecStr = null;
              //     nsecStr = window.localStorage.getItem('nsec');
              //     if (nsecStr != null) {
              //       signedEvent = finalizeEvent(event, hexToBytes(nsecStr));
              //     }
              //   }
              // }
              // if (signedEvent) {
              //   console.log("final Event: ")
              //   console.log(signedEvent)
              //   publish(signedEvent);
              // }
            } else {
              alert(await res.text());
            }
          });
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
  
      if (finalFileUrl) {
        finalNoteContent = finalFileUrl + ' ' + desc;
      }
  
      const createdAt = Math.floor(Date.now() / 1000);
  
      let noteEvent = {
        kind: 1,
        content: finalNoteContent,
        created_at: createdAt,
        tags: [],
      };
  
      let signedEvent: NostrEvent | null = null;
  
      if (loginType === 'extension') {
        signedEvent = await window.nostr.signEvent(noteEvent);
      } else if (loginType === 'amber') {
        // TODO: Sign event with amber
        alert('Signing with Amber is not implemented yet, sorry!');
      } else if (loginType === 'raw_nsec') {
        if (typeof window !== 'undefined') {
          let nsecStr = null;
          nsecStr = window.localStorage.getItem('nsec');
          if (nsecStr != null) {
            signedEvent = finalizeEvent(noteEvent, hexToBytes(nsecStr));
          }
        }
      }
      if (signedEvent) {
        console.log("final Event: ")
        console.log(signedEvent)
        publish(signedEvent);
      }
    }
  
    return (
        <>
            <div>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <Textarea name="description" rows={6} placeholder="Your description" id="description" className="w-full"></Textarea>
                    <input name="file" id="fie" type="file" accept="image/*" className="w-full" />
                    <Button type="submit" className="w-full button">Upload</Button>
                </form>
            </div>
        </>
    );
}

export default UploadComponent;