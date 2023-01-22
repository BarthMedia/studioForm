const hello = require('./hello')

/* Cool testing scripts */

test('properly says hello to an array of arguments', () => {
    expect( hello('Leon', 'Juan', 'Max', 'Julia') ).toBe('Hello Leon, Juan, Max & Julia!')
})

test('properly says hello to 2 arguments', () => {
    expect( hello('Leon', 'Jules') ).toBe('Hello Leon & Jules!')
})

test('properly says hello to 1 argument', () => {
    expect( hello('Max') ).toBe('Hello Max!')
})

test('properly says hello to no arguments', () => {
    expect( hello() ).toBe('Hello, world!')
})