"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import {
  Undo2,
  Redo2,
  Pencil,
  Save,
  XCircle,
  Eraser,
} from "lucide-react";

interface DrawingCanvasProps {
  imageUrl: string;
  onSave: (drawing: string, answer: string, size: { width: number, height: number }) => void;
  onCancel: () => void;
}

export default function DrawingCanvas({ imageUrl, onSave, onCancel }: DrawingCanvasProps) {
  const [answer, setAnswer] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoHistory, setRedoHistory] = useState<ImageData[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawCtx, setDrawCtx] = useState<CanvasRenderingContext2D | null>(null);

  const COLORS = [
	  { hex: '#000000', name: 'Black' },
    { hex: '#FF0000', name: 'Red' },
    { hex: '#00FF00', name: 'Green' },
    { hex: '#0000FF', name: 'Blue' },
    { hex: '#FFFF00', name: 'Yellow' },
  ];

  // Canvas setup effect with resize handler
  useEffect(() => {
    const setupCanvas = () => {
      const baseCanvas = baseCanvasRef.current;
      const drawCanvas = drawCanvasRef.current;
      const container = containerRef.current;
      if (!baseCanvas || !drawCanvas || !container) return;

      const baseCtx = baseCanvas.getContext('2d');
      const drawingCtx = drawCanvas.getContext('2d');
      if (!baseCtx || !drawingCtx) return;

      setDrawCtx(drawingCtx);
      drawingCtx.lineCap = 'round';
      drawingCtx.lineWidth = lineWidth;

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        // Calculate container width
        const containerWidth = container.offsetWidth;
        
        // Calculate scale to fit image within container width
        const scale = containerWidth / img.width;
        
        // Set canvas dimensions based on scale
        const width = img.width * scale;
        const height = img.height * scale;

        setCanvasSize({ width, height });
        baseCanvas.width = width;
        baseCanvas.height = height;
        drawCanvas.width = width;
        drawCanvas.height = height;

        // Draw background image
        baseCtx.drawImage(img, 0, 0, width, height);
        const blankState = drawingCtx.getImageData(0, 0, width, height);
        setHistory([blankState]);
      };
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [imageUrl]);

  useEffect(() => {
    if (drawCtx) {
      drawCtx.lineWidth = lineWidth;
      drawCtx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
    }
  }, [lineWidth, isEraser]);

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, isStarting = false) => {
    if ((!isStarting && !isDrawing) || !drawCtx || !drawCanvasRef.current) return;
    
    e.preventDefault();
    const canvas = drawCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const pos = getEventPosition(e, rect);
    
    if (isStarting) {
      drawCtx.beginPath();
      drawCtx.strokeStyle = isEraser ? '#000000' : color;
      drawCtx.moveTo(pos.x, pos.y);
      setIsDrawing(true);
    } else {
      drawCtx.lineTo(pos.x, pos.y);
      drawCtx.stroke();
    }
  };

  const getEventPosition = (e: React.MouseEvent | React.TouchEvent, rect: DOMRect) => {
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleStopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (!drawCanvasRef.current || !drawCtx) return;
    const currentState = drawCtx.getImageData(0, 0, canvasSize.width, canvasSize.height);
    setHistory(prev => [...prev, currentState]);
    setRedoHistory([]);
  };

  const handleUndo = () => {
    if (history.length <= 1 || !drawCtx) return;
    const prevState = history[history.length - 2];
    setRedoHistory(prev => [...prev, history[history.length - 1]]);
    setHistory(prev => prev.slice(0, -1));
    drawCtx.putImageData(prevState, 0, 0);
  };

  const handleRedo = () => {
    if (redoHistory.length === 0 || !drawCtx) return;
    const nextState = redoHistory[redoHistory.length - 1];
    setRedoHistory(prev => prev.slice(0, -1));
    setHistory(prev => [...prev, nextState]);
    drawCtx.putImageData(nextState, 0, 0);
  };

  const handleSave = () => {
    if (!drawCanvasRef.current) return;
    const drawingDataUrl = drawCanvasRef.current.toDataURL();
    onSave(drawingDataUrl, answer, { width: canvasSize.width, height: canvasSize.height });

  };

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm">
      <CardContent className="p-2 sm:p-4">
        <div className="space-y-4">
          {/* Drawing Tools */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <div className="flex gap-1">
              {COLORS.map((c) => (
                <Button
                  key={c.hex}
                  variant={color === c.hex && !isEraser ? 'default' : 'outline'}
                  onClick={() => {
                    setColor(c.hex);
                    setIsEraser(false);
                  }}
                  className="w-8 h-8 p-0 rounded-full"
                  style={{ 
                    backgroundColor: c.hex,
                    border: color === c.hex && !isEraser ? '2px solid black' : '1px solid #e2e8f0'
                  }}
                  title={c.name}
                />
              ))}
            </div>
            
            <div className="flex gap-1">
              <Button
                variant={isEraser ? 'default' : 'outline'}
                onClick={() => setIsEraser(!isEraser)}
                className="h-8 px-2 sm:px-3"
                title="Eraser"
              >
                <Eraser className="w-4 h-4" />
              </Button>
              
              <select
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="h-8 px-2 border rounded-md"
                title="Brush Size"
              >
                <option value="1">Thin</option>
                <option value="3">Medium</option>
                <option value="5">Thick</option>
              </select>
            </div>

            <div className="flex gap-1">
              <Button
                onClick={handleUndo}
                variant="outline"
                disabled={history.length <= 1}
                className="h-8 px-2 sm:px-3"
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleRedo}
                variant="outline"
                disabled={redoHistory.length === 0}
                className="h-8 px-2 sm:px-3"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Canvas Container */}
          <div ref={containerRef} className="relative">
            <canvas
              ref={baseCanvasRef}
              className="absolute top-0 left-0 w-full"
            />
            <canvas
              ref={drawCanvasRef}
              onMouseDown={(e) => handleDraw(e, true)}
              onMouseMove={handleDraw}
              onMouseUp={handleStopDrawing}
              onMouseLeave={handleStopDrawing}
              onTouchStart={(e) => handleDraw(e, true)}
              onTouchMove={handleDraw}
              onTouchEnd={handleStopDrawing}
              className="relative w-full cursor-crosshair"
              style={{
                touchAction: 'none',
                height: `${canvasSize.height}px`
              }}
            />
          </div>

          {/* Answer and Actions */}
          <div className="space-y-2">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!answer}
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}