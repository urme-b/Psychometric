let currentTestIndex = 0;
let currentQuestionIndex = 0;
let totalQuestions = 0;
let answers = [];
let testStartTime, questionStartTime;

const tests = [
  {
    name: "HADS",
    instructions:
      "HADS: Read each item and tick the reply that is closest to how you have been feeling in the past week. Don’t take too long over your replies, your immediate answer is best.",
    questions: [
      {
        q: "1. I feel tense or 'wound up':",
        options: [
          "Most of the time",
          "A lot of the time",
          "From time to time, occasionally",
          "Not at all",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "2. I still enjoy the things I used to enjoy:",
        options: [
          "Definitely as much",
          "Not quite so much",
          "Only a little",
          "Hardly at all",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "3. I get a sort of frightened feeling as if something awful is about to happen:",
        options: [
          "Very definitely and quite badly",
          "Yes, but not too badly",
          "A little, but it doesn't worry me",
          "Not at all",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "4. I can laugh and see the funny side of things:",
        options: [
          "As much as I always could",
          "Not quite so much now",
          "Definitely not so much now",
          "Not at all",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "5. Worrying thoughts go through my mind:",
        options: [
          "A great deal of the time",
          "A lot of the time",
          "From time to time, but not too often",
          "Only occasionally",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "6. I feel cheerful:",
        options: ["Not at all", "Not often", "Sometimes", "Most of the time"],
        scores: [3, 2, 1, 0],
        category: "Depression",
      },
      {
        q: "7. I can sit at ease and feel relaxed:",
        options: ["Definitely", "Usually", "Not Often", "Not at all"],
        scores: [0, 1, 2, 3],
        category: "Anxiety",
      },
      {
        q: "8. I feel as if I am slowed down:",
        options: [
          "Nearly all the time",
          "Very often",
          "Sometimes",
          "Not at all",
        ],
        scores: [3, 2, 1, 0],
        category: "Depression",
      },
      {
        q: "9. I get a sort of frightened feeling like 'butterflies' in the stomach:",
        options: ["Not at all", "Occasionally", "Quite Often", "Very Often"],
        scores: [0, 1, 2, 3],
        category: "Anxiety",
      },
      {
        q: "10. I have lost interest in my appearance:",
        options: [
          "I take just as much care as ever",
          "I may not take quite as much care",
          "I don't take as much care as I should",
          "Definitely",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "11. I feel restless as I have to be on the move:",
        options: [
          "Not at all",
          "Not very much",
          "Quite a lot",
          "Very much indeed",
        ],
        scores: [0, 1, 2, 3],
        category: "Anxiety",
      },
      {
        q: "12. I look forward with enjoyment to things:",
        options: [
          "As much as I ever did",
          "Rather less than I used to",
          "Definitely less than I used to",
          "Hardly at all",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "13. I get sudden feelings of panic:",
        options: [
          "Not at all",
          "Not very often",
          "Quite often",
          "Very often indeed",
        ],
        scores: [0, 1, 2, 3],
        category: "Anxiety",
      },
      {
        q: "14. I can enjoy a good book or radio or TV program:",
        options: ["Often", "Sometimes", "Not often", "Very seldom"],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
    ],
  },
  {
    name: "STAI-S",
    instructions:
      "STAI-STATE: Some statements that people have used to describe their feelings are given below. Read each statement and then tick the response option that indicate how you feel right now, that is, at this moment. Do not spend too much time on any one statement, but give the answer which seems to describe your present feelings best.",
    questions: [
      {
        q: "1. I feel calm.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "2. I feel secure.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "3. I am tense.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "4. I feel regretful.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "5. I feel at ease.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "6. I feel upset.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "7. I am currently worried about possible misfortunes.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "8. I feel rested.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "9. I feel anxious.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "10. I feel comfortable.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "11. I feel self-confident.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "12. I feel nervous.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "13. I am jittery.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "14. I feel high-strung.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "15. I am relaxed.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "16. I feel content.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "17. I am worried.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "18. I feel overexcited and rattled.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "19. I feel joyful.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "20. I feel fine.",
        options: ["Not at all", "Somewhat", "Moderately", "Very much"],
        scores: [1, 2, 3, 4],
      },
    ],
  },
  {
    name: "STAI-T",
    instructions:
      "STAI-TRAIT: Some statements that people have used to describe their feelings are given below. Read each statement and then tick the response option that indicate how you generally feel. There are no right or wrong answers. Do not spend too much time on a single statement, but give the answer that comes closest to how you generally feel.",
    questions: [
      {
        q: "1. I feel fine.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "2. I tire quickly.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "3. I feel like crying.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "4. I wish I could be as happy as others seem to be.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "5. I am losing opportunities because I cannot make decisions fast.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "6. I feel rested.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "7. I am calm.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "8. I feel that difficulties are piling up in such a way that I cannot overcome them.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "9. I worry too much about things that do not really matter.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "10. I am happy.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "11. I am inclined to take things hard.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "12. I lack self-confidence.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "13. I feel secure.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "14. I try to avoid facing a crisis or difficulty.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "15. I feel blue.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "16. I am content.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "17. Some unimportant thoughts run through my mind and bother me.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "18. I take disappointments so keenly that I cannot get them out of my mind.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "19. I am a steady person.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "20. I become tense and upset when I think about my current concerns.",
        options: ["Almost Never", "Sometimes", "Often", "Almost Always"],
        scores: [1, 2, 3, 4],
      },
    ],
  },
  {
    name: "BFI",
    instructions:
      "BFI: How well do the following statements describe your personality?",
    questions: [
      {
        q: "1. I see myself as someone who is reserved",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Extraversion",
      },
      {
        q: "2. I see myself as someone who is generally trusting",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Agreeableness",
      },
      {
        q: "3. I see myself as someone who does a thorough job",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Conscientiousness",
      },
      {
        q: "4. I see myself as someone who is relaxed, handles stress well",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Neuroticism",
      },
      {
        q: "5. I see myself as someone who has an active imagination",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Openness",
      },
      {
        q: "6. I see myself as someone who is outgoing, sociable",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Extraversion",
      },
      {
        q: "7. I see myself as someone who tends to find fault with others",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Agreeableness",
      },
      {
        q: "8. I see myself as someone who tends to be lazy",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Conscientiousness",
      },
      {
        q: "9. I see myself as someone who gets nervous easily",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Neuroticism",
      },
      {
        q: "10. I see myself as someone who has few artistic interests",
        options: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Openness",
      },
    ],
  },
  {
    name: "FQ",
    instructions:
      "FQ: Choose a number from the scale below to show how much you would avoid each of the situations listed below because of fear or other unpleasant feelings.",
    questions: [
      {
        q: "1. Main phobia you want treated (agoraphobia)",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "MainPhobia",
      },
      {
        q: "2. Injections or minor surgery",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "3. Eating or drinking with other people",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "4. Hospitals",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "5. Traveling alone or by bus",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "6. Walking alone in busy streets",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "7. Being watched or stared at",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "8. Going into crowded shops",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "9. Talking to people in authority",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "10. Sight of blood",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "11. Being criticized",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "12. Going alone far from home",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "13. Thought of injury or illness",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "14. Speaking or acting to an audience",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "15. Large open spaces",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "16. Going to the dentist",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "17. Other situations (i don't have anything else to share)",
        options: [
          "0 - would not avoid it",
          "1",
          "2 - slightly avoid it",
          "3",
          "4 - definitely avoid it",
          "5",
          "6 - markedly avoid it",
          "7",
          "8 - always avoid it",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        q: "18. How would you rate the present state of your phobic symptoms on the scale below?",
        options: [
          "0 - no phobias present",
          "1",
          "2 - slightly disturbing/not really disabling",
          "3",
          "4 - definitely disturbing/disabling",
          "5",
          "6 - markedly disturbing/disabling",
          "7",
          "8 - very severely disturbing/disabling",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "GlobalPhobiaRating",
      },
      {
        q: "19. Feeling miserable or depressed",
        options: [
          "0 - hardly at all",
          "1",
          "2 - slightly troublesome",
          "3",
          "4 - definitely troublesome",
          "5",
          "6 - markedly troublesome",
          "7",
          "8 - very severely troublesome",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "20. Feeling irritable or angry",
        options: [
          "0 - hardly at all",
          "1",
          "2 - slightly troublesome",
          "3",
          "4 - definitely troublesome",
          "5",
          "6 - markedly troublesome",
          "7",
          "8 - very severely troublesome",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "21. Feeling tense or panicky",
        options: [
          "0 - hardly at all",
          "1",
          "2 - slightly troublesome",
          "3",
          "4 - definitely troublesome",
          "5",
          "6 - markedly troublesome",
          "7",
          "8 - very severely troublesome",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "22. Upsetting thoughts coming into your head",
        options: [
          "0 - hardly at all",
          "1",
          "2 - slightly troublesome",
          "3",
          "4 - definitely troublesome",
          "5",
          "6 - markedly troublesome",
          "7",
          "8 - very severely troublesome",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "23. Feeling you or your surroundings are strange or unreal",
        options: [
          "0 - hardly at all",
          "1",
          "2 - slightly troublesome",
          "3",
          "4 - definitely troublesome",
          "5",
          "6 - markedly troublesome",
          "7",
          "8 - very severely troublesome",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "24. Other feelings (nothing)",
        options: [
          "0 - hardly at all",
          "1",
          "2 - slightly troublesome",
          "3",
          "4 - definitely troublesome",
          "5",
          "6 - markedly troublesome",
          "7",
          "8 - very severely troublesome",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
    ],
  },
];

// Count total questions
tests.forEach((test) => {
  totalQuestions += test.questions.length;
});

$(document).ready(function () {
  // Start or move to next question
  $("#nextBtn").on("click", function () {
    if ($(this).text() === "Start") {
      // Mark overall test start
      testStartTime = new Date();
      // Load first test
      loadTest(tests[currentTestIndex]);
      $(this).text("Next");
    } else {
      // Record answer before moving on
      if (!recordAnswer()) {
        alert("Please answer the question to proceed.");
        return;
      }
      // Check if more questions remain in current test
      if (currentQuestionIndex < tests[currentTestIndex].questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(tests[currentTestIndex].questions[currentQuestionIndex]);
      } else if (currentTestIndex < tests.length - 1) {
        // Move to next test
        currentTestIndex++;
        currentQuestionIndex = 0;
        loadTest(tests[currentTestIndex]);
      } else {
        // All tests done
        $(this).addClass("hidden");
        $("#downloadResults").removeClass("hidden");
      }
    }
  });

  // Download CSV and PDF
  $("#downloadResults").on("click", function () {
    generateCSV();
    generatePDF();
  });
});

function loadTest(test) {
  let instructionText = test.instructions
    ? `<div class="instruction">${test.instructions}</div>`
    : "";
  $("#instruction-area").html(instructionText);

  loadQuestion(test.questions[0]);
}

function loadQuestion(question) {
  questionStartTime = new Date();

  let content = `<p class="question">${question.q}</p>`;
  question.options.forEach((option, idx) => {
    content += `
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="question${currentTestIndex}_${currentQuestionIndex}"
          id="option${idx}"
          value="${question.scores[idx]}"
        />
        <label class="form-check-label" for="option${idx}">
          ${option}
        </label>
      </div>
    `;
  });

  $("#test-area").html(content);
  updateProgressBar();
}

function recordAnswer() {
  const selectedOption = $(
    `input[name="question${currentTestIndex}_${currentQuestionIndex}"]:checked`
  );
  if (selectedOption.length === 0) {
    return false; // No answer
  }

  const duration = (new Date() - questionStartTime) / 1000; // seconds

  answers.push({
    test: tests[currentTestIndex].name,
    question: tests[currentTestIndex].questions[currentQuestionIndex].q,
    answer: selectedOption.next("label").text(),
    score: parseInt(selectedOption.val(), 10),
    time: duration,
    questionStartTime: questionStartTime.toISOString(),
    answerTime: new Date().toISOString(),
  });

  return true;
}

function updateProgressBar() {
  const answeredSoFar =
    tests.slice(0, currentTestIndex).reduce((acc, t) => acc + t.questions.length, 0) +
    currentQuestionIndex +
    1;
  const progress = (answeredSoFar / totalQuestions) * 100;
  $(".progress-bar")
    .css("width", progress + "%")
    .attr("aria-valuenow", progress);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let yPos = 10;

  const summaryScores = calculateSummaryScores();
  doc.text("Summary Scores:", 10, yPos);
  yPos += 6;

  Object.entries(summaryScores).forEach(([testName, score]) => {
    if (typeof score === "object") {
      doc.text(`${testName} Score:`, 10, yPos);
      yPos += 6;
      Object.entries(score).forEach(([subCategory, subScore]) => {
        doc.text(`- ${subCategory}: ${subScore}`, 10, yPos);
        yPos += 6;
      });
    } else {
      doc.text(`${testName} Score: ${score}`, 10, yPos);
      yPos += 6;
    }
  });

  yPos += 10;
  doc.text("Detailed Responses:", 10, yPos);
  yPos += 10;

  answers.forEach((answer) => {
    if (yPos > 280) {
      doc.addPage();
      yPos = 10;
    }
    doc.text(`Test: ${answer.test}`, 10, yPos);
    doc.text(`Question: ${answer.question}`, 10, yPos + 6);
    doc.text(`Answer: ${answer.answer}`, 10, yPos + 12);
    doc.text(`Score: ${answer.score}`, 10, yPos + 18);
    doc.text(`Time: ${answer.time}s`, 10, yPos + 24);
    doc.text(`Question Start Time: ${answer.questionStartTime}`, 10, yPos + 30);
    doc.text(`Answer Time: ${answer.answerTime}`, 10, yPos + 36);
    yPos += 42;
  });

  doc.save("Psychometric_Test_Results.pdf");
}

function generateCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Test,Question,Answer,Score,Time(s),Question Start Time,Answer Time\n";

  answers.forEach((answer) => {
    const questionText = answer.question.replace(/,/g, ";");
    const answerText = answer.answer.replace(/,/g, ";");
    csvContent += `${answer.test},${questionText},${answerText},${answer.score},${answer.time},${answer.questionStartTime},${answer.answerTime}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "Psychometric_Test_Results.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function calculateSummaryScores() {
  const scores = {};

  // HADS indexing
  const HADS_Anxiety_Questions = [1, 3, 5, 7, 9, 11, 13];
  const HADS_Depression_Questions = [2, 4, 6, 8, 10, 12, 14];

  // BFI indexing
  const BFI_Traits = {
    Openness: [5, 10],
    Conscientiousness: [3, 8],
    Extraversion: [1, 6],
    Agreeableness: [2, 7],
    Neuroticism: [4, 9],
  };

  // FQ indexing
  const FQ_Categories = {
    MainPhobia: [1],
    TotalPhobia: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    Agoraphobia: [5, 6, 8, 12, 15],
    BloodInjuryPhobia: [2, 4, 10, 13, 16],
    SocialPhobia: [3, 7, 9, 11, 14],
    GlobalPhobiaRating: [18],
    AnxietyDepression: [19, 20, 21, 22, 23, 24],
  };

  // Iterate over each test
  tests.forEach((test) => {
    scores[test.name] = {};

    if (test.name === "HADS") {
      let anxietyScore = 0;
      let depressionScore = 0;
      const hadsAnswers = answers.filter((ans) => ans.test === test.name);

      hadsAnswers.forEach((ans, idx) => {
        const questionNumber = idx + 1; // 1-based
        if (HADS_Anxiety_Questions.includes(questionNumber)) {
          anxietyScore += ans.score;
        }
        if (HADS_Depression_Questions.includes(questionNumber)) {
          depressionScore += ans.score;
        }
      });
      scores[test.name].Anxiety = anxietyScore;
      scores[test.name].Depression = depressionScore;
    } else if (test.name === "BFI") {
      // Initialize traits
      Object.keys(BFI_Traits).forEach((trait) => {
        scores[test.name][trait] = 0;
      });
      const bfiAnswers = answers.filter((ans) => ans.test === test.name);

      bfiAnswers.forEach((ans, idx) => {
        const questionNumber = idx + 1;
        Object.keys(BFI_Traits).forEach((trait) => {
          if (BFI_Traits[trait].includes(questionNumber)) {
            scores[test.name][trait] += ans.score;
          }
        });
      });
    } else if (test.name === "FQ") {
      // Initialize categories
      Object.keys(FQ_Categories).forEach((cat) => {
        scores[test.name][cat] = 0;
      });
      const fqAnswers = answers.filter((ans) => ans.test === test.name);

      fqAnswers.forEach((ans, idx) => {
        const questionNumber = idx + 1;
        Object.keys(FQ_Categories).forEach((cat) => {
          if (FQ_Categories[cat].includes(questionNumber)) {
            scores[test.name][cat] += ans.score;
          }
        });
      });
    } else {
      // STAI-S or STAI-T
      const testAnswers = answers.filter((ans) => ans.test === test.name);
      const total = testAnswers.reduce((acc, ans) => acc + ans.score, 0);
      scores[test.name] = total;
    }
  });

  return scores;
}