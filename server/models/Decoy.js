import mongoose from 'mongoose';

const DecoySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  vector: {
    type: String,
    required: true,
    enum: ['CANARY_URL', 'API_KEY', 'DB_ROW', 'DOCUMENT']
  },
  vectorLabel: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'ARMED',
    enum: ['ARMED', 'TRIPPED', 'DECOMMISSIONED']
  },
  triggerCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Decoy', DecoySchema);
