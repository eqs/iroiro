'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';

import ColorPicker from '@/components/ColorPicker';

export default function Home() {
  const [color, setColor] = useState<Color>();

  const onColorChange = (c: string) => {
    console.log(c);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ColorPicker onChange={onColorChange} />
      <Button>Click me</Button>
    </main>
  )
}
