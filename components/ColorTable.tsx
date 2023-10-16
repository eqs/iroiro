import React, { useState, useEffect } from 'react';
import { Button, PressEvent, Snippet } from '@nextui-org/react';
import ColorPicker from '@/components/ColorPicker';

export default function ColorTable() {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    setColors(["#000000"]);
  }, []);

  const onAddButtonPressed = (e: PressEvent) => {
    let newColors = [...colors];
    newColors.push("#000000");
    setColors(newColors);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mb-8">
        {colors.map((_: string, k: number) => {
          const onColorChange = (c: string) => {
            let newColors = [...colors];
            newColors[k] = c;
            setColors(newColors);
            console.log(newColors);
          };

          return (
            <div key={k} className="flex flex-row gap-4 items-center p-4">
              <ColorPicker
                onChange={onColorChange}
                />
              <Snippet
                className=""
                variant="bordered" hideSymbol="true"
              >
                {colors[k]}
              </Snippet>
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
