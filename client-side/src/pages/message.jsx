import { useEffect, useRef } from 'react';
import { Sorry } from './inDevelopment.jsx';

export const Message = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('Message');
                  setColor[0].style.color = "blue";
                  effectRan.current = true;
            }
      });

      return (
            <Sorry />
      );
}