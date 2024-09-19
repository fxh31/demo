// 该方法事件点击事件消耗较大，它是同步操作，如果复制/粘贴大量数据，页面会出现卡顿。它只能将选中的内容复制到剪贴板，无法向剪贴板任意写入内容。
// (废弃)
const textarea = document.createElement("textarea");
const input = document.querySelector("#text");
const btnCopy = document.querySelector("#btn-copy");
btnCopy.addEventListener("click", () => {
  textarea.value = input.value;
  document.body.appendChild(textarea);

  // 选中 textarea/input 的内容（只能借助textarea/input实现，textarea/input才有select方法）
  textarea.select();
  // textarea.setSelectionRange(0, 99999); // 对于移动设备

  try {
    // 执行复制操作
    document.execCommand("copy");
    // document.execCommand("cut"); // 剪切操作
    alert("Text copied to clipboard!");
  } catch (err) {
    console.error("Unable to copy", err);
  }

  // 清理
  document.body.removeChild(textarea);
});

const textareaPaste = document.querySelector("#result");
const btnPaste = document.querySelector("#btn-paste");
btnPaste.addEventListener("click", () => {
  const value = textarea.value;
  textareaPaste.value = value;
});
