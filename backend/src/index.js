// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Datastore from 'nedb-promises';
import path from 'path';
import fs from 'fs';

// Initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3001;
const DB_DIR = path.join(process.cwd(), 'data');

// Ensure the data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize NeDB database
const db = Datastore.create({
  filename: path.join(DB_DIR, 'candidates.db'),
  autoload: true
});

// Create an index on the id field to ensure uniqueness
void db.ensureIndex({ fieldName: 'id', unique: true });

// Middleware
app.use(cors());
app.use(express.json());

// GET candidates (optionally filtered by IDs)
app.get('/api/candidates', async (req, res) => {
  try {
    const { ids } = req.query;
    let query = {};

    if (ids) {
      // Convert comma-separated string to array if needed
      const idArray = Array.isArray(ids) ? ids : ids.split(',');
      // Convert string IDs to numbers
      const numericIds = idArray.map(Number);
      query = { id: { $in: numericIds } };
    }

    const candidates = await db.find(query);
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// POST - Add/Update a candidate
app.post('/api/candidates', async (req, res) => {
  try {
    const { id: userId, name, bio } = req.body;
    const id = Number(userId);

    // Verify the candidate exists
    const existingCandidate = await db.findOne({ id });

    if (!existingCandidate) {
      if (!id || !name) {
        return res.status(400).json({ error: 'ID and name are required' });
      }

      const data = {
        id,
        name,
        bio: bio ?? ''
      };
      await db.insert(data);
      res.status(201).json(data);
    } else {
      // Build object
      let data = {};
      if (name) data.name = name;
      if (bio !== undefined) data.bio = bio;

      // Update the candidate
      await db.update({ id }, { $set: data });

      // Get the updated candidate
      const updatedCandidate = await db.findOne({ id });
      res.json(updatedCandidate);
    }
  } catch (error) {
    console.error('Error creating/updating candidate:', error);
    res.status(500).json({ error: 'Failed to creating/updating candidate' });
  }
});

// DELETE - Remove a candidate
app.delete('/api/candidates/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Verify the candidate exists
    const existingCandidate = await db.findOne({ id });

    if (!existingCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Delete the candidate
    await db.remove({ id }, {});

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
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  process.exit(0);
});