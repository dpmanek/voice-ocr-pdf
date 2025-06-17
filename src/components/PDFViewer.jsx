import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl }) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1.0);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const goToPrevPage = () => {
		setPageNumber((prev) => Math.max(prev - 1, 1));
	};

	const goToNextPage = () => {
		setPageNumber((prev) => Math.min(prev + 1, numPages));
	};

	const zoomIn = () => {
		setScale((prev) => Math.min(prev + 0.2, 3.0));
	};

	const zoomOut = () => {
		setScale((prev) => Math.max(prev - 0.2, 0.5));
	};

	// For demo purposes, we'll show a placeholder since we don't have an actual PDF
	if (!pdfUrl) {
		return (
			<div className="pdf-viewer">
				<div className="pdf-controls">
					<div className="pdf-nav">
						<button className="pdf-button">
							<ChevronLeft size={16} />
							Previous
						</button>
						<span className="pdf-info">Page 1 of 1</span>
						<button className="pdf-button">
							Next
							<ChevronRight size={16} />
						</button>
					</div>
					<div className="pdf-zoom">
						<button className="pdf-button">
							<ZoomOut size={16} />
							Zoom Out
						</button>
						<span className="pdf-info">100%</span>
						<button className="pdf-button">
							<ZoomIn size={16} />
							Zoom In
						</button>
					</div>
				</div>
				<div className="pdf-content">
					<div className="pdf-placeholder">
						<div className="pdf-placeholder-box">
							<div className="pdf-icon">📄</div>
							<p className="pdf-placeholder-title">PDF Document Preview</p>
							<p className="pdf-placeholder-subtitle">
								Original document would be displayed here
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="pdf-viewer">
			<div className="pdf-controls">
				<div className="pdf-nav">
					<button
						onClick={goToPrevPage}
						disabled={pageNumber <= 1}
						className="pdf-button"
					>
						<ChevronLeft size={16} />
						Previous
					</button>
					<span className="pdf-info">
						Page {pageNumber} of {numPages}
					</span>
					<button
						onClick={goToNextPage}
						disabled={pageNumber >= numPages}
						className="pdf-button"
					>
						Next
						<ChevronRight size={16} />
					</button>
				</div>

				<div className="pdf-zoom">
					<button onClick={zoomOut} className="pdf-button">
						<ZoomOut size={16} />
						Zoom Out
					</button>
					<span className="pdf-info">{Math.round(scale * 100)}%</span>
					<button onClick={zoomIn} className="pdf-button">
						<ZoomIn size={16} />
						Zoom In
					</button>
				</div>
			</div>

			<div className="pdf-content">
				<Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
					<Page pageNumber={pageNumber} scale={scale} />
				</Document>
			</div>
		</div>
	);
};

export default PDFViewer;
