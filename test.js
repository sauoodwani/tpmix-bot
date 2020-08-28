require("@tensorflow/tfjs-node");
const toxicity = require("@tensorflow-models/toxicity");
// require("@tensorflow/tfjs-backend-wasm");
const { threshold } = require("./config/config");

const sentence = ["nice man"];
console.log(threshold);

toxicity
  .load(threshold)
  .then((model) => {
    model.classify(sentence).then((results) => {
      results.forEach((result) => {
        console.log(result.results);
      });
    });
  })
  .catch((err) => console.error(err));
