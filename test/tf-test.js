require("@tensorflow/tfjs-node");
const toxicity = require("@tensorflow-models/toxicity");
// require("@tensorflow/tfjs-backend-wasm");
const threshold = 0.8;

const sentence = ["this food sucks"];
console.log(threshold);

toxicity
  .load(threshold)
  .then((model) => {
    model.classify(sentence).then((results) => {
      results.forEach((result) => {
        if (result.label === "toxicity" && result.results[0].match) {
          console.log("toxic");
          console.log(result.results[0].probabilities);
        }
      });
    });
  })
  .catch((err) => console.error(err));
