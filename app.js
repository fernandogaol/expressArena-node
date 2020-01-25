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

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;

  if (!numbers) {
    return res.status(400).send('numbers is required');
  }

  const isNum = parseFloat(numbers);

  if (Number.isNaN(isNum)) {
    return res.status(400).send('numbers must be a number');
  }

  res.send(numbers);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
