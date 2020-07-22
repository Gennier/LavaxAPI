import * as mongoose from 'mongoose';

const freelanceSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  skillsets: [{ type: String, required: true }],
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const freelanceModal = mongoose.model('Freelancer', freelanceSchema);

const projectSchema = new mongoose.Schema({
  projectname: { type: String, required: true },
  payout: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  freelancers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: freelanceModal,
    },
  ],
});

export interface FreelancerDocument extends mongoose.Document {
  id: any;
  fullname: string;
  email: string;
  skillsets: [string];
  location: string;
  createAt: any;
  deletedAt: any;
}

export const Freelancer = mongoose.model<FreelancerDocument>('Freelancer', freelanceSchema);
export const Project = mongoose.model('Project', projectSchema);
