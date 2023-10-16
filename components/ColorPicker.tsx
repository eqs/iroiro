'use client'

import React from 'react';

export type ColorPickerProps = {
  color: string,
  onChange?: (color: string) => any;
};

export default function ColorPicker(props: ColorPickerProps): React.VFC {
  const { color, onChange } = props;

  return (
    <div
      className="w-8 h-8 rounded-full border border-gray-400"
      style={{ background: color }}
    >
      <input
        type="color"
        value={color}
        onChange={(e: any) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className="w-full h-full opacity-0"
        />
    </div>
  );
}
