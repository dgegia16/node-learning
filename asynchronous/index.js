const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) rej("I could not find that file");
      res(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, data, (err) => {
      if (err) rej("Could not write file");
      res("success");
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-image.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved");
  })
  .catch((err) => {
    console.log(err.message);
  });