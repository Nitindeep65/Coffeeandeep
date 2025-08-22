import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    other?: string[];
  };
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  stats: {
    experience: string;
    projects: string;
    clients: string;
    quality: string;
  };
  cvUrl?: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Professional title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  phone: {
    type: String,
    trim: true,
    maxLength: [20, 'Phone number cannot exceed 20 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxLength: [100, 'Location cannot exceed 100 characters']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxLength: [500, 'Bio cannot exceed 500 characters']
  },
  skills: {
    frontend: {
      type: [String],
      default: []
    },
    backend: {
      type: [String],
      default: []
    },
    tools: {
      type: [String],
      default: []
    },
    other: {
      type: [String],
      default: []
    }
  },
  social: {
    linkedin: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid URL'
      }
    },
    github: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid URL'
      }
    },
    twitter: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid URL'
      }
    },
    website: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please provide a valid URL'
      }
    }
  },
  stats: {
    experience: {
      type: String,
      required: true,
      default: '0+'
    },
    projects: {
      type: String,
      required: true,
      default: '0+'
    },
    clients: {
      type: String,
      required: true,
      default: '0+'
    },
    quality: {
      type: String,
      required: true,
      default: '100%'
    }
  },
  cvUrl: {
    type: String,
    default: null
  },
  avatarUrl: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
