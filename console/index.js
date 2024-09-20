console.log("hello word"); // 输出一般信息
console.info("你好"); // 输出信息，与 console.log 类似，但在某些浏览器中可能有不同的样式
console.warn("warning"); // 输出警告信息，通常会以黄色背景或带有警告图标的样式显示
console.error("fdsa"); // 输出错误信息，通常会以红色背景或带有错误图标的样式显示
const table = {
  name: "zhangsan",
  age: 29,
  sex: "男",
};
console.table(table); // 以表格形式输出数据，适用于数组和对象

/**
 * console.log()
 * params：接受任何类型的参数，包括字符串、数字、布尔值、对象、数组、函数等。支持占位符!
 */
/**
 * 常见的占位符：
 * %s：字符串占位符
 * %d 或 %i：数字（整数）占位符
 * %f：浮点数
 * %o：对象占位符
 * %c：css 样式占位符
 */

const name = "Bob";
const age = 30;
console.log(`Name: %s, Age: %d`, name, age); // 按照入参顺序
console.log(`%c CSS`, "color: red;font-size:20px"); // 按照入参顺序
