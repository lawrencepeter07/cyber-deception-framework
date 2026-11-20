import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
  trapName: {
    type: String,
    required: true
  },
  vectorClass: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  geo: {
    type: String,
    default: 'Unknown Geolocation'
  },
  tool: {
    type: String,
    default: 'Generic Web Client'
  },
  toolCategory: {
    type: String,
    default: 'Interactive Browser'
  },
  networkType: {
    type: String,
    enum: ['TOR_EXIT_NODE', 'COMMERCIAL_VPN', 'CLOUD_DATACENTER', 'RESIDENTIAL_ISP', 'LOCAL_SIMULATION', 'EXTERNAL_MOBILE', 'EXTERNAL_MOBILE_4G_5G', 'CELLULAR_CARRIER', 'EXTERNAL_INTERNET'],
    default: 'RESIDENTIAL_ISP'
  },
  threatScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  },
  fingerprint: {
    type: String,
    default: 'fp_unhashed'
  },
  payload: {
    type: String,
    default: ''
  },
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'CRITICAL'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Incident', IncidentSchema);
