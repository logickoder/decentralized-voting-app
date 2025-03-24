// server.js
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

// Initialize
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ?? 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET candidates (optionally filtered by IDs)
app.get('/api/candidates', async (req, res) => {
  try {
    const { ids } = req.query;
    let candidates;

    if (ids) {
      // Convert comma-separated string to array if needed
      const idArray = Array.isArray(ids) ? ids : ids.split(',');

      candidates = await prisma.candidate.findMany({
        where: {
          id: { in: idArray.map(Number) }
        }
      });
    } else {
      // Return all candidates if no IDs are provided
      candidates = await prisma.candidate.findMany();
    }

    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// POST - Create a new candidate
app.post('/api/candidates', async (req, res) => {
  try {
    const id = Number(req.body.id);
    const { name, bio } = req.body;

    if (!id || !name) {
      return res.status(400).json({ error: 'ID and name are required' });
    }

    // Check if candidate with this ID already exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id }
    });

    if (existingCandidate) {
      return res.status(409).json({ error: 'Candidate with this ID already exists' });
    }

    const newCandidate = await prisma.candidate.create({
      data: {
        id,
        name,
        bio: bio || ''
      }
    });

    res.status(201).json(newCandidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ error: 'Failed to create candidate' });
  }
});

// PATCH - Update an existing candidate
app.patch('/api/candidates/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, bio } = req.body;

    // Verify the candidate exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id }
    });

    if (!existingCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Update the candidate
    const updatedCandidate = await prisma.candidate.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(bio !== undefined && { bio })
      }
    });

    res.json(updatedCandidate);
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Failed to update candidate' });
  }
});

// DELETE - Remove a candidate
app.delete('/api/candidates/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Verify the candidate exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id }
    });

    if (!existingCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Delete the candidate
    await prisma.candidate.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});