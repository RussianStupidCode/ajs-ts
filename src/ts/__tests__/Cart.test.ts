import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Phone from '../domain/Phone';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('add movie', () => {
  const cart = new Cart();
  const movie = new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100);

  cart.add(movie);

  expect(cart.items.length).toBe(1);

  const actualMovie = cart.items[0];
  expect(actualMovie).toEqual({
    item: {
      id: 0,
      isMany: false,
      year: 2017,
      name: 'avengers',
      country: 'USA',
      genres: ['Epic', 'Adventure'],
      duration: 137,
      tagline: 'empty',
      price: 100,
    },
    count: 1,
  });
});

test('add exist goods', () => {
  const cart = new Cart();
  const movie = new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100);

  cart.add(movie);
  cart.add(movie);
  cart.add(movie);
  expect(cart.items.length).toBe(1);
});

const TOTAL_COST_DATA = [
  {
    items: [
      new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100),
      new Phone(1, 'nokia', 1000),
      new Phone(1, 'nokia', 1000),
      new Phone(1, 'nokia', 1000),
    ],
    discount: 50,
    totalCost: 1550, 
  },
  {
    items: [
      new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100),
      new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100),
      new Phone(1, 'nokia', 1000),
      new Phone(1, 'nokia', 1000),
      new Phone(1, 'nokia', 1000),
    ],
    discount: 50,
    totalCost: 1550, 
  },
  {
    items: [
      new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100),
      new Phone(1, 'nokia', 1000),
      new Phone(1, 'nokia', 1000),
      new Phone(1, 'nokia', 1000),
    ],
    discount: 30,
    totalCost: 2170, 
  },
];

const handlerTotalCost = test.each(TOTAL_COST_DATA);

handlerTotalCost ('test total cost', ({items, discount, totalCost}) => {
  const cart = new Cart();
  items.forEach((item) => cart.add(item));

  const actualCost = cart.getTotalCost(discount);
  expect(actualCost).toBeCloseTo(totalCost);
});

test('total cost default discount', () => {
  const cart = new Cart();
  const movie = new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100);
  const phone = new Phone(1, 'nokia', 1000);

  cart.add(movie);
  cart.add(phone);

  const actualCost = cart.getTotalCost();
  expect(actualCost).toBeCloseTo(1100);
});

test('remove items', () => {
  const cart = new Cart();
  const movie = new Movie(0, 2017, 'avengers', 'USA', ['Epic', 'Adventure'], 137, 'empty', 100);
  const phone = new Phone(1, 'nokia', 1000);
  const noExistPhone = new Phone(22, 'iphone', 1000);
  cart.add(movie, 2);
  cart.add(phone);
  cart.add(phone, 10);

  cart.remove(movie.id);
  cart.remove(phone.id);
  cart.remove(noExistPhone.id);

  expect(cart.items).toEqual([]);
});
