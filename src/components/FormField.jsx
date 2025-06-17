import { useState } from 'react';
import { Edit, Copy } from 'lucide-react';

const FormField = ({
	label,
	ocrValue,
	dbValue,
	status,
	onEdit,
	onCopy,
	isEditable = true,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(ocrValue || '');

	const getStatusColor = (status) => {
		switch (status) {
			case 'match':
				return 'bg-green-100 border-green-300';
			case 'mismatch':
				return 'bg-red-100 border-red-300';
			case 'partial':
				return 'bg-yellow-100 border-yellow-300';
			default:
				return 'bg-gray-100 border-gray-300';
		}
	};

	const getDbStatusColor = (status) => {
		switch (status) {
			case 'match':
				return 'bg-green-200 text-green-800';
			case 'mismatch':
				return 'bg-red-200 text-red-800';
			default:
				return 'bg-gray-200 text-gray-800';
		}
	};

	const handleSave = () => {
		onEdit && onEdit(editValue);
		setIsEditing(false);
	};

	const handleCopy = () => {
		if (dbValue) {
			setEditValue(dbValue);
			onEdit && onEdit(dbValue);
			onCopy && onCopy(dbValue);
		}
	};

	return (
		<div className="form-field">
			<label className="field-label">{label}</label>

			<div className="field-row">
				{/* OCR Data Field */}
				<div className="field-container">
					{isEditing ? (
						<div className="edit-container">
							<input
								type="text"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								className="edit-input"
								onKeyPress={(e) => e.key === 'Enter' && handleSave()}
							/>
							<button onClick={handleSave} className="save-button">
								Save
							</button>
						</div>
					) : (
						<div className={`field-input ${status}`}>
							{ocrValue || ''}
							{isEditable && (
								<button
									onClick={() => setIsEditing(true)}
									className="action-button"
								>
									<Edit size={16} />
								</button>
							)}
						</div>
					)}
				</div>

				{/* Database Comparison Field */}
				<div className="field-container">
					<div className={`field-comparison ${status}`}>
						{dbValue || ''}
						{dbValue && (
							<button onClick={handleCopy} className="action-button">
								<Copy size={16} />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormField;
