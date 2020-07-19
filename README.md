# MERN Social

A digit recognition web app that is supported by a convolutional neural network trained with Tensorflow.

## Project Demo
![App demo](/app-demo.gif)

## Get started
`git clone` https://github.com/jseow5177/Digit_Recognition_TensorflowJS.git
<br/>
<br/>
`npm start`

## Project structure
1. The `public` folder contains the main page `index.html` and its stylings in `styles.css`. `index.js` handles the interactivity of the main page, which mainly consists of canvas logic.
2. The `model` folder contains `Digit-CNN.ipynb` which is a Google Colab notebook responsible for the training of a convolutional neural network. Note that the training of the model is minimal without sophisticated hyperparameter tuning and other deep learning techniques.
3. The `.bin` file and `model.json` are the results of saving the trained model. The `.json` file will be loaded into the server to perform prediction when the `/predict` REST endpoint is hit.
4. `server.js` is a minimal Node server that handles two routes, the main page at `/` and the prediction endpoint at `/predict`.

## Tech Stacks
<ul>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>Tensorflow and Tensorflow.js</li>
    </ul>
  </li>
  <li>Frontend
    <ul>
      <li>HTML5, CSS3, JavaScript</li>
    </ul>
  </li>
</ul>

## Remarks

The purpose of this mini project is not to demonstrate my knowledge in neural networks and deep learning, but to get myself started on exploring the potential of building web interfaces powered by artificial intelligence.
