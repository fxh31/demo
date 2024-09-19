// 异步操作，返回Promise对象，不会造成页面卡顿。并且可以将任意内容（比如图片）放入剪贴板。
// Chrome 浏览器规定只有 HTTPS 协议的页面才能使用这个 API。不过开发环境（localhost）允许使用非加密协议。
// 读取权限必须用户授予
const clipboardObj = navigator.clipboard;

const btnPaste = document.querySelector("#btn-paste");
btnPaste.addEventListener("click", async () => {
  // const text = document.querySelector("#text").value;
  // const content = await clipboardObj.readText(text);
  // console.log(content);
  // getClipboardText();
  getClipboardContents();
});

/**
 * 获取剪贴板内容
 */
// 获取剪贴板里面（复制或剪切操作）的文本数据
const textPaste = document.querySelector("#result-text");
// 需要获取用户的读取权限 readText
async function getClipboardText() {
  try {
    const text = await clipboardObj.readText(); // 返回一个Promise，里面为复制剪切板里的文本数据。
    textPaste.innerHTML = text;
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
  }
}
// 获取剪贴板里面（复制或剪切操作）的数据，可以是文本数据，也可以是二进制数据（比如图片）。该方法需要用户明确给予许可。read
const contentPaste = document.querySelector("#result-content");
async function getClipboardContents() {
  try {
    const clipboardItems = await clipboardObj.read(); // 返回一个Promise，一旦该对象的状态变为 resolved，就可以获得一个数组，每个数组成员都是 ClipboardItem 对象的实例。
    // console.log(clipboardItems);
    // clipboardItems 对象表示一个单独的剪切项，每个 ClipboardItem 对象都有 types 属性和 getType 方法。
    for (const clipboardItem of clipboardItems) {
      // clipboardItems.type 返回一个数组，里面的成员是该剪贴项可用的 MIME 类型.
      // 比如某个剪贴项可以用 HTML 格式粘贴，也可以用纯文本格式粘贴，那么它就有两个 MIME 类型（text / html和text / plain）。
      for (const type of clipboardItem.types) {
        // clipboardItems.getType(type) 返回一个 Promise，用于获取剪贴项中指定类型的数据。
        // 该方法接受剪贴项的 MIME 类型作为参数，返回该类型的数据，该参数是必需的，否则会报错。
        const blob = await clipboardItem.getType(type);
        // console.log(blob);
        console.log(URL.createObjectURL(blob));
      }
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}

/**
 * 写入剪切板
 */
const btnWrite = document.querySelector("#btn-write");
btnWrite.addEventListener("click", (e) => {
  // copyPageUrl();
  copyWriteContent();
});
// 将文本内容写入剪贴板。 writeText
// 不需要获取用户的读取权限。
async function copyPageUrl() {
  try {
    await clipboardObj.writeText(location.href);
    console.log("Page URL copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

// 将任意数据写入剪贴板。
async function copyWriteContent() {
  try {
    const imgURL = "https://dummyimage.com/300.png";
    const data = await fetch(imgURL);
    // console.log(data);
    const blob = await data.blob(); // 先转换为二进制数据 Blob 对象

    const text = new Blob(["Cute sleeping kitten"], { type: "text/plain" });
    const item = new ClipboardItem({
      // 将同一个剪贴项的多种格式的值，写入剪贴板（文本和二进制数据）
      "image/png": blob,
      "text/plain": text,
    });

    // await clipboardObj.write([
    //   new ClipboardItem({
    //     "image/png": blob, // 可能不同的浏览器对图片格式有限制
    //   }),
    // ]);
    await clipboardObj.write([item]); // 将同一个剪贴项的多种格式的值，写入剪贴板
    console.log("Image copied.");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

/**
 * copy 事件
 * 用户向剪贴板放入数据时触发（用户手动在页面上进行 Ctrl+c 操作）
 *
 * clipboardData 对象（剪切板数据）
 * - setData(type, data)：修改剪切板数据，需要指定数据类型
 * - getData(type)：获取剪切板数据，需要指定数据类型
 * - clearData(type)：清空剪切板数据，需要指定数据类型。如果不指定类型，将清除所有类型的数据
 * - items：剪切板数据列表（一个类数组对象），包含剪切板数据类型和数据（通常只有一个剪切项）
 */
document.addEventListener("copy", async (event) => {
  // changeCopy(event);
  event.preventDefault(); // 取消了剪贴板的默认操作
  await interceptAndReplace(event); // 由脚本接管复制操作
});
// 设置将复制的内容变为大写
function changeCopy(event) {
  const selection = document.getSelection();
  // console.log(selection);
  event.clipboardData.setData("text/plain", selection.toString().toUpperCase());
  // event.clipboardData.clearData();
}
// 拦截用户复制操作，并将指定的内容放入剪切板
async function interceptAndReplace(event) {
  try {
    console.log(event.clipboardData);
    const clipboardItems = [];
    if (event.clipboardData.items.length) {
      for (const item of event.clipboardData.items) {
        if (!item.type.startsWith("image/")) {
          continue;
        }
        clipboardItems.push(
          new ClipboardItem({
            [item.type]: item,
          })
        );
        console.log("Image copied.");
      }
    } else {
      // 文本要以二进制的形式输入进去
      const text = new Blob(["intercept operation"], { type: "text/plain" });
      clipboardItems.push(
        new ClipboardItem({
          "text/plain": text,
        })
      );
    }

    await clipboardObj.write(clipboardItems);
  } catch (err) {
    console.error(err.name, err.message);
  }
}
/**
 * cut 事件
 * 与 copy 事件类似，从 Event.clipboardData 拿到数据
 */

/**
 * paste 事件
 * 使用剪贴板数据，进行粘贴操作时，会触发 paste 事件（用户手动进行 Ctrl+v 操作）
 */
document.addEventListener("paste", async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText();
  console.log("Pasted text: ", text);
});
