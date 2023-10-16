'use client'

import React, { useState } from 'react';

export type ColorPickerProps = {
  onChange?: (color: string) => any
};

export default function ColorPicker(props: ColorPickerProps): React.VFC {
  const { onChange } = props;
  const [color, setColor] = useState<string>("#000000");

  return (
    <div
      className="w-8 h-8 rounded-full border border-gray-400"
      style={{ background: color }}
    >
      <input
        type="color"
        value={color}
        onChange={(e: any) => {
          setColor(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className="w-full h-full opacity-0"
        />
    </div>
  );
}
