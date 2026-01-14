import * as path from 'path';

export const MEMBERSHIP_TEMPLATE = {
  FRONT_IMAGE: '/uploads/membership-card-front.png',
  BACK_IMAGE: '/uploads/membership-card-back.png',
  CONFIG_FILE: path.join(
    process.cwd(),
    'uploads',
    'membership-template-config.json',
  ),
  DEFAULT_CONFIG: {
    textColor: '#333333',
    fontSize: 12,
  } as const,
} as const;
