const crypto = require("crypto");

function calculateHash(data, algorithm) {
  const hash = crypto.createHash(algorithm);
  hash.update(data);
  return hash.digest("base64");
}

function getKey(ssid) {
  try {
    const str =
      ssid +
      calculateHash(
        "\ud83d\udc85\ud83d\udc5f\ud83c\udf14\ud83c\udfbd\ud83d\udc66",
        "md5"
      );
    return calculateHash(str, "sha512");
  } catch (e) {
    throw new Error("Error generating key：" + e.message);
  }
}

document.getElementById("generate-btn").addEventListener("click", generateKey);
function generateKey() {
  const ssid = document.getElementById("input-ssid").value;

  const key = getKey(ssid);

  document.getElementById("output-key").innerText = key;
}
