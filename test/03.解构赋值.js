var obj = {
  name: '张三',
  age: 20,
  gender: '男'
}

var { name: username, age, gender } = obj;

console.log(username);
console.log(age);
console.log(gender);