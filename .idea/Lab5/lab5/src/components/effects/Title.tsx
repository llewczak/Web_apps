import { useState, useEffect } from 'react'

export const Title = () => {
    const [title, setTitle] = useState('lab5');

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
      <form>
          <label>Podaj tytul <input type={'text'} onChange={(e) => setTitle(e.target.value)}/></label>
      </form>
    );
}