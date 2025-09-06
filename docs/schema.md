# Schema

## Collection: profiles (single document)

- name: String (required)
- email: String (required)
- education: String
- skills: [String]
- projects: [
  {
  title: String (required)
  description: String
  links: [String]
  skills: [String]
  }
  ]
- work: [
  {
  company: String
  title: String
  from: String (YYYY-MM)
  to: String (YYYY-MM | "Present")
  description: String
  }
  ]
- links: {
  github: String
  linkedin: String
  portfolio: String
  }
