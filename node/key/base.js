const fs = require("fs");
const crypto = require("crypto");

// 常用 hash 算法（MD5、SHA-1、SHA-256、SHA-512）
function calculateHash(algorithm, data) {
  const hash = crypto.createHash(algorithm);
  hash.update(data);
  return hash.digest("base64");
}
// 在基础的 hash 算法上，用随机数“增强”的哈希算法
function calculateHmacHash(algorithm, data, key) {
  const hmac = crypto.createHmac(algorithm, key);
  hmac.update(data);
  return hmac.digest("base64");
}
// console.log(calculateHash("md5", "5435"));
// console.log(calculateHmacHash("sha256", "5435", "secret-key"));

// AES 对称加密算法，加密和解密都使用同一个密钥
// AES有很多不同的算法，除了密钥外还可以指定IV（Initial Vector），
// 加密结果通常有两种表示方法：hex和base64，这些功能Node.js全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。如果无法正确解密，要确认双方是否遵循同样的AES算法，密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。
/**
 * 密钥算法：aes192，aes-128-ecb，aes-256-cbc等
 * iv（Initial Vector）：不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。
 */
class AES {
  constructor(key, iv) {
    this.key = "Passw0rdPassw0rdPassw0rdPassw0rd"; // key的长度必须为32bytes
    this.iv = "a1b2c3d4e5f6g7h8"; // iv的长度必须为16bytes
  }
  aes_encrypt(data) {
    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  aes_decrypt(encrypted) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
const aes = new AES();
const encrypted = aes.aes_encrypt("hello world"); // 加密
// console.log(encrypted);
// console.log(aes.aes_decrypt(encrypted)); // 解密

// DH 算法是一种密钥交换协议：它可以让双方在不泄漏密钥的情况下协商出一个密钥来
// DH 算法基于数学原理，需要先选择一个素数、一个底数和一个秘密的整数
let ming = crypto.createDiffieHellman(512);
let ming_keys = ming.generateKeys();

let prime = ming.getPrime();
let generator = ming.getGenerator();

// console.log("Prime: " + prime.toString("hex"));
// console.log("Generator: " + generator.toString("hex"));

// xiaohong's keys:
let hong = crypto.createDiffieHellman(prime, generator);
let hong_keys = hong.generateKeys();

// exchange and generate secret:
let ming_secret = ming.computeSecret(hong_keys);
let hong_secret = hong.computeSecret(ming_keys);

// print secret:
// console.log("Secret of Xiao Ming: " + ming_secret.toString("hex"));
// console.log("Secret of Xiao Hong: " + hong_secret.toString("hex"));

// RSA 非对称加密算法：由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者通过公钥加密，私钥解密。其中，公钥可以公开，私钥必须保密。
// 实际上，RSA并不适合加密大数据，而是先生成一个随机的AES密码，用AES加密原始信息，然后用RSA加密AES口令，这样，实际使用RSA时，给对方传的密文分两部分，一部分是AES加密的密文，另一部分是RSA加密的AES口令。对方用RSA先解密出AES口令，再用AES解密密文，即可获得明文。
// 补充：在 windows 底下需要下载 openssl
// 从文件加载key:
function loadKey(file) {
  // key实际上就是PEM编码的字符串:
  return fs.readFileSync(file, "utf8");
}

let prvKey = loadKey("./rsa-prv.pem"),
  pubKey = loadKey("./rsa-pub.pem"),
  message = "Hello, world!";

// 使用私钥加密:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, "utf8"));
console.log(enc_by_prv.toString("hex"));

let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log(dec_by_pub.toString("utf8"));
