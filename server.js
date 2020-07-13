const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node');

console.log(tf);


const app = express();
const CURRENT_DIR = process.cwd();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/predict', async (req, res, next) => {
    const model = await tf.loadLayersModel(`${CURRENT_DIR}/model/model.json`);
    console.log(model);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})
