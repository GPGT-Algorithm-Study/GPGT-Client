import React from 'react';

function ItemIcon({ itemId }) {
  if (itemId == 1) {
    return '📝';
  }
  if (itemId == 2) {
    return '⛔️';
  }
  if (itemId == 3) {
    return '❄️';
  }
  if (itemId == 4) {
    return '📣';
  }
  return <div />;
}

export default ItemIcon;
