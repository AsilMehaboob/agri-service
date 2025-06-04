import { GoogleSpreadsheet } from 'google-spreadsheet'; // Imports the GoogleSpreadsheet class to interact with Google Sheets
import { JWT } from 'google-auth-library'; // Imports JWT for service account authentication
import { NextResponse } from 'next/server'; // Imports Next.js response helper

interface FormData {
  name: string;      // User's name
  role: string;      // User's role
  phone: string;     // User's phone number
  district: string;  // User's district
}

// Handles POST requests to this API route
export async function POST(request: Request) {
  try {
    // Parses the incoming JSON request body as FormData
    const body = (await request.json()) as FormData;
    
    // Creates a JWT client for authenticating with Google APIs using service account credentials
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, // Service account email from environment variable
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Private key, replacing escaped newlines
      scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Scope for accessing Google Sheets
    });

    // Initializes the GoogleSpreadsheet instance with the sheet ID and authentication
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID!, // Sheet ID from environment variable
      serviceAccountAuth // Auth client
    );

    await doc.loadInfo(); // Loads spreadsheet metadata (e.g., sheet names)
    const sheet = doc.sheetsByIndex[0]; // Gets the first sheet in the spreadsheet

    // Prepares a new row object with form data and a timestamp
    const row = {
      Name: body.name,
      Role: body.role,
      Phone: body.phone,
      District: body.district,
      Timestamp: new Date().toISOString(), // Current time in ISO format
    };

    await sheet.addRow(row); // Adds the new row to the sheet

    // Returns a JSON response indicating success
    return NextResponse.json({ message: 'Success' });
  } catch (error: any) {
    // Logs detailed error information to the server console
    console.error('Detailed error:', error);

    // Returns a JSON error response with status 500
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}