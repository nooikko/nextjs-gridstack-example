import type { GridStack } from 'gridstack';

// Extend the global Window interface to include GridStack
declare global {
  interface Window {
    GridStack: typeof GridStack;
  }
}
