import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

interface FormData {
    name: string;
    role: string;
    phone: string;
    district: string;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // Only allow this website

export async function POST(request: Request) {
    const origin = request.headers.get('origin');

    if (origin !== ALLOWED_ORIGIN) {
        return new NextResponse('Forbidden: Invalid origin', {
            status: 403,
            headers: {
                'Access-Control-Allow-Origin': 'null',
            },
        });
    }

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

        return new NextResponse(JSON.stringify({ message: 'Success' }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            },
        });
    } catch (error: unknown) {
        console.error('Detailed error:', error);
        const message =
            error instanceof Error
                ? error.message
                : typeof error === 'string'
                ? error
                : 'Internal Server Error';

        return new NextResponse(JSON.stringify({ error: message }), {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            },
        });
    }
}
