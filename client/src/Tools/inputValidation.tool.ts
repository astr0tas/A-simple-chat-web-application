import React from 'react';

export function reportInputValidation(elem: React.RefObject<HTMLInputElement>, message: string): void
{
      if (elem.current)
      {
            elem.current.setCustomValidity(message);
            elem.current.reportValidity();
      }
}

export function clearCustomValidity(elem: React.RefObject<HTMLInputElement>): void
{
      if (elem.current)
      {
            elem.current.setCustomValidity('');
      }
}