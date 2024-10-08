import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, fullname, password } = req.body;

    // Validate input
    if (!email || !fullname || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name: fullname,
        password: hashedPassword,
      },
    });

    // Return the created user (omit password for security)
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json(userWithoutPassword);
  }

  // Method Not Allowed
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default signupHandler;
