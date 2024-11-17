'use client';

import type React from 'react';
import { GridStackProvider } from './grid-stack-context';
import { GridStackItem } from './grid-stack-item';

export const GridStackDemo: React.FC = () => {
  return (
    <GridStackProvider>
      <GridStackItem width={4} height={2} x={0} y={0} content='Item 1' />
      <GridStackItem width={4} height={2} x={4} y={0} content='Item 2' />
    </GridStackProvider>
  );
};
