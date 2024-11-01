# French Grammar Statistics

A Django web application that provides statistical insights into French language grammar. Analyze text for word frequency, part of speech, conjugation patterns, sentence complexity, and vocabulary diversity. Ideal for students, teachers, and linguists interested in French language analysis and educational insights.

## Features

* Word Count and Distribution: Analyze the frequency and usage of words.
* Part of Speech Analysis: Identify nouns, verbs, adjectives, and other parts of speech.
* Conjugation Patterns: Examine verb conjugations in different tenses.
* Sentence Structure and Complexity: Assess sentence length and readability.
* Vocabulary Diversity: Measure vocabulary richness, including type-token ratio (TTR).

## Requirements
* Python 3.x
* Django

## Setup Instructions
1. Clone the Repository
```bash
git clone https://github.com/ayman-fdl/french-grammar-stats.git
cd french-grammar-stats
```

2. Set Up a Virtual Environment
Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

3. Install Dependencies
Install the required packages:
```bash
pip install -r requirements.txt
```

4. Set Up the Django Project
Run initial migrations:
```bash
python manage.py migrate
```

5. Run the Development Server
Start the Django development server:
```bash
python manage.py runserver
```