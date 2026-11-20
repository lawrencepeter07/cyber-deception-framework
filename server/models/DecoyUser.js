import mongoose from 'mongoose';

const DecoyUserSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  googleAccount: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  twoFactorBackup: {
    type: String,
    default: '9841-2294-1102'
  },
  accessLevel: {
    type: String,
    enum: ['SUPERADMIN', 'LEVEL_4_ENGINEER', 'FINANCE_ROOT', 'HR_OFFICER', 'DEV_OPS'],
    default: 'LEVEL_4_ENGINEER'
  },
  isDecoyTrap: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('DecoyUser', DecoyUserSchema);
