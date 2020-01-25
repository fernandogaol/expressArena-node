const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

// app.get('/burgers', (req, res) => {
//   res.send('We have juicy cheese burgers!');
// });
// app.get('/pizza/pepperoni', (req, res) => {
//   res.send('Your pizza is on the way!');
// });
// app.get('/pizza/pineapple', (req, res) => {
//   res.send("We don't serve that here. Never call again!");
// });

app.get('/sum', (req, res) => {
  const { a, b } = req.query;

  if (!a) {
    return res.status(400).send('a is required');
  }
  if (!b) {
    return res.status(400).send('b is required');
  }
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return res.status(400).send('a must be a number');
  }
  const c = numA + numB;

  const output = `The sum of ${numA} and ${numB} is ${c}`;

  res.status(200).send(output);
});

app.get('/cipher', (req, res) => {
  let text = req.query.text;
  let shift = req.query.shift;
  let result = '';

  let start = 65;
  let end = 90;

  if (!text) {
    return res.status(400).send('please provide some text');
  }
  if (!shift) {
    return res.status(400).send('please provide a number');
  }

  const numShift = parseFloat(shift);

  if (Number.isNaN(numShift)) {
    return res.status(400).send('shift must be a number');
  }
  shift = parseInt(shift);
  text = text.toUpperCase();

  for (let i = 0; i < text.length; i++) {
    if (text[i].charCodeAt(0) < start || text[i].charCodeAt(0) > end) {
      result += text[i];
    } else {
      let position = text[i].charCodeAt() - start;
      position = position + shift;
      position = position % 26;
      result += String.fromCharCode(position + start);
    }
  }
  res.send(result);
});

// app.get('/lotto', (req, res) => {
//   const { numbers } = req.query;

//   if (!numbers) {
//     return res.status(400).send('numbers is required');
//   }
//   if (!Array.isArray(numbers)) {
//     return res.status(400).send('numbers must be an array');
//   }

//   const guesses = numbers.map(n =>
//     parseInt(n).filter(n => !Number.isNaN(n) && n >= 1 && n <= 20)
//   );

//   if (guesses.length != 6) {
//     return res
//       .status(400)
//       .send('numbers must contain 6 integers between 1 and 20');
//   }

//   const stockNumbers = Array(20)
//     .fill(1)
//     .map((_, i) => i + 1);

//   const winningNumbers = [];

//   for (let i = 0; i < 6; i++) {
//     const ran = Math.floor(Math.random() * stockNumbers.length);
//     winningNumbers.push(stockNumbers[ran]);
//     stockNumbers.splice(ran, 1);
//   }

//   let compareGuesses = winningNumbers.filter(n => !guesses(n));

//   let resultText;

//   switch (compareGuesses.length) {
//     case 0:
//       resultText = 'Wow! Unbelievable! You could have won the mega millions!';
//       break;
//     case 1:
//       resultText = 'Congratulations! You win $100!';
//       break;
//     case 2:
//       resultText = 'Congratulations, you win a free ticket!';
//       break;
//     default:
//       resultText = 'Sorry, you lose';
//   }

//   res.send(resultText);
// });
app.get('/lotto', (req, res) => {
  const { numbers } = req.query;

  // validation:
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if (!numbers) {
    return res.status(400).send('numbers is required');
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).send('numbers must be an array');
  }

  const guesses = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && n >= 1 && n <= 20);

  if (guesses.length != 6) {
    return res
      .status(400)
      .send('numbers must contain 6 integers between 1 and 20');
  }

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20)
    .fill(1)
    .map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch (diff.length) {
    case 0:
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';
  }

  // uncomment below to see how the results ran

  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });

  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
