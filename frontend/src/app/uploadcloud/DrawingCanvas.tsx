"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import {
	ImageIcon,
	RotateCcw,
	FlipHorizontal,
	Save,
	Expand,
	Download,
	Undo2,
	Redo2,
	Pencil,
	Image as ImageIcon2
} from "lucide-react"


export default function DrawingCanvas({ imageUrl }: { imageUrl: string }) {
	const [answer, setAnswer] = useState('')
	const baseCanvasRef = useRef<HTMLCanvasElement>(null)
	const drawCanvasRef = useRef<HTMLCanvasElement>(null)
	const [isDrawing, setIsDrawing] = useState(false)
	const [color, setColor] = useState('#FF0000')
	const [history, setHistory] = useState<ImageData[]>([])
	const [redoHistory, setRedoHistory] = useState<ImageData[]>([])
	const [drawCtx, setDrawCtx] = useState<CanvasRenderingContext2D | null>(null)
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

	useEffect(() => {
		const baseCanvas = baseCanvasRef.current
		const drawCanvas = drawCanvasRef.current
		if (!baseCanvas || !drawCanvas) return

		const baseCtx = baseCanvas.getContext('2d')
		const drawingCtx = drawCanvas.getContext('2d')
		if (!baseCtx || !drawingCtx) return

		setDrawCtx(drawingCtx)
		drawingCtx.lineCap = 'round'
		drawingCtx.lineWidth = 3

		// Load and set up image
		const img = new Image()
		img.src = imageUrl
		img.onload = () => {
			// Set both canvases to image dimensions
			const width = img.width
			const height = img.height
			setCanvasSize({ width, height })

			baseCanvas.width = width
			baseCanvas.height = height
			drawCanvas.width = width
			drawCanvas.height = height

			// Draw image on base canvas
			baseCtx.drawImage(img, 0, 0)

			// Initialize drawing history with blank state
			const blankState = drawingCtx.getImageData(0, 0, width, height)
			setHistory([blankState])
		}
	}, [imageUrl])

	const saveState = () => {
		if (!drawCanvasRef.current || !drawCtx) return
		const currentState = drawCtx.getImageData(0, 0, canvasSize.width, canvasSize.height)
		setHistory(prev => [...prev, currentState])
		setRedoHistory([])
	}

	const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!drawCtx || !drawCanvasRef.current) return

		const rect = drawCanvasRef.current.getBoundingClientRect()
		const scaleX = canvasSize.width / rect.width
		const scaleY = canvasSize.height / rect.height

		drawCtx.beginPath()
		drawCtx.strokeStyle = color
		drawCtx.moveTo(
			(e.clientX - rect.left) * scaleX,
			(e.clientY - rect.top) * scaleY
		)
		setIsDrawing(true)
	}

	const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing || !drawCtx || !drawCanvasRef.current) return

		const rect = drawCanvasRef.current.getBoundingClientRect()
		const scaleX = canvasSize.width / rect.width
		const scaleY = canvasSize.height / rect.height

		drawCtx.lineTo(
			(e.clientX - rect.left) * scaleX,
			(e.clientY - rect.top) * scaleY
		)
		drawCtx.stroke()
	}

	const stopDrawing = () => {
		if (isDrawing) {
			setIsDrawing(false)
			saveState()
		}
	}

	const undo = () => {
		if (history.length <= 1 || !drawCtx) return

		const currentState = history[history.length - 1]
		const previousState = history[history.length - 2]

		setRedoHistory(prev => [...prev, currentState])
		setHistory(prev => prev.slice(0, -1))

		drawCtx.putImageData(previousState, 0, 0)
	}

	const redo = () => {
		if (redoHistory.length === 0 || !drawCtx) return

		const nextState = redoHistory[redoHistory.length - 1]
		setRedoHistory(prev => prev.slice(0, -1))
		setHistory(prev => [...prev, nextState])

		drawCtx.putImageData(nextState, 0, 0)
	}

	const saveDrawingOnly = () => {
		if (!drawCanvasRef.current) return
		const link = document.createElement('a')
		link.download = 'drawing-layer.png'
		link.href = drawCanvasRef.current.toDataURL()
		link.click()
	}

	const handleSaveCloud = async () => {
		try {
			console.log('handleSaveCloud')
			if (!drawCanvasRef.current) return;
			console.log('drawCanvasRef.current', drawCanvasRef.current)
			const drawingDataUrl = drawCanvasRef.current.toDataURL();
			const cloudData = {
				image: imageUrl,     
				filter: drawingDataUrl,  
				answer: answer,
			};

			
			const response = await fetch('http://localhost:3000/api/clouds', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(cloudData)
			});

			if (!response.ok) throw new Error('Failed to save cloud');

			const savedCloud = await response.json();
			// Gestion du succès (redirection, notification, etc.)

		} catch (error) {
			// Gestion de l'erreur
		}
	};

	const saveCombined = () => {
		const tempCanvas = document.createElement('canvas')
		tempCanvas.width = canvasSize.width
		tempCanvas.height = canvasSize.height
		const tempCtx = tempCanvas.getContext('2d')

		if (!tempCtx || !baseCanvasRef.current || !drawCanvasRef.current) return

		tempCtx.drawImage(baseCanvasRef.current, 0, 0)
		tempCtx.drawImage(drawCanvasRef.current, 0, 0)

		const link = document.createElement('a')
		link.download = 'combined-image.png'
		link.href = tempCanvas.toDataURL()
		link.click()
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-2 justify-center mb-4">
				<Button
					variant={color === '#FF0000' ? 'default' : 'outline'}
					onClick={() => setColor('#FF0000')}
					className="w-8 h-8 p-0 bg-red-500 hover:bg-red-600"
				/>
				<Button
					variant={color === '#00FF00' ? 'default' : 'outline'}
					onClick={() => setColor('#00FF00')}
					className="w-8 h-8 p-0 bg-green-500 hover:bg-green-600"
				/>
				<Button
					variant={color === '#0000FF' ? 'default' : 'outline'}
					onClick={() => setColor('#0000FF')}
					className="w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600"
				/>
				<Button
					onClick={undo}
					variant="outline"
					className="gap-2"
					disabled={history.length <= 1}
				>
					<Undo2 className="w-4 h-4" />
				</Button>
				<Button
					onClick={redo}
					variant="outline"
					className="gap-2"
					disabled={redoHistory.length === 0}
				>
					<Redo2 className="w-4 h-4" />
				</Button>
				<Button
					disabled={history.length <= 1 || !answer}
					onClick={handleSaveCloud} className="gap-2">
					<Pencil className="w-4 h-4" />
					Envoyer mon nuage !
				</Button>
				<Button onClick={saveCombined} className="gap-2">
					<ImageIcon2 className="w-4 h-4" />
					Save Combined
				</Button>
			</div>
			<div className="relative">
				<canvas
					ref={baseCanvasRef}
					className="absolute top-0 left-0 border rounded-lg w-full"
				/>
				<canvas
					ref={drawCanvasRef}
					onMouseDown={startDrawing}
					onMouseMove={draw}
					onMouseUp={stopDrawing}
					onMouseLeave={stopDrawing}
					className="relative border rounded-lg w-full cursor-crosshair"
					style={{ touchAction: 'none' }}
				/>
				<Input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
			</div>
		</div>
	)
}