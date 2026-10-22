# Vaibhav Kumar Gupta: portfolio

A static portfolio website. Projects can run live inside the page: the Smart GK Quiz
runs its real Python/Streamlit code in the visitor's browser (WebAssembly via
[stlite](https://github.com/whitphx/stlite)), so no server is needed and nothing sleeps.

```
index.html            page layout (no need to edit)
assets/style.css      design
assets/app.js         builds the page from the data files (no need to edit)
data/site.js          your details: intro, about, education, activities, skills, contact
data/projects.js      your projects  <-- add new projects here
demo.html             runs Streamlit projects in the browser
projects/<id>/        files each live demo needs (app code, CSV, Dockerfile...)
Dockerfile            serves the website from a container (nginx)
docker-compose.yml    runs the website + the quiz in real containers together
```

## 1. Put it online (GitHub Pages, free)

1. On GitHub create a new **public** repository named exactly
   `mindchampvaibhav.github.io`.
2. Upload everything in this folder to it (drag and drop on the GitHub website works,
   or use `git push`). Keep the folder structure.
3. In the repository go to **Settings → Pages**, set *Source* to **Deploy from a branch**,
   branch `main`, folder `/ (root)`, and save.
4. After a minute or two the site is live at **https://mindchampvaibhav.github.io**.
   That is the link to put on your applications.

Every later change you push goes live automatically within a minute or two.

## 2. Add a new project

1. Open `data/projects.js`. At the bottom there is a commented **TEMPLATE**. Copy it into
   the list and fill it in. The `id` decides the page address:
   `https://mindchampvaibhav.github.io/#project-<id>`.
2. Pick how visitors run it, with the `demo` field:

   | Your project is... | Use |
   |---|---|
   | A Streamlit app (pure Python, packages like pandas/numpy are fine) | `type: "streamlit-browser"`: put its files in `projects/<id>/` and list them in `files` |
   | A web app hosted somewhere else (Streamlit Community Cloud, Hugging Face Spaces, Render) | `type: "embed", url: "https://..."` (Streamlit Cloud: add `?embed=true`) |
   | Something that can't be embedded | `type: "link", url: "https://..."` |
   | No demo, just a write-up and code | `demo: null` |

   Extra Python packages for a browser demo go in `requirements`, e.g. `["pandas"]`.
   Programs that use `input()` in a terminal can't run in the browser; give them a
   Streamlit interface first, or show them with `demo: null` plus the source viewer.
3. To show code on the project page, copy the files into `projects/<id>/` and list them
   in `source`.
4. Push to GitHub. Done.

## 3. Test on your own computer

Opening `index.html` by double-click will not load the code viewer or the demo
(browsers block that for local files). Start a small server in this folder instead:

```bash
python -m http.server 8000
# open http://localhost:8000
```

Or run the real containers (needs Docker Desktop):

```bash
docker compose up --build
# website  -> http://localhost:8080
# quiz app -> http://localhost:8501
```

## 4. Keep the quiz repository in sync

The demo runs the copy in `projects/smart-gk-quiz/`. When you change the quiz in its own
repository, copy `app.py` and `Quiz Questions.csv` here too.
