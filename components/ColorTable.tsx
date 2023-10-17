"use client"

import React, { useState, useEffect } from 'react';
import { getCookie, setCookie, hasCookie } from 'cookies-next';
import {
  Button, PressEvent, Snippet,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@nextui-org/react';
import ColorPicker from '@/components/ColorPicker';

function toIntTuple(color: string) {
  const cs = parseInt('0x' + color.substr(1, 6), 16);
  const r = (0xFF0000 & cs) >> 16;
  const g = (0x00FF00 & cs) >> 8;
  const b = 0x0000FF & cs;
  return `(${r}, ${g}, ${b})`;
}

function toFloatTuple(color: string) {
  const cs = parseInt('0x' + color.substr(1, 6), 16);
  const r = ((0xFF0000 & cs) >> 16) / 255.0;
  const g = ((0x00FF00 & cs) >> 8) / 255.0;
  const b = (0x0000FF & cs) / 255.0;
  return `(${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)})`;
}

const COLOR_CONVS = {
  "code": (c: string) => c,
  "u8": toIntTuple,
  "f32": toFloatTuple,
};

type ColorConversionSelectDropdownProps = {
  onAction: (key: string) => void
};

function ColorConversionSelectDropdown(props: ColorConversionSelectDropdown) {
  const { onAction } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={onAction}
      >
        <DropdownItem key="code">Color Code</DropdownItem>
        <DropdownItem key="u8">(u8, u8, u8)</DropdownItem>
        <DropdownItem key="f32">(f32, f32, f32)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default function ColorTable() {
  const [colors, setColors] = useState<string[]>([]);
  const [convKey, setConvKey] = useState<string>("code");

  useEffect(() => {
    if (hasCookie("cls")) {
      const cls = getCookie("cls");
      setColors(cls ? cls.split(",") : []);
    } else {
      setColors([]);
    }
  }, []);

  const onAddButtonPressed = (e: PressEvent) => {
    let newColors = [...colors];
    newColors.push('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6));
    setColors(newColors);
    setCookie('cls', newColors.toString());
  };

  const onSelectConversion = (key: string) => {
    setConvKey(key);
  };

  return (
    <div className="flex flex-col items-center">
      <ColorConversionSelectDropdown onAction={onSelectConversion} />
      <div className="flex flex-col mb-8">
        {colors.map((color: string, k: number) => {
          const onColorChange = (c: string) => {
            let newColors = [...colors];
            newColors[k] = c;
            setColors(newColors);
            setCookie('cls', newColors.toString());
          };
          const onDeletePressed = (e: PressEvent) => {
            let newColors = [...colors];
            newColors = newColors.filter((_, i) => k != i);
            setColors(newColors);
            setCookie('cls', newColors.toString());
          };

          return (
            <div key={k} className="flex flex-row gap-4 items-center p-4">
              <ColorPicker
                color={color}
                onChange={onColorChange}
                />
              <Snippet
                className="w-64"
                variant="bordered" hideSymbol="true"
              >
                {COLOR_CONVS[convKey](colors[k])}
              </Snippet>
              <Button onPress={onDeletePressed}>Delete</Button>
            </div>
          );
        })}
      </div>
      <Button
        color="primary"
        onPress={onAddButtonPressed}
      >
        Add Row
      </Button>
    </div>
  );
}
