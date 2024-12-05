import { Resend } from 'resend';

export const handler = async (req: Request) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Method Not Allowed' 
    }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    // Parse request body
    const { email, otp } = await req.json();

    // Initialize Resend with API key
    const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'TrueVote <noreply@truevote.com>',
      to: [email],
      subject: 'Your TrueVote OTP',
      html: `<p>Your OTP is: ${otp}</p>`
    });

    if (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: error 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Success response
    return new Response(JSON.stringify({ 
      success: true, 
      data 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

// Handle OPTIONS requests for CORS
export const OPTIONS = () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};
