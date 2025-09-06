const API = location.origin + "/api";
document.getElementById("year").textContent = new Date().getFullYear();

// Profile (all info at once)
async function loadFullProfile() {
  const res = await fetch(`${API}/profile`);
  const p = await res.json();
  const div = document.getElementById("profile");
  div.innerHTML = `
    <h2>${p.name}</h2>
    <p><strong>Email:</strong> ${p.email}</p>
    <p><strong>Education:</strong> ${p.education}</p>
    
    <h3>Social Links</h3>
    <p>
      ${p.links?.github ? `<a href="${p.links.github}" target="_blank">GitHub</a> | ` : ""}
      ${p.links?.linkedin ? `<a href="${p.links.linkedin}" target="_blank">LinkedIn</a> | ` : ""}
      ${p.links?.portfolio ? `<a href="${p.links.portfolio}" target="_blank">Portfolio</a>` : ""}
    </p>

    <h3>Skills</h3>
    ${(p.skills || []).map(s => `<span class="tag">${s}</span>`).join(" ")}

    <h3>Projects</h3>
    ${(p.projects || []).map(pr => `
      <div class="project">
        <h4>${pr.title}</h4>
        <p>${pr.description}</p>
        <div>${(pr.skills||[]).map(s=>`<span class="tag">${s}</span>`).join(" ")}</div>
        ${pr.links?.map(l=>`<a href="${l}" target="_blank">🔗 Project Link</a>`).join(" ")}
      </div>
    `).join("")}
  `;
}


// Projects
async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();
  const div = document.getElementById("projects");
  div.innerHTML = "<h2>My Projects</h2>" +
    projects.map(p => `
      <div class="project">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    `).join("");
}
function setupAddProject() {
  document.getElementById("projectForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newProject = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      skills: document.getElementById("skills").value.split(",").map(s=>s.trim()).filter(Boolean),
      links: [document.getElementById("link").value].filter(Boolean)
    };
    try {
      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newProject)
      });
      if (!res.ok) throw new Error("Failed");
      document.getElementById("msg").textContent = "✅ Added!";
      loadProjects();
    } catch {
      document.getElementById("msg").textContent = "❌ Error!";
    }
  });
}

// Skills
async function loadTopSkills() {
  const res = await fetch(`${API}/skills/top`);
  const skills = await res.json();
  document.getElementById("skills").innerHTML = "<h2>Top Skills</h2>" +
    skills.map(s => `<div><strong>${s.skill}</strong> (${s.count})</div>`).join("");
}

// Search
function setupSearch() {
  const box = document.getElementById("searchBox");
  box.addEventListener("input", async e => {
    const q = e.target.value;
    if (!q) return document.getElementById("results").innerHTML="";
    const res = await fetch(`${API}/search?q=${q}`);
    const data = await res.json();
    let html = "<h3>Projects</h3>";
    html += data.projects.map(p => `<div>${p.title} - ${p.description}</div>`).join("");
    html += "<h3>Skills</h3>";
    html += data.skills.map(s => `<span class="tag">${s}</span>`).join(" ");
    document.getElementById("results").innerHTML = html;
  });
}
