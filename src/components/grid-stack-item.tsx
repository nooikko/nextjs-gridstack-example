import type React from 'react';

type GridStackItemProps = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  content: React.ReactNode;
};

export const GridStackItem: React.FC<GridStackItemProps> = ({ width, height, x, y, content }) => {
  return (
    <div className='grid-stack-item' data-gs-width={width} data-gs-height={height} data-gs-x={x} data-gs-y={y}>
      <div className='grid-stack-item-content' style={{ border: '1px solid black', padding: '10px' }}>
        {content}
      </div>
    </div>
  );
};
