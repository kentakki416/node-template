import * as express from 'express';

const app = express();

app.listen(8080, () => {
  console.log('Start!!')
})

app.get("/", (_, res) => {
  return res.send('Hello World');
});
