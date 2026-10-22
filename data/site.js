/*
  Everything about you that appears on the site (except projects) lives here.
  Edit the text, save, refresh the page. Projects live in data/projects.js.
*/
window.SITE = {
  name: "Vaibhav Kumar Gupta",
  location: "New Delhi, India",
  email: "vaibhavguptany@gmail.com",
  github: "https://github.com/mindchampvaibhav",
  // Optional extras: set to a URL to show the link, or leave as null.
  linkedin: null,
  cvUrl: null, // e.g. "assets/CV_Vaibhav_Kumar_Gupta.pdf" after you add the file
  photo: null, // e.g. "assets/photo.jpg"

  eyebrow: "Applicant, B.S. Computer Science, Fall 2027",
  headline: "I build software that adapts to the person using it.",
  intro:
    "Grade 12 student at St. Columba's School, New Delhi, ranked in the top 3% of my class. " +
    "I like problems where mathematics, logic and a working program meet, and I want to study " +
    "software architecture, intelligent systems and computational theory at university.",

  // DRAFT: rewrite these two paragraphs in your own words before you submit.
  about: [
    "Mathematics and logic are my strongest subjects, and programming is where I put them to work. My Grade 12 capstone, a quiz that adjusts its difficulty to each answer, is the project I am proudest of so far, and it runs live on this site.",
    "Outside class I teach basic digital literacy to tribal children, represent countries at Model United Nations, and have played the piano for ten years. I want to study computer science at a university where I can work on software architecture, intelligent systems and the theory underneath them.",
  ],

  education: {
    school: "St. Columba's School",
    place: "1 Ashok Road, New Delhi",
    programme: "Senior High School, Grade 12 (PCM with Computer Science)",
    graduation: "Expected May 2027",
    standing: "Ranked in the top 3% of the graduating class",
    coursework: ["Computer Science (Python, SQL, Data Structures)", "Advanced Mathematics", "Physics", "Chemistry"],
  },

  // Each group is shown as one block. "when" is free text.
  activities: [
    {
      group: "Technology",
      items: [
        {
          title: "Reboot Society and Vector Society",
          role: "Active member",
          when: "2025 – present",
          text: "Technology workshops, peer mentoring in programming, and competitive coding problem sets with other members.",
        },
      ],
    },
    {
      group: "Service and leadership",
      items: [
        {
          title: "Digital Literacy Initiative for Tribal Children",
          role: "Volunteer educator",
          when: "Grade 11 – Grade 12",
          text: "Taught foundational digital literacy, basic computer operation and basic logic to underprivileged tribal children.",
        },
        {
          title: "Model United Nations",
          role: "Country delegate",
          when: "2022 – present",
          text: "Represented assigned nations at intra- and inter-school conferences over four years; drafted position papers and negotiated resolutions.",
        },
      ],
    },
    {
      group: "Music",
      items: [
        {
          title: "Piano, ABRSM",
          role: "Grades 1–4 with Merit",
          when: "10 years",
          text: "Classical and modern piano. Awarded music scholarships for two consecutive years.",
        },
      ],
    },
    {
      group: "Sport and school life",
      items: [
        {
          title: "Lawn Tennis and Table Tennis teams",
          role: "School team member",
          when: "",
          text: "Represented the school in intra- and inter-school tournaments.",
        },
        {
          title: "Marching Contingent, Annual Sports Day",
          role: "Participant",
          when: "2 years",
          text: "Part of the school's official marching contingent in two consecutive years.",
        },
        {
          title: "Columban Fest and Artistic Odyssey",
          role: "Organising committee and participant",
          when: "",
          text: "Helped organise the annual school fest and took part in the school's creative showcase.",
        },
        {
          title: "Photography Club",
          role: "Active member",
          when: "",
          text: "Creative and technical photography.",
        },
      ],
    },
  ],

  skills: {
    "Programming": ["Python", "SQL", "Data structures and algorithms", "Object-oriented programming", "Database management", "Logic design"],
    "Working with people": ["Analytical reasoning", "Public speaking", "Leadership", "Event coordination", "Cross-cultural communication"],
  },
};
