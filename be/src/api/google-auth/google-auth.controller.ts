import { Controller, Get, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Response } from 'express';

/**
 * @deprecated Service Account authentication is now used instead of OAuth2.
 * This controller is kept for reference but is no longer needed for production.
 * Remove this module if you don't need OAuth2 flow for other purposes.
 */
@Controller('google-auth')
export class GoogleAuthController {
  private oauth2Client;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');

    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    );
  }

  /**
   * @deprecated No longer needed with Service Account authentication.
   * This endpoint would redirect to Google OAuth consent screen.
   */
  @Get('authorize')
  authorize(@Res() res: Response) {
    const scopes = [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ];

    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });

    res.redirect(authUrl);
  }

  /**
   * @deprecated No longer needed with Service Account authentication.
   * This endpoint was the OAuth2 callback for exchanging auth code for tokens.
   */
  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    try {
      if (!code) {
        return res.status(400).send('Authorization code not provided');
      }

      const { tokens } = await this.oauth2Client.getToken(code);

      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Google OAuth Success</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #4CAF50;
            }
            pre {
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 4px;
              overflow-x: auto;
            }
            .token {
              word-break: break-all;
              color: #2196F3;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffc107;
              padding: 10px;
              border-radius: 4px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✓ Authorization Successful!</h1>
            <p>Copy the refresh token below and add it to your <code>.env</code> file:</p>

            <h3>Refresh Token:</h3>
            <pre><code class="token">${tokens.refresh_token || 'No refresh token received - you may need to revoke access and try again'}</code></pre>

            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ol>
                <li>Copy the refresh token above</li>
                <li>Add it to your <code>.env</code> file as: <code>GOOGLE_REFRESH_TOKEN="your_token_here"</code></li>
                <li>Restart your application</li>
                <li>Keep this token secure and never commit it to version control</li>
              </ol>
            </div>

            ${
              tokens.access_token
                ? `
              <h3>Access Token (temporary):</h3>
              <pre><code class="token">${tokens.access_token}</code></pre>
            `
                : ''
            }

            <h3>All Tokens:</h3>
            <pre><code>${JSON.stringify(tokens, null, 2)}</code></pre>
          </div>
        </body>
        </html>
      `);
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>OAuth Error</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
            }
            .error {
              background-color: #f8d7da;
              border: 1px solid #f5c6cb;
              padding: 20px;
              border-radius: 4px;
            }
            pre {
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 4px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <div class="error">
            <h1>❌ Authorization Failed</h1>
            <p>Error exchanging authorization code for tokens:</p>
            <pre>${error.message}</pre>
          </div>
        </body>
        </html>
      `);
    }
  }
}
