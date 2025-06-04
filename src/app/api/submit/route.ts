import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

interface FormData {
    name: string;
    role: string;
    phone: string;
    district: string;
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as FormData;

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(
            process.env.GOOGLE_SHEET_ID!,
            serviceAccountAuth
        );

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        const row = {
            Name: body.name,
            Role: body.role,
            Phone: body.phone,
            District: body.district,
            Timestamp: new Date().toISOString(),
        };

        await sheet.addRow(row);

        return NextResponse.json({ message: 'Success' });
    } catch (error: unknown) {
        console.error('Detailed error:', error);

        const message =
            error instanceof Error
                ? error.message
                : typeof error === 'string'
                ? error
                : 'Internal Server Error';

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
