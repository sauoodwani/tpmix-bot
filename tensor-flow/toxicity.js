require("@tensorflow/tfjs-node");
const toxicity = require("@tensorflow-models/toxicity");

//TensorFlow toxicity
toxicity
  .load(threshold)
  .then((model) => {
    model.classify(msg.content).then((results) => {
      results.forEach((result) => {
        if (result.label === "toxicity" && result.results[0].match) {
          // console.log("toxic");
          // console.log(result.results[0].probabilities);
          msg.channel.send("TensorFlowJS AI model detected toxicity.");
        }
      });
    });
  })
  .catch((err) => console.error(err));
