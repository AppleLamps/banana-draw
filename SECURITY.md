# Security Policy

## Known Security Considerations

### API Key Exposure

**Current Status**: The Gemini API key is currently exposed in the client-side JavaScript bundle through Vite's environment variable injection.

**Risk Level**: High for production deployments

**Impact**: Anyone with access to the application can extract the API key from the bundled JavaScript and potentially abuse it, leading to:
- Unauthorized API usage
- Quota exhaustion
- Unexpected costs

### Recommended Mitigations

For production deployments, we strongly recommend implementing the following security measures:

#### 1. Backend Proxy (Recommended)

Create a backend API that:
- Stores the API key securely on the server
- Accepts image upload requests from the frontend
- Forwards requests to the Gemini API
- Returns results to the frontend

Example architecture:
```
Frontend → Your Backend API → Gemini API
```

#### 2. Rate Limiting

Implement rate limiting to prevent abuse:
- Per-IP rate limits
- Per-user rate limits (if authentication is implemented)
- Daily/hourly quota limits

#### 3. Authentication

Add user authentication to:
- Track usage per user
- Implement user-specific quotas
- Prevent anonymous abuse

#### 4. API Key Rotation

- Use separate API keys for development and production
- Rotate API keys regularly
- Monitor API usage for anomalies

#### 5. Environment-Specific Keys

- Never commit API keys to version control
- Use different keys for different environments
- Implement key management via secrets management tools (e.g., AWS Secrets Manager, HashiCorp Vault)

## File Upload Security

### Current Protections

- File type validation (PNG, JPEG, WEBP only)
- File size limit (10MB maximum)
- Client-side validation before API submission

### Additional Recommendations

For production:
- Implement server-side file validation
- Scan uploaded files for malware
- Use Content Security Policy (CSP) headers
- Implement CORS policies

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please:

1. **Do NOT** open a public issue
2. Email the maintainers directly (contact information in repository)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond within 48 hours and work with you to address the issue.

## Security Best Practices for Developers

When contributing to this project:

1. Never commit sensitive data (API keys, secrets, credentials)
2. Review `.gitignore` to ensure sensitive files are excluded
3. Use environment variables for all configuration
4. Keep dependencies up to date
5. Run security audits regularly (`npm audit`)
6. Follow the principle of least privilege
7. Validate and sanitize all user inputs

## Dependency Security

We use automated tools to monitor dependencies:

```bash
# Check for known vulnerabilities
npm audit

# Fix vulnerabilities automatically (when possible)
npm audit fix
```

Run these commands regularly and before deploying to production.

## Content Security Policy

For production deployments, implement a Content Security Policy:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdn.tailwindcss.com https://aistudiocdn.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src https://fonts.gstatic.com; 
               img-src 'self' data: https:; 
               connect-src 'self' https://generativelanguage.googleapis.com;">
```

## Updates and Patches

Security updates will be released as needed. To stay informed:

- Watch this repository for security advisories
- Keep your dependencies up to date
- Subscribe to security mailing lists for React, Vite, and other dependencies

## Compliance

This application processes user-uploaded images. Ensure compliance with:

- GDPR (if serving EU users)
- CCPA (if serving California users)
- Other relevant data protection regulations

Implement appropriate data handling policies, including:
- Clear privacy policy
- User consent mechanisms
- Data retention policies
- Right to deletion

---

**Last Updated**: October 2025

