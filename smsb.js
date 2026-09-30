// api/smsb.js — Serverless API handler for Number Info
// Deploy on Vercel: file becomes /api/smsb

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const { key, num, debug } = req.query;

    // Missing key
    if (!key) {
        return res.status(400).json({
            error: 'Missing API key',
            usage: '?key=YOUR_KEY&num=9876543210',
            BUY_API: '@Vectraen',
            SUPPORT: '@Vectraen'
        });
    }

    // ---- NOTE ----
    // In serverless (GitHub/Vercel), we cannot read the browser localStorage where
    // the admin panel stores keys. So this endpoint validates using a simple
    // built-in key list OR uses an external KV store (Vercel KV / Upstash).
    //
    // For DEMO purpose, we accept any key that starts with "demo_" or matches
    // a pre-set DEMO_KEY. Replace this block with your real DB check.

    const DEMO_KEYS = [
        'demo_key_123',
        // add more fixed keys here
    ];

    const isValidDemo = DEMO_KEYS.includes(key) || key.startsWith('demo_');

    if (!isValidDemo) {
        return res.status(401).json({
            error: 'Invalid API key',
            BUY_API: '@Vectraen',
            SUPPORT: '@Vectraen'
        });
    }

    // Missing number
    if (!num) {
        return res.status(400).json({
            error: 'Missing num parameter',
            usage: '?key=YOUR_KEY&num=9876543210',
            BUY_API: '@Vectraen',
            SUPPORT: '@Vectraen'
        });
    }

    const phone = String(num).replace(/[^0-9]/g, '');
    if (phone.length !== 10) {
        return res.status(400).json({
            error: 'Invalid phone number! Need 10 digits.',
            BUY_API: '@Vectraen',
            SUPPORT: '@Vectraen'
        });
    }

    // Debug mode
    if (debug === '1') {
        return res.status(200).json({
            debug: {
                key_received: key,
                num_received: num,
                phone_clean: phone,
                timestamp: new Date().toISOString()
            },
            BUY_API: '@Vectraen',
            SUPPORT: '@Vectraen'
        });
    }

    // ---- DUMMY DATA (replace with real API call if needed) ----
    // If you have an external number-info API, call it here using fetch().
    // Example:
    //   const r = await fetch(`https://anishexploits.com/api/number.php?exploits=${phone}`);
    //   const result = await r.json();

    const result = {
        number: phone,
        name: 'Demo User',
        operator: 'Airtel',
        circle: 'Delhi NCR',
        country: 'India',
        status: 'active',
        address: '123 Demo Street, New Delhi',
        email: 'demo@example.com',
        alt_phone: '9876543211',
        fetched_at: new Date().toISOString()
    };

    return res.status(200).json({
        username: key,
        type: 'number',
        data: result,
        BUY_API: '@Vectraen',
        SUPPORT: '@Vectraen'
    });
}
