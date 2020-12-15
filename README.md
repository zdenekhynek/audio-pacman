# TensorFlow.js Example: Transfer Learning to play Pacman via Microphone

This example shows you how to control a game using voice command.

## Requirements

- node
- npm

## Install Dependencies

```
npm i
```

## Train your own model

Go to https://teachablemachine.withgoogle.com/train/audio/ and train model with the following classes:

- Background noise
- Up
- Down
- Left
- Right

Download your model as a zip file and unzip it to `dist/my_model` directory.

## Test your model and play the game

```
npm run build
```
