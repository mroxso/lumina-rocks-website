import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react';

export function Search() {
  const [inputValue, setInputValue] = useState('');

  const calculateAndRedirect = () => {
    if (inputValue.startsWith('npub')) {
      window.location.href = `/profile/${inputValue}`;
    } else if (inputValue.startsWith('#')) {
      window.location.href = `/tag/${inputValue.replaceAll('#', '')}`;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      calculateAndRedirect();
    }
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input 
        type="text" 
        placeholder="npub or #tag" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" onClick={calculateAndRedirect}>Search</Button>
    </div>
  )
}