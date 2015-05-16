import isString from './isString';
import notNamedDixileta from './notNamedDixileta';

const horse = {
  name: 'Susan',
  age: 7
};

console.log(
  horse,
  `horse's name is a string: ${isString(horse.name)}`,
  `horse's age is a string: ${isString(horse.age)}`,
  `horse's name is not Dixileta: ${notNamedDixileta(horse.age)}`
);
