# MailPit Configuration for Raafco IMS

## Overview

MailPit is now enabled and optimized for email testing in the development environment.

## Access Points

### Web Interface

- **URL**: http://localhost:8025
- **Purpose**: View all emails sent by the application
- **Features**:
  - Real-time email capture
  - HTML/text email preview
  - Email source viewing
  - Search and filtering

### SMTP Server

- **Host**: mailpit (internal) / localhost:1025 (external)
- **Port**: 1025
- **Authentication**: None required (development mode)

## Configuration Details

### Docker Service

```yaml
mailpit:
  container_name: raafco_ims_mailpit
  image: axllent/mailpit:latest
  ports:
    - "8025:8025" # Web UI
    - "1025:1025" # SMTP
  environment:
    MP_SMTP_AUTH_ACCEPT_ANY: 1
    MP_SMTP_AUTH_ALLOW_INSECURE: 1
    MP_WEB_ROOT: /
    MP_DATA_FILE: /tmp/mailpit.db
    MP_SMTP_BIND_ADDR: 0.0.0.0:1025
    MP_WEB_BIND_ADDR: 0.0.0.0:8025
  volumes:
    - mailpit_data:/tmp
```

### Laravel Environment Variables

```env
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@raafco.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## Optimizations Applied

1. **Persistent Storage**: Email data is stored in a named volume for persistence across container restarts
2. **Network Integration**: Service is properly integrated with the custom Docker network
3. **Health Checks**: Service includes health monitoring for reliable startup
4. **Security**: Configured for development use with relaxed authentication
5. **Performance**: Optimized bind addresses and data file location

## Usage Examples

### Testing Email in Laravel

```php
// Send a test email
Mail::to('test@example.com')->send(new TestMail());

// The email will appear in MailPit web interface at http://localhost:8025
```

### Testing Email Templates

```php
// Send welcome email
Mail::to($user->email)->send(new WelcomeEmail($user));

// View in MailPit to verify formatting and content
```

## Troubleshooting

### MailPit Not Accessible

1. Check if service is running: `docker compose ps`
2. Verify port forwarding: `docker compose logs mailpit`
3. Check health status: Service should show as "healthy"

### Emails Not Appearing

1. Verify Laravel mail configuration
2. Check MAIL_HOST is set to "mailpit"
3. Ensure MAIL_PORT is 1025
4. Check Laravel logs for mail errors

### Performance Issues

1. Clear MailPit data: `docker compose down && docker volume rm raafco_ims_mailpit_data`
2. Restart services: `docker compose up -d`

## Benefits

- **No External Dependencies**: All email testing happens locally
- **Real-time Monitoring**: See emails as they're sent
- **Template Testing**: Verify email formatting and content
- **Development Safety**: No risk of sending emails to real addresses
- **Performance**: Fast email capture and display
- **Persistence**: Email history survives container restarts
