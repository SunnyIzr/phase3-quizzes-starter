# quizzes

## This app exposes an API for a simple quiz appication.

## APIs

### Get Quizzes

#### Request

```
GET /quizzes.json
```

#### Response

```json
{
  quizzes: [
    {
      id: 1,
      name: "Random Stuff"
    },
    {
      id: 2,
      name: "Javascript Questions"
    }
  ]
}
```

### Get Next Question

#### Request

```
GET /quizzes/1.json
```

#### Response

```json
{
  id: 1,
  question: "Did your mom go to college?",
  choices: {
    a: "Yes",
    b: "No"
  }
}
```
... or, if it isn't multiple choice ...

```json
{
  id: 2,
  question: "What time is it?"
}
```

### Submit Answer

#### Request

```
POST /questions/1/answers
```

#### Request Data

```json
{ id: 1, answer: "a" }
```

... or ...

```json
{ id: 2, answer: "3pm" }
```

#### Response

```json
{
  id: 1,
  more_questions: true, // if false, display complete message
  correct: true,
  submitted_answer: "a",
  correct_answer: "a",
  num_correct: 2,
  num_incorrect: 3
}
```