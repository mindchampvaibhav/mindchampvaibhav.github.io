/*
  PROJECTS
  ========
  Every object in this list becomes a card on the home page and its own project page
  (the page address is  yoursite/#project-<id>).

  To add a project: copy the TEMPLATE at the bottom, paste it into the list,
  fill it in, save. Order in this list = order on the site.

  Fields
    id           short, unique, lowercase-with-dashes. Used in the page address.
    title        project name
    context      e.g. "Grade 12 Capstone Project"
    year         e.g. "2026"
    summary      one or two sentences for the card
    description  list of paragraphs for the project page
    highlights   list of short bullet points ("What I built")
    tech         list of tools/languages, shown as tags
    repo         GitHub link, or null
    demo         how visitors run it (or null for no demo):
                   { type: "streamlit-browser", entrypoint, files, requirements }
                       Runs a Streamlit app inside the visitor's browser (no server needed).
                       files maps the file name the app expects -> path inside this site.
                   { type: "embed", url }
                       Shows an app you host elsewhere (Streamlit Community Cloud,
                       Hugging Face Spaces, Render...) inside the page.
                       For Streamlit Cloud add ?embed=true to the URL.
                   { type: "link", url }
                       Just a button that opens the app in a new tab.
    source       files to show in the "Source code" viewer: [{ name, path }]
    runLocally   optional list of terminal commands for running it yourself
*/
window.PROJECTS = [
  {
    id: "smart-gk-quiz",
    title: "Smart GK Quiz",
    context: "Grade 12 Capstone Project",
    year: "2026",
    summary:
      "An adaptive general-knowledge quiz. Every correct answer makes the next question harder, every miss makes it easier, so each player settles at the level that fits them.",
    description: [
      "Most quizzes give everyone the same ten questions, so strong players get bored and beginners get discouraged. Smart GK Quiz keeps a running difficulty level from 1 to 5 and picks each new question to match it.",
      "Questions come from a CSV question bank with an id, four options, the correct answer and a difficulty rating. The app never repeats a question in a session, falls back to the nearest level when one runs out, and ends after ten questions or two minutes, then shows the score and how the difficulty moved during the game.",
    ],
    highlights: [
      "Difficulty adapts after every answer, clamped between levels 1 and 5",
      "Question selection without repeats, with fallback to the closest available level",
      "Session state that survives Streamlit's rerun-on-every-click model",
      "Two-minute timer, score tracking and an end-of-quiz difficulty chart",
      "Question bank kept in a plain CSV file, so new questions need no code changes",
    ],
    tech: ["Python", "Streamlit", "CSV file handling", "Session state"],
    repo: "https://github.com/mindchampvaibhav/Smart-GK-Quiz-System",
    demo: {
      type: "streamlit-browser",
      entrypoint: "app.py",
      files: {
        "app.py": "projects/smart-gk-quiz/app.py",
        "Quiz Questions.csv": "projects/smart-gk-quiz/Quiz Questions.csv",
      },
      requirements: [],
    },
    source: [
      { name: "app.py", path: "projects/smart-gk-quiz/app.py" },
      { name: "Quiz Questions.csv", path: "projects/smart-gk-quiz/Quiz Questions.csv" },
      { name: "Dockerfile", path: "projects/smart-gk-quiz/Dockerfile" },
    ],
    runLocally: [
      "git clone https://github.com/mindchampvaibhav/Smart-GK-Quiz-System.git",
      "cd Smart-GK-Quiz-System",
      "docker build -t smart-gk-quiz .",
      "docker run -p 8501:8501 smart-gk-quiz",
      "# then open http://localhost:8501",
    ],
  },

  {
    id: "railway-reservation",
    title: "Railway Reservation System",
    context: "Grade 11 Project",
    year: "2025",
    summary:
      "A database-driven ticket booking system that simulates seat allocation, passenger records and cancellations.",
    description: [
      "A simulation of a real railway booking counter: passengers can book a ticket, get a seat allocated, look up their booking and cancel it.",
      "Bookings and passenger records are stored with SQL and file I/O so that each booking or cancellation either completes fully or not at all.",
    ],
    highlights: [
      "Ticket booking, seat allocation and cancellation flows",
      "Passenger records management",
      "SQL and file storage with all-or-nothing updates for each transaction",
    ],
    tech: ["Python", "SQL", "File I/O"],
    repo: null, // add the GitHub link once the code is uploaded
    demo: null,
    source: [],
  },

  /* ---------- TEMPLATE: copy from here ----------
  {
    id: "my-new-project",
    title: "My New Project",
    context: "Personal Project",
    year: "2027",
    summary: "One or two sentences about what it does.",
    description: [
      "What problem it solves and who it is for.",
      "How it works.",
    ],
    highlights: ["Something you built", "Something you learned"],
    tech: ["Python"],
    repo: "https://github.com/mindchampvaibhav/my-new-project",
    demo: null,
    source: [],
  },
  ---------- to here ---------- */
];
