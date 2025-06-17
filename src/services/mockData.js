// Mock OCR data
export const mockOcrData = {
	policy_number: 'PRPNA2003881',
	insured_name: 'John B. Sanfilippo & Son, Inc.',
	'Policy From': '04/01/2020',
	'Policy To': '04/01/2021',
	insurance_limit: 'USD10,000,000',
	insured_address_street: '1703 N. Randall Road',
	insured_address_city: 'Elgin',
	insured_address_state: 'Illinois',
	insured_address_postal_code: '60123',
	insured_address_country: 'USA',
	premium: 'USD1,665,000 (100%) annual',
	insurance_Company_Name: 'AAA Insurance',
	insurance_Company_Address: '12343, Downing St., Atlanta, GA',
	Agent_Name: '',
	Agent_Phone: '',
	Agent_Address: '',
};

// Mock database data (slightly different for comparison)
export const mockDbData = {
	policy_number: 'PRPNA2003881',
	insured_name: 'John B. Sanfilippo & Son, Inc.',
	'Policy From': '04/01/2020',
	'Policy To': '04/01/2021',
	insurance_limit: 'USD10,000,000',
	insured_address_street: '1703 N. Randall Road',
	insured_address_city: 'Elgin',
	insured_address_state: 'Illinois',
	insured_address_postal_code: '60123',
	insured_address_country: 'USA',
	premium: 'USD1,665,000 (100%) annual',
	insurance_Company_Name: 'ERIE INSURANCE COMPANY', // Different from OCR
	insurance_Company_Address: 'ERIESUREER HOME POLICY', // Different from OCR
	Agent_Name: '4495 OLD WILLIAM PENN HWY, MURRYSVILLE PA 15668-1923', // Different from OCR
	Agent_Phone: '',
	Agent_Address: '',
};

// Mock API functions
export const fetchOcrData = async () => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockOcrData;
};

export const fetchDbData = async () => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockDbData;
};

// Helper function to compare data and determine field status
export const compareFields = (ocrValue, dbValue) => {
	if (!ocrValue && !dbValue) return 'empty';
	if (!ocrValue || !dbValue) return 'partial';
	return ocrValue.trim().toLowerCase() === dbValue.trim().toLowerCase()
		? 'match'
		: 'mismatch';
};
