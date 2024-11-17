'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import 'gridstack/dist/gridstack.min.css';
import type { GridStack } from 'gridstack';

type GridStackContextType = {
  grid: GridStack | null; // No official GridStack type, so we use `any`
  addItem?: (options: Record<string, any>) => void; // A method to add new items to the grid dynamically
};

const GridStackContext = createContext<GridStackContextType | undefined>(undefined);

export const useGridStack = () => {
  const context = useContext(GridStackContext);
  if (!context) {
    throw new Error('useGridStack must be used within a GridStackProvider');
  }
  return context;
};

export const GridStackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grid, setGrid] = useState<GridStack | null>(null); // GridStack instance
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: GridStack | null = null; // Use `any` for the GridStack instance

    const initializeGrid = async () => {
      // Dynamically import the GridStack library and assign it to `window.GridStack`
      const GridStackModule = await import('gridstack/dist/gridstack-all.js');
      window.GridStack = GridStackModule.default || (GridStackModule as unknown as GridStack);

      if (gridRef.current && window.GridStack) {
        instance = window.GridStack.init({}, gridRef.current); // Initialize GridStack
        setGrid(instance);
      }
    };

    initializeGrid();

    return () => {
      if (instance) {
        instance.destroy(false); // Cleanup the GridStack instance
        setGrid(null);
      }
    };
  }, []);

  const addItem = (options: Record<string, any>) => {
    if (grid) {
      const el = document.createElement('div');
      el.className = 'grid-stack-item';
      for (const key of Object.keys(options)) {
        el.setAttribute(`data-gs-${key}`, options[key]);
      }

      const content = document.createElement('div');
      content.className = 'grid-stack-item-content';
      content.style.border = '1px solid black';
      content.style.padding = '10px';
      content.textContent = options.content || 'New Item';

      el.appendChild(content);
      grid.el.appendChild(el);
      grid.makeWidget(el); // Add the new widget to the grid
    }
  };

  return (
    <GridStackContext.Provider value={{ grid, addItem }}>
      <div className='grid-stack' ref={gridRef}>
        {children}
      </div>
    </GridStackContext.Provider>
  );
};
