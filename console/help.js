const prettyLog = () => {
  // 判断是否为生产环境，只有生产环境才可以使用这个美化打印的方法
  // const isProduction = import.meta.env.MODE === "production";

  // 判断是否为空
  const isEmpty = (value) => {
    return value === undefined || value === null || value === "";
  };

  const prettyPrint = (title, text, color) => {
    // if (isProduction) return;
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      "background:transparent"
    );
  };

  // 基础信息
  const info = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "info" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#909399");
  };
  // 错误信息
  const error = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Error" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#F56C6C");
  };
  // 警告信息
  const warning = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Warning" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#E6A23C");
  };
  // 成功信息
  const success = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Success " : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#67C23A");
  };

  // 图片
  // url 可以传支持 base64 格式的图片
  const picture = (url, scale = 1) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // 如果图片是 url 链接，则必须开启了跨域访问
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = canvas.toDataURL("image/png");
        console.log(
          `%c sup?`,
          `font-size: 1px;
          padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor(
            (img.width * scale) / 2
          )}px;
          background-image: url(${dataUri});
          background-repeat: no-repeat;
          background-size: ${img.width * scale}px ${img.height * scale}px;
          color: transparent;
          `
        );
      }
    };
    img.src = url;
  };

  // 表格（table）
  const printObject = () => {
    const table = [
      { id: 1, name: "zhangsan", age: 17 },
      { id: 2, name: "lisi", age: 20 },
      { id: 3, name: "wangwu", age: 35 },
    ];
    console.log(
      "%c id %c name %c age",
      "color: white; background-color: black; padding: 2px 10px;",
      "color: white; background-color: black; padding: 2px 10px;",
      "color: white; background-color: black; padding: 2px 10px;"
    );
    table.forEach((item) => {
      console.log(
        `%c ${item.id} %c ${item.name} %c ${item.age}`,
        "color: black; background-color: lightgray; padding: 2px 10px;",
        "color: black; background-color: lightgray; padding: 2px 10px;",
        "color: black; background-color: lightgray; padding: 2px 10px;"
      );
    });
  };
  return {
    info,
    error,
    warning,
    success,
    picture,
    printObject,
  };
};

const log = prettyLog();
log.info("基础信息");
log.warning("警告信息", "你心情不好，要不要休息一下");
log.error("错误信息", "变得更加抑郁和焦虑了");
log.success("成功信息", "保持健康心态很重要");
log.picture(
  "https://youimg1.c-ctrip.com/target/0100g1200086ns69oB566_D_10000_1200.jpg?proc=autoorient"
);
log.printObject();
