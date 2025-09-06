require("dotenv").config();
const mongoose = require("mongoose");
const Profile = require("../models/Profile");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    await Profile.deleteMany({}); // clean

    const me = await Profile.create({
      name: "Kishlay Krishna",
      email: "kishlaykrishna05@gmail.com",
      education: "B.Tech CSE, 2025",
      skills: [
        "React",
        "Tailwind",
        "JavaScript",
        "Node",
        "Express",
        "MongoDB",
        "SQL",
        "Python",
        "C++",
      ],
      projects: [
        {
          title: "Mobile Visualizer",
          description:
            "An interactive 3D-style website for showcasing mobile devices with animations and smooth transitions. Built with React.js, TailwindCSS, and GSAP, inspired by Apple's product pages.",
          duration: "2 months",
          highlights:
            "Implemented dynamic animations with GSAP, responsive design with Tailwind, and optimized performance for seamless user experience.",
          skills: ["React.js", "TailwindCSS", "GSAP", "JavaScript"],
          links: ["https://iphone-model-3d.netlify.app/"],
        },
      ],
      work: [
        {
          company: " A Globe Holidays",
          title: "Software Developer Intern",
          from: "2024-05",
          to: "2024-08",
          description:
            "Built UI components, integrated REST APIs, and optimized performance.",
        },
      ],
      links: {
        github: "https://github.com/KrisJarvis",
        linkedin: "https://www.linkedin.com/in/kishlaykrishna05/",
        portfolio: "https://krisjarvis.github.io/My-Portfolio/",
      },
    });

    console.log("Seeded:", me.name);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
