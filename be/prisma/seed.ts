import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hash password for seed users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@enggalgroup.com' },
    update: {},
    create: {
      email: 'admin@enggalgroup.com',
      password: hashedPassword,
      nama: 'Admin User',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create test users
  const users = [
    {
      email: 'user1@enggalgroup.com',
      nama: 'User Satu',
    },
    {
      email: 'user2@enggalgroup.com',
      nama: 'User Dua',
    },
    {
      email: 'demo@enggalgroup.com',
      nama: 'Demo User',
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        password: hashedPassword,
        nama: userData.nama,
      },
    });
    console.log(`Created user: ${user.email}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
