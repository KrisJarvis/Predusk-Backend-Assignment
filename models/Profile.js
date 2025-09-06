const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: [String],
  skills: [String]
});

const WorkSchema = new mongoose.Schema({
  company: String,
  title: String,
  from: String, // YYYY-MM
  to: String,   // YYYY-MM or "Present"
  description: String
});

const LinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: String,
  skills: [String],
  projects: [ProjectSchema],
  work: [WorkSchema],
  links: LinksSchema
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
