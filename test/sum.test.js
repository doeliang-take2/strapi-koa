const sum = require('./sum');


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });

  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });


  // const fs = require('fs');
  const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");
  jest.setTimeout(15000)
  beforeAll(async () => {
    await setupStrapi();
  });
  
  afterAll(async () => {
    await cleanupStrapi();
  });
  
  it("strapi is defined", () => {
    expect(strapi).toBeDefined();
  });
  
  require('./hello');
  require('./user');


  