const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// ✅ Health Check
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ✅ Get Profile
router.get("/profile", async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
});

// ✅ Create Profile
router.post("/profile", async (req, res) => {
  await Profile.deleteMany({}); // only one profile allowed
  const profile = new Profile(req.body);
  await profile.save();
  res.status(201).json(profile);
});

// ✅ Update Profile
router.put("/profile", async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

// ✅ Get All Projects
router.get("/projects", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile?.projects || []);
});

// ✅ Query projects by skill
router.get("/projects/search", async (req, res) => {
  const skill = req.query.skill;
  const profile = await Profile.findOne();
  if (!skill) return res.json(profile?.projects || []);
  const projects = (profile?.projects || []).filter(p =>
    p.skills.includes(skill)
  );
  res.json(projects);
});

// ✅ Add Project
router.post("/projects", async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ error: "Profile not found" });

  profile.projects.push(req.body);
  await profile.save();
  res.json({ message: "Project added", project: req.body });
});

// ✅ Top Skills (count from projects + profile.skills)
router.get("/skills/top", async (req, res) => {
  const profile = await Profile.findOne();
  const counts = {};
  (profile?.skills || []).forEach(s => counts[s] = (counts[s] || 0) + 1);
  (profile?.projects || []).forEach(p => {
    (p.skills || []).forEach(s => counts[s] = (counts[s] || 0) + 1);
  });

  const sorted = Object.entries(counts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a,b)=>b.count-a.count);

  res.json(sorted);
});

// ✅ Search (projects + skills)
router.get("/search", async (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const profile = await Profile.findOne();
  if (!profile) return res.json({ projects: [], skills: [] });

  const projects = (profile.projects || []).filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );

  const skills = (profile.skills || []).filter(s =>
    s.toLowerCase().includes(q)
  );

  res.json({ projects, skills });
});

module.exports = router;
