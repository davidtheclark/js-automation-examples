import isString from './isString';
import notNamedDixileta from './notNamedDixileta';

const horse = {
  name: 'Susan',
  age: 7
};

console.log(horse);
console.log(`horse's name is a string: ${isString(horse.name)}`);
console.log(`horse's age is a string: ${isString(horse.age)}`);
console.log(`horse's name is not Dixileta: ${notNamedDixileta(horse.age)}`);
