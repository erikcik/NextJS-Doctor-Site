import React, { useCallback, useEffect, useRef } from 'react';

interface ResizeHandleProps {
  onResize: (width: number, height: number) => void;
  currentWidth: number;
  currentHeight: number;
  aspectRatio: number;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  onResize,
  currentWidth,
  currentHeight,
  aspectRatio,
}) => {
  const isResizing = useRef(false);
  const startSize = useRef({ width: currentWidth, height: currentHeight });
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = {
      width: typeof currentWidth === 'number' ? currentWidth : 200,
      height: typeof currentHeight === 'number' ? currentHeight : 200,
    };

    // Add event listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [currentWidth, currentHeight]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;

    e.preventDefault();
    e.stopPropagation();

    const deltaX = e.clientX - startPos.current.x;
    const newWidth = Math.max(100, startSize.current.width + deltaX);
    const newHeight = Math.round(newWidth / aspectRatio);

    onResize(newWidth, newHeight);
  }, [aspectRatio, onResize]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  return (
    <>
      {/* SE corner */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: 'translate(50%, 50%)' }}
        onMouseDown={handleMouseDown}
      />
      {/* SW corner */}
      <div
        className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500 rounded-full cursor-sw-resize opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: 'translate(-50%, 50%)' }}
        onMouseDown={handleMouseDown}
      />
      {/* NE corner */}
      <div
        className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-ne-resize opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: 'translate(50%, -50%)' }}
        onMouseDown={handleMouseDown}
      />
      {/* NW corner */}
      <div
        className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full cursor-nw-resize opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: 'translate(-50%, -50%)' }}
        onMouseDown={handleMouseDown}
      />
    </>
  );
}; 