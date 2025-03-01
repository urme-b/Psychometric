let currentTestIndex = 0;
let currentQuestionIndex = 0;
let totalQuestions = 0;
let answers = [];
let testStartTime, questionStartTime;

const tests = [
  {
    name: "HADS",
    instructions:
      "HADS: Lisez chaque question et cochez la réponse qui exprime le mieux ce que vous avez éprouvé au cours de la semaine qui vient de s’écouler. Ne vous attardez pas sur la réponse à faire : votre réaction immédiate à chaque question fournira probablement une meilleure indication de ce que vous éprouvez, qu’une réponse longuement méditée.",
    questions: [
      {
        q: "1. Je me sens tendu ou énervé",
        options: [
          "3 - la plupart du temps",
          "2 - souvent",
          "1 - de temps en temps",
          "0 - jamais",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "2. Je prends plaisir aux mêmes choses qu’autrefois",
        options: [
          "0 - oui, tout autant",
          "1 - pas autant",
          "2 - un peu seulement",
          "3 - presque plus",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "3. J’ai une sensation de peur comme si quelque chose d’horrible allait m’arriver",
        options: [
          "3 - oui, très nettement",
          "2 - oui, mais ce n’est pas grave",
          "1 - un peu, mais cela ne m’inquiète pas",
          "0 - pas du tout",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "4. Je ris facilement et vois le bon côté des choses",
        options: [
          "0 - autant que par le passé",
          "1 - pas autant qu'avant",
          "2 - vraiment moins qu'avant",
          "3 - plus du tout",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "5. Je me fais du souci",
        options: [
          "3 - Très souvent",
          "2 - Assez souvent",
          "1 - Occasionnellement",
          "0 - Très occasionnellement",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "6. Je suis de bonne humeur",
        options: [
          "3 - Jamais",
          "2 - Rarement",
          "1 - Assez souvent",
          "0 - La plupart du temps",
        ],
        scores: [3, 2, 1, 0],
        category: "Depression",
      },
      {
        q: "7. Je peux rester tranquillement assis(e) à ne rien faire et me sentir décontracté(e)",
        options: [
          "0 - Oui, quoi qu’il arrive",
          "1 - Oui, en général",
          "2 - Rarement",
          "3 - Jamais",
        ],
        scores: [0, 1, 2, 3],
        category: "Anxiety",
      },
      {
        q: "8. J’ai l’impression de fonctionner au ralenti",
        options: [
          "3 - Presque toujours",
          "2 - Très souvent",
          "1 - Parfois",
          "0 - Jamais",
        ],
        scores: [3, 2, 1, 0],
        category: "Depression",
      },
      {
        q: "9. J’éprouve des sensations de peur et j’ai l’estomac noué",
        options: [
          "0 - Jamais",
          "1 - Parfois",
          "2 - Assez souvent",
          "3 - Très souvent",
        ],
        scores: [0, 1, 2, 3],
        category: "Anxiety",
      },
      {
        q: "10. Je ne m’intéresse plus à mon apparence",
        options: [
          "3 - Plus du tout",
          "2 - Je n’y accorde pas autant d’attention que je devrais",
          "1 - Il se peut que je n’y fasse plus autant attention",
          "0 - J’y prête autant d’attention que par le passé",
        ],
        scores: [3, 2, 1, 0],
        category: "Depression",
      },
      {
        q: "11. J’ai la bougeotte et n’arrive pas à tenir en place",
        options: [
          "3 - Oui, c’est tout à fait le cas",
          "2 - Un peu",
          "1 - Pas tellement",
          "0 - Pas du tout",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "12. Je me réjouis d’avance à l’idée de faire certaines choses",
        options: [
          "0 - Autant qu’avant",
          "1 - Un peu moins qu’avant",
          "2 - Bien moins qu’avant",
          "3 - Presque jamais",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
      {
        q: "13. J’éprouve des sensations soudaines de panique",
        options: [
          "3 - Vraiment très souvent",
          "2 - Assez souvent",
          "1 - Pas très souvent",
          "0 - Jamais",
        ],
        scores: [3, 2, 1, 0],
        category: "Anxiety",
      },
      {
        q: "14. Je peux prendre plaisir à un bon livre ou à une bonne émission de radio ou de télévision",
        options: [
          "0 - Souvent",
          "1 - Parfois",
          "2 - Rarement",
          "3 - Très rarement",
        ],
        scores: [0, 1, 2, 3],
        category: "Depression",
      },
    ],
  },
  {
    name: "STAI-S",
    instructions:
      "STAI-STATE: Certains énoncés que les gens utilisent pour décrire leurs sentiments sont donnés ci-dessous. Lisez chaque énoncé et cochez l'option de réponse qui indique comment vous vous sentez en ce moment. Ne passez pas trop de temps sur chaque énoncé, mais donnez la réponse qui semble décrire le mieux ce que vous ressentez actuellement.",
    questions: [
      {
        q: "1. Je me sens calme.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "2. Je me sens en sécurité.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "3. Je suis tendu(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "4. Je me sens surmené(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "5. Je me sens tranquille.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "6. Je me sens ému(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "7. Je m'inquiète à l'idée de malheurs possibles.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "8. Je me sens comblé(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "9. Je me sens effrayé(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "10. Je me sens bien à l’aise.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "11. Je me sens sûr(e) de moi.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "12. Je me sens nerveux(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "13. Je suis agité(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "14. Je me sens indécis(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "15. Je suis détendu(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "16. Je me sens satisfait(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "17. Je suis inquiet(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "18. Je me sens troublé(e).",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "19. Je sens que j’ai les nerfs solides.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "20. Je me sens dans de bonnes dispositions.",
        options: ["Pas du tout", "Un peu", "Modérément", "Beaucoup"],
        scores: [1, 2, 3, 4],
      },
    ],
  },
  {
    name: "STAI-T",
    instructions:
      "STAI-TRAIT: Certains énoncés que les gens utilisent pour décrire leurs sentiments sont donnés ci-dessous. Lisez chaque énoncé et cochez l'option de réponse qui indique comment vous vous sentez en général. Il n'existe ni bonnes ni mauvaises réponses. Ne passez pas trop de temps sur chaque énoncé, mais donnez la réponse qui semble décrire le mieux ce que vous ressentez généralement.",
    questions: [
      {
        q: "1. Je me sens dans de bonnes dispositions.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [1, 2, 3, 4],
      },
      {
        q: "2. Je me sens nerveux(se) et agité(e).",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "3. Je me sens content(e) de moi-même.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "4. Je voudrais être aussi heureux(se) que les autres semblent l'être.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "5. J'ai l'impression d'être un(e) raté(e).",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "6. Je me sens reposé(e).",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "7. Je suis d'un grand calme.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "8. Je sens que les difficultés s'accumulent au point où je n'arrive pas à les surmonter.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "9. Je m'en fais trop pour des choses qui n'en valent pas vraiment la peine.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "10. Je suis heureux(se).",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "11. J'ai des pensées troublantes.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "12. Je manque de confiance en moi.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "13. Je me sens en sécurité.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "14. Prendre des décisions m'est facile.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "15. Je sens que je ne suis pas à la hauteur de la situation.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "16. Je suis satisfait(e).",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "17. Des idées sans importance me passent par la tête et me tracassent.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "18. Je prends les déceptions tellement à cœur que je n'arrive pas à les chasser de mon esprit.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "19. Je suis une personne qui a les nerfs solides.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
      {
        q: "20. Je deviens tendu(e) ou bouleversé(e) quand je songe à mes préoccupations et à mes intérêts récents.",
        options: ["Presque jamais", "Parfois", "Souvent", "Presque toujours"],
        scores: [4, 3, 2, 1],
      },
    ],
  },
  {
    name: "BFI",
    instructions: "BFI: Comment les déclarations suivantes décrivent-elles votre personnalité?",
    questions: [
      {
        q: "1. Je me vois comme quelqu'un qui est réservé",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Extraversion",
      },
      {
        q: "2. Je me vois comme quelqu'un qui fait généralement confiance aux autres",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [5, 4, 3, 2, 1],
        trait: "Agreeableness",
      },
      {
        q: "3. Je me vois comme quelqu'un qui travaille consciencieusement",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Conscientiousness",
      },
      {
        q: "4. Je me vois comme quelqu'un qui est 'relax', détendu et gère bien le stress",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Neuroticism",
      },
      {
        q: "5. Je me vois comme quelqu'un qui a une grande imagination",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Openness",
      },
      {
        q: "6. Je me vois comme quelqu'un qui est sociable, extraverti",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [5, 4, 3, 2, 1],
        trait: "Extraversion",
      },
      {
        q: "7. Je me vois comme quelqu'un qui a tendance à critiquer les autres",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Agreeableness",
      },
      {
        q: "8. Je me vois comme quelqu'un qui a tendance à être paresseux",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [5, 4, 3, 2, 1],
        trait: "Conscientiousness",
      },
      {
        q: "9. Je me vois comme quelqu'un qui est facilement anxieux",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [1, 2, 3, 4, 5],
        trait: "Neuroticism",
      },
      {
        q: "10. Je me vois comme quelqu'un qui est peu intéressé par tout ce qui est artistique",
        options: [
          "Approuve fortement",
          "Approuve un peu",
          "N'approuve ni ne désapprouve",
          "Désapprouve un peu",
          "Désapprouve fortement",
        ],
        scores: [5, 4, 3, 2, 1],
        trait: "Openness",
      },
    ],
  },
  {
    name: "FQ",
    instructions:
      "FQ: Veuillez choisir un chiffre dans l’échelle ci-dessous: il permet de chiffrer à quel point vous évitez par peur (ou du fait de sensation ou sentiments désagréables) chacune des situations énumérées ci-dessous.",
    questions: [
      {
        q: "1. Principale phobie que vous voulez traiter (décrivez-la à votre façon puis cotez-la de 0 à 8).",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "MainPhobia",
      },
      {
        q: "2. Injections et interventions chirurgicales minimes.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "3. Manger et boire avec les autres.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "4. Aller dans les hôpitaux.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "5. Faire seul(e) des trajets en bus ou en car.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "6. Se promener seul(e) dans des rues où il y a foule.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "7. Être regardé(e) ou dévisagé(e).",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "8. Aller dans des magasins remplis de monde.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "9. Parler à des supérieurs hiérarchiques ou à toute personne exerçant une autorité.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "10. Voir du sang.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "11. Être critiqué(e).",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "12. Partir seul(e) loin de chez vous.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "13. Penser que vous pouvez être blessé(e) ou malade.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "14. Parler ou agir en public.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "SocialPhobia",
      },
      {
        q: "15. Les grands espaces vides.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "Agoraphobia",
      },
      {
        q: "16. Aller chez le dentiste.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "BloodInjuryPhobia",
      },
      {
        q: "17. Toute autre situation qui vous fait peur et que vous évitez (décrivez-la puis cotez-la de 0 à 8).",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        q: "18. Sentiment d’être malheureux ou déprimé.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "19. Sentiment d’être irritable ou en colère.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "20. Se sentir tendu ou paniqué",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "21. Avoir l’esprit tendu ou paniqué.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "22. Sentir que vous ou votre environnement (choses personnes) sont irréels ou étrangers.",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "23. Autres sentiments pénibles (décrivez-les) :",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "AnxietyDepression",
      },
      {
        q: "24. À combien évaluez-vous actuellement la gêne que représente dans votre vie votre comportement phobique? Veuillez entourer un chiffre dans l’échelle ci-dessous et le reporter dans cette case:",
        options: [
          "0 - n'évite pas",
          "1",
          "2 - évite un peu",
          "3",
          "4 - évite souvent",
          "5",
          "6 - évite très souvent",
          "7",
          "8 - évite toujours",
        ],
        scores: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        category: "GlobalPhobiaRating",
      },
    ],
  },
];

// Count total questions
tests.forEach((test) => {
  totalQuestions += test.questions.length;
});

function generateCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Test,Question,Answer,Score,Time(s),Question Start Time,Answer Time\n";

  answers.forEach((answer) => {
    // Replace commas in question/answer text to avoid CSV column breaks
    const row = [
      answer.test,
      answer.question.replace(/,/g, ";"),
      answer.answer.replace(/,/g, ";"),
      answer.score,
      answer.time,
      answer.questionStartTime,
      answer.answerTime,
    ].join(",");
    csvContent += row + "\n";
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

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let yPos = 10;

  // 1) Summary Scores
  const summaryScores = calculateSummaryScores();
  doc.text("Summary Scores:", 10, yPos);
  yPos += 6;

  Object.entries(summaryScores).forEach(([testName, score]) => {
    if (typeof score === "object") {
      doc.text(`${testName} Score:`, 10, yPos);
      yPos += 6;
      Object.entries(score).forEach(([subCat, subScore]) => {
        doc.text(`- ${subCat}: ${subScore}`, 10, yPos);
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

  // 2) Detailed Answers
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

function calculateSummaryScores() {
  const scores = {};

  // HADS question index sets
  const HADS_Anxiety_Questions = [1, 3, 5, 7, 9, 11, 13];
  const HADS_Depression_Questions = [2, 4, 6, 8, 10, 12, 14];

  // BFI question index sets
  const BFI_Traits = {
    Openness: [5, 10],
    Conscientiousness: [3, 8],
    Extraversion: [1, 6],
    Agreeableness: [2, 7],
    Neuroticism: [4, 9],
  };

  // FQ question index sets
  const FQ_Categories = {
    MainPhobia: [1],
    TotalPhobia: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    Agoraphobia: [5, 6, 8, 12, 15],
    BloodInjuryPhobia: [2, 4, 10, 13, 16],
    SocialPhobia: [3, 7, 9, 11, 14],
    GlobalPhobiaRating: [18],
    AnxietyDepression: [19, 20, 21, 22, 23, 24],
  };

  tests.forEach((test) => {
    const testAnswers = answers.filter((ans) => ans.test === test.name);

    // HADS => separate anxiety/depression scores
    if (test.name === "HADS") {
      let anxietyScore = 0;
      let depressionScore = 0;
      testAnswers.forEach((ans, idx) => {
        const questionNumber = idx + 1;
        if (HADS_Anxiety_Questions.includes(questionNumber)) {
          anxietyScore += ans.score;
        }
        if (HADS_Depression_Questions.includes(questionNumber)) {
          depressionScore += ans.score;
        }
      });
      scores[test.name] = {
        Anxiety: anxietyScore,
        Depression: depressionScore,
      };
    }

    // BFI => sum by trait
    else if (test.name === "BFI") {
      scores[test.name] = {};
      Object.keys(BFI_Traits).forEach((trait) => {
        scores[test.name][trait] = 0;
      });
      testAnswers.forEach((ans, idx) => {
        const questionNumber = idx + 1;
        Object.keys(BFI_Traits).forEach((trait) => {
          if (BFI_Traits[trait].includes(questionNumber)) {
            scores[test.name][trait] += ans.score;
          }
        });
      });
    }

    // FQ => sum by category
    else if (test.name === "FQ") {
      scores[test.name] = {};
      Object.keys(FQ_Categories).forEach((cat) => {
        scores[test.name][cat] = 0;
      });
      testAnswers.forEach((ans, idx) => {
        const questionNumber = idx + 1;
        Object.keys(FQ_Categories).forEach((cat) => {
          if (FQ_Categories[cat].includes(questionNumber)) {
            scores[test.name][cat] += ans.score;
          }
        });
      });
    }

    // STAI-S or STAI-T => total sum
    else {
      const sum = testAnswers.reduce((acc, val) => acc + val.score, 0);
      scores[test.name] = sum;
    }
  });

  return scores;
}

$(document).ready(function () {
  $("#nextBtn").on("click", function () {
    if ($(this).text() === "Start") {
      testStartTime = new Date();
      loadTest(tests[currentTestIndex]);
      $(this).text("Next");
    } else {
      if (!recordAnswer()) {
        alert("Please answer the question to proceed.");
        return;
      }
      // Move to next question or next test
      if (currentQuestionIndex < tests[currentTestIndex].questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(tests[currentTestIndex].questions[currentQuestionIndex]);
      } else if (currentTestIndex < tests.length - 1) {
        currentTestIndex++;
        currentQuestionIndex = 0;
        loadTest(tests[currentTestIndex]);
      } else {
        // End of all tests
        $(this).addClass("hidden");
        $("#downloadResults").removeClass("hidden");
      }
    }
  });

  $("#downloadResults").on("click", function () {
    generateCSV();
    generatePDF();
  });
});

function loadTest(test) {
  const instructionText = test.instructions
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
    return false;
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
  const questionsDone =
    tests.slice(0, currentTestIndex).reduce((acc, t) => acc + t.questions.length, 0) +
    currentQuestionIndex +
    1;

  const progress = (questionsDone / totalQuestions) * 100;
  $(".progress-bar").css("width", progress + "%").attr("aria-valuenow", progress);
}