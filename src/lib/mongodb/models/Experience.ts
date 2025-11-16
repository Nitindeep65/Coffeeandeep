import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  current: boolean;
  startDate: Date;
  endDate?: Date;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxLength: [100, 'Company name cannot exceed 100 characters']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxLength: [50, 'Duration cannot exceed 50 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxLength: [100, 'Location cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true,
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  technologies: {
    type: [String],
    required: [true, 'At least one technology is required'],
    validate: {
      validator: function(v: string[]) {
        return v && v.length > 0;
      },
      message: 'At least one technology must be specified'
    }
  },
  current: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(this: IExperience, v: Date) {
        // If current is true, endDate should not be set
        if (this.current && v) return false;
        // If not current, endDate should be set and after startDate
        if (!this.current && (!v || v <= this.startDate)) return false;
        return true;
      },
      message: 'End date must be after start date and properly set based on current status'
    }
  },
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
ExperienceSchema.index({ startDate: -1 });
ExperienceSchema.index({ current: -1 });

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
