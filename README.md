Psychometric Test Suite

This Psychometric Test Suite is a web application designed to administer and score multiple standardized questionnaires—HADS, STAI-S, STAI-T, BFI, and FQ—in one streamlined system. It combines a user-friendly interface, robust data handling, and automated output generation in both CSV and PDF formats.

System Overview


Framework: 

1.	Front-End: HTML, CSS (Bootstrap), JavaScript, jQuery, Django
2.	Reporting: jsPDF for PDF, built-in logic for CSV export


Architecture:

1. Start/Next Button – Initiates the first test and progresses through each question.
2.	Test & Question Loading – Dynamically loads test instructions and question content from a predefined JavaScript array (tests).
3.	Answer Capture – Stores selected answers and time spent answering in an answers array.
4.	Progress Bar – Reflects how many questions have been completed out of the total.
5.	Results Export – One-click download in CSV (raw data) or PDF (summary & details)

Scoring Calculations:

Hospital Anxiety and Depression Scale (HADS)
1. Items: 14 (numbered 1–14)
2. Anxiety Subscale: Items 1, 3, 5, 7, 9, 11, 13
3. Depression Subscale: Items 2, 4, 6, 8, 10, 12, 14
4. Scoring: Each item ranges 0–3. Sum each subscale (range 0–21). Common cutoffs:
   0–7: Normal,
   8–10: Borderline,
   11–21: Abnormal


State-Trait Anxiety Inventory (STAI)

STAI-S (State Anxiety): 20 items (often labeled 1–20)
1.	Reverse-score specific positively worded items (for example, those like “I feel calm”) using 5 − x.
2.	Sum all 20 item scores (range 20–80).

STAI-T (Trait Anxiety): 20 items (often labeled 21–40)
1.	Reverse-score the designated items using 5 − x.
2.	Sum for a total of 20–80.


Big Five Inventory (BFI), 10-item Version

1.	Items: 10 (numbered 1–10)
2.	Traits: Extraversion, Agreeableness, Conscientiousness, Neuroticism, Openness
3.	Scoring: Each trait has 2 items; one is reverse keyed (6 − x). Sum or average each pair: Sum: 2–10 per trait, Average: 1–5 per trait


Fear Questionnaire (FQ)

Items: 24 (numbered 1–24), each 0–8

Scoring:
1.	Main Phobia Avoidance: Item 1 (range 0–8).
2.	Total Phobia Score: Sum Items 2–16 (range 0–120).
3.	Subscales (each 5 items, each range 0–40):
a.	Agoraphobia: Items 5, 6, 8, 12, 15
b.	Blood/Injury: Items 2, 4, 10, 13, 16
c.	Social: Items 3, 7, 9, 11, 14
4.	Global Phobia Rating: Item 18 (range 0–8).
5.	Associated Anxiety/Depression: Sum Items 19–24 (range 0–40).


Data Capture & Storage:

1.	Answer Data Structure: Each response is stored as an object containing:
2.	Test Name (e.g., “HADS”, “STAI-S”)
3.	Question text
4.	Selected Option and corresponding numeric Score
5.	Time Spent on the question (in seconds)
6.	Timestamps for question start (questionStartTime) and answer submission (answerTime)
<img width="805" alt="Screenshot 2025-03-01 at 9 38 45 PM" src="https://github.com/user-attachments/assets/72cb04ba-bbd4-4d1c-9c28-917d811db051" />

<img width="805" alt="Screenshot 2025-03-01 at 9 38 55 PM" src="https://github.com/user-attachments/assets/fc3210d3-57de-4308-be36-62b41721b301" />

<img width="806" alt="Screenshot 2025-03-01 at 9 23 23 PM" src="https://github.com/user-attachments/assets/71a9b18f-c3a1-4809-a7ad-bae01f528ea8" />

<img width="857" alt="Screenshot 2025-03-01 at 9 23 38 PM" src="https://github.com/user-attachments/assets/0a9579a4-a2e5-409d-910a-0fc2955f11f1" />
