import { useState, useEffect } from 'react';
import FormField from './components/FormField';
import PDFViewer from './components/PDFViewer';
import { fetchOcrData, fetchDbData, compareFields } from './services/mockData';

function App() {
	const [activeTab, setActiveTab] = useState('OCR Document Data');
	const [ocrData, setOcrData] = useState({});
	const [dbData, setDbData] = useState({});
	const [loading, setLoading] = useState(true);

	const tabs = [
		'OCR Document Data',
		'Loan Match',
		'Collateral Match',
		'RNR Processing',
		'SOR Data',
		'Notes',
	];

	// Field mappings with display labels
	const fieldMappings = [
		{ key: 'policy_number', label: 'Policy Number' },
		{ key: 'insured_name', label: 'Insured Name' },
		{ key: 'Policy From', label: 'Policy Period From' },
		{ key: 'Policy To', label: 'Policy Period To' },
		{ key: 'insurance_limit', label: 'Insurance Limit' },
		{ key: 'insured_address_street', label: 'Insured Address Street' },
		{ key: 'insured_address_city', label: 'Insured Address City' },
		{ key: 'insured_address_state', label: 'Insured Address State' },
		{
			key: 'insured_address_postal_code',
			label: 'Insured Address Postal Code',
		},
		{ key: 'insured_address_country', label: 'Insured Address Country' },
		{ key: 'premium', label: 'Premium' },
		{ key: 'insurance_Company_Name', label: 'Insurance Company Name' },
		{ key: 'insurance_Company_Address', label: 'Insurance Company Address' },
		{ key: 'Agent_Name', label: 'Agent Name' },
		{ key: 'Agent_Phone', label: 'Agent Phone' },
		{ key: 'Agent_Address', label: 'Agent Address' },
	];

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				const [ocrResult, dbResult] = await Promise.all([
					fetchOcrData(),
					fetchDbData(),
				]);
				setOcrData(ocrResult);
				setDbData(dbResult);
			} catch (error) {
				console.error('Error loading data:', error);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	const handleFieldEdit = (fieldKey, newValue) => {
		setOcrData((prev) => ({
			...prev,
			[fieldKey]: newValue,
		}));
	};

	const handleFieldCopy = (fieldKey, value) => {
		console.log(`Copied ${fieldKey}: ${value}`);
		// You could add a toast notification here
	};

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-content">
					<div className="spinner"></div>
					<p className="loading-text">Loading document data...</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			{/* Header */}
			<header className="header">
				<div className="header-left">
					<button className="header-button">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button className="header-button">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
					<div className="header-nav">
						<select className="header-select">
							<option>Master Data ▼</option>
						</select>
						<select className="header-select">
							<option>Exception ▼</option>
						</select>
						<select className="header-select">
							<option>Match All ▼</option>
						</select>
					</div>
				</div>
				<div>
					<h1 className="header-title">Continuation Notice - Comparison</h1>
				</div>
				<div className="header-right">
					<button className="header-button">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<button className="header-button">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
					<button className="header-button">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</button>
					<button className="header-button">
						<svg
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
							/>
						</svg>
					</button>
				</div>
			</header>

			{/* Tab Navigation */}
			<div className="tab-nav">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`tab-button ${activeTab === tab ? 'active' : ''}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Main Content */}
			<div className="main-container">
				{/* Left Panel - Form Fields */}
				<div className="left-panel">
					<div className="user-badge">Ryan A. Sikora</div>

					{activeTab === 'OCR Document Data' && (
						<div>
							{fieldMappings.map(({ key, label }) => {
								const ocrValue = ocrData[key] || '';
								const dbValue = dbData[key] || '';
								const status = compareFields(ocrValue, dbValue);

								return (
									<FormField
										key={key}
										label={label}
										ocrValue={ocrValue}
										dbValue={dbValue}
										status={status}
										onEdit={(newValue) => handleFieldEdit(key, newValue)}
										onCopy={(value) => handleFieldCopy(key, value)}
									/>
								);
							})}
						</div>
					)}

					{activeTab !== 'OCR Document Data' && (
						<div className="empty-state">
							<p>Content for {activeTab} tab</p>
							<p className="subtitle">
								This section would contain specific data for the selected tab.
							</p>
						</div>
					)}
				</div>

				{/* Right Panel - PDF Viewer */}
				<div className="right-panel">
					<PDFViewer pdfUrl={null} />
				</div>
			</div>
		</div>
	);
}

export default App;
