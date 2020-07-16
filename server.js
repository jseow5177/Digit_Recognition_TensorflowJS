const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node');

const IMAGE_SIZE = 28

const app = express();
const CURRENT_DIR = process.cwd();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    return res.status(200).sendFile(__dirname + '/index.html');
});

app.post('/predict', async (req, res, next) => {
    try {
        const inputData = req.body.data;
        const tensorData = tf.tensor(inputData, shape = [1, IMAGE_SIZE, IMAGE_SIZE, 1]);

        const model = await tf.loadLayersModel(`file://${CURRENT_DIR}/model/model.json`);

        const tensorResult = model.predict(tensorData);
        const data = await tensorResult.data();
        const arrayResult = Array.from(data);

        const prediction = arrayResult.indexOf(Math.max(...arrayResult));

        return res.status(200).json({ prediction: prediction });
    } catch (err) {
        return res.status(500).json({
            error: 'Something went wrong. Please try again.'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});
