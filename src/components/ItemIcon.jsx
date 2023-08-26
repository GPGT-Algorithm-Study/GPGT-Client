import React from 'react';
import {
  AiOutlineWarning,
  AiTwotoneSound,
  AiOutlineFileText,
} from 'react-icons/ai';
import { BsSnow } from 'react-icons/bs';

function ItemIcon({ itemId, size, color }) {
  if (itemId == 1) {
    return <AiOutlineFileText size={size} color={color} />;
  }
  if (itemId == 2) {
    return <AiOutlineWarning size={size} color={color} />;
  }
  if (itemId == 3) {
    return <BsSnow size={size} color={color} />;
  }
  if (itemId == 4) {
    return <AiTwotoneSound size={size} color={color} />;
  }
  return <div />;
}

export default ItemIcon;
