import random
import csv
import time
import streamlit as st

total = 10
time_limit = 120
csv_file = "Quiz Questions.csv"
min_difficulty = 1
max_difficulty = 5

# CSV columns: id, question, option1, option2, option3, option4, correct answer, difficulty (1-5)

st.title("Smart GK Quiz")


def load_questions():
    questions = []
    try:
        with open(csv_file, "r", encoding="utf-8") as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                if len(row) >= 8 and row[0].strip().isdigit():  # skips a header row or blank lines
                    questions.append(row)
    except FileNotFoundError:
        st.error(f"File '{csv_file}' not found!")
    return questions


if "questions" not in st.session_state:
    st.session_state.questions = load_questions() #Loads the list of questions from the CSV file.
    st.session_state.used_numbers = [] #Keeps track of which questions have already been asked, so we don't repeat them.
    st.session_state.correct = 0 #The score counter, starting at zero. Gets incremented by 1 every time the user answers correctly.
    st.session_state.question_count = 0 #Tracks how many questions have been asked so far. When this hits 10, the quiz ends.
    st.session_state.start_time = time.time() #Records the exact moment the quiz starts
    st.session_state.current_question = None #No question has been fetched yet, so None.
    st.session_state.finished = False #Means the quiz is still going
    st.session_state.difficulty = min_difficulty #Current difficulty level. Stored in session_state so it survives Streamlit's reruns.
    st.session_state.feedback = None #Result of the last answer, shown after the page reruns.
    st.session_state.history = [] #(question number, difficulty, correct?) for the end-of-quiz report.


def get_unique_random():
    available = [
        row for row in st.session_state.questions
        if int(row[0]) not in st.session_state.used_numbers
    ]
    if not available:
        return None
    # Prefer questions at the current difficulty; if none are left, use the closest level that still has questions.
    target = st.session_state.difficulty
    closest = min(abs(int(row[-1]) - target) for row in available)
    candidates = [row for row in available if abs(int(row[-1]) - target) == closest]
    return random.choice(candidates)


if st.session_state.finished:
    st.success(f"Correct answers: {st.session_state.correct} out of {st.session_state.question_count}")
    if st.session_state.history:
        st.write("Difficulty of each question you were given:")
        st.line_chart(
            {"Difficulty": [level for _, level, _ in st.session_state.history]},
            x_label="Question",
            y_label="Difficulty",
        )
    if st.button("Restart"):
        st.session_state.clear()
        st.rerun()
else:
    elapsed = time.time() - st.session_state.start_time
    remaining = int(time_limit - elapsed)

    if remaining <= 0:
        st.warning("Time's up!")
        st.session_state.finished = True
        st.rerun()

    if st.session_state.question_count >= total:
        st.session_state.finished = True
        st.rerun()

    if st.session_state.feedback == "correct":
        st.success("Correct!")
    elif st.session_state.feedback is not None:
        st.error(f"Wrong answer. The correct answer was: {st.session_state.feedback}")

    st.write(f"Time remaining: {remaining} seconds  |  Score: {st.session_state.correct}  |  Current difficulty: {st.session_state.difficulty}/{max_difficulty}")

    if st.session_state.current_question is None:
        st.session_state.current_question = get_unique_random()

    row = st.session_state.current_question

    if row:
        st.subheader(f"Q{st.session_state.question_count + 1}: {row[1]}")
        st.caption(f"Difficulty level {row[-1]}")

        choice = st.radio(
            "Enter your choice:",
            options=[1, 2, 3, 4],
            format_func=lambda x: f"{x}. {row[x + 1]}",
            key=f"choice_{row[0]}",  # a new key per question, so the previous selection is not carried over
        )

        if st.button("Submit"):
            if row[choice + 1] == row[6]:
                st.session_state.feedback = "correct"
                st.session_state.difficulty = min(max_difficulty, st.session_state.difficulty + 1)  # Increase difficulty for the next question
                st.session_state.correct += 1
            else:
                st.session_state.feedback = row[6]
                st.session_state.difficulty = max(min_difficulty, st.session_state.difficulty - 1)  # Decrease difficulty, but not below 1

            st.session_state.history.append((st.session_state.question_count + 1, int(row[-1]), row[choice + 1] == row[6]))
            st.session_state.used_numbers.append(int(row[0]))
            st.session_state.question_count += 1
            st.session_state.current_question = None
            st.rerun()

        if st.button("Exit"):
            st.session_state.finished = True
            st.rerun()
    else:
        st.info("No more questions available.")
        st.session_state.finished = True
