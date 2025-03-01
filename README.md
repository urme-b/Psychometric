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
