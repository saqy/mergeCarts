const { merge } = require('./mergeCarts')

describe('merge()', () => {
  it('should correctly merge two carts with common line items', () => {
    const cartOne = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
      ],
    }

    const cartTwo = {
      id: 2,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '301 Irving Rd',
        },
      ],
    }

    const expectedResult = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 4,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 2,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
            {
              addressKey: 3,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
        {
          key: 3,
          streetName: '301 Irving Rd',
        },
      ],
    }

    const result = merge(cartOne, cartTwo)
    expect(result).toEqual(expectedResult)
  })

  it('should correctly merge two carts with common line items and non-matching shipping addresses', () => {
    const cartOne = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
      ],
    }

    const cartTwo = {
      id: 2,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 3,
              quantity: 1,
            },
            {
              addressKey: 4,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 3,
          streetName: '301 Irving Rd',
        },
        {
          key: 4,
          streetName: '401 Irving Rd',
        },
      ],
    }

    const expectedResult = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 4,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
            {
              addressKey: 3,
              quantity: 1,
            },
            {
              addressKey: 4,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
        {
          key: 3,
          streetName: '301 Irving Rd',
        },
        {
          key: 4,
          streetName: '401 Irving Rd',
        },
      ],
    }

    const result = merge(cartOne, cartTwo)
    expect(result).toEqual(expectedResult)
  })

  it('should correctly merge two carts with no common line items and matching shipping addresses', () => {
    const cartOne = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
      ],
    }

    const cartTwo = {
      id: 2,
      lineItems: [
        {
          productKey: '4567-01',
          quantity: 3,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 2,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
      ],
    }

    const expectedResult = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
        {
          productKey: '4567-01',
          quantity: 3,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 2,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
      ],
    }

    const result = merge(cartOne, cartTwo)
    expect(result).toEqual(expectedResult)
  })

  it('should correctly merge two empty carts', () => {
    const cartOne = { id: 1, lineItems: [], addresses: [] }
    const cartTwo = { id: 2, lineItems: [], addresses: [] }
    const expectedResult = { id: 1, lineItems: [], addresses: [] }

    const result = merge(cartOne, cartTwo)
    expect(result).toEqual(expectedResult)
  })

  it('should correclt merge two carts with matching and non-matching line items', () => {
    const cartOne = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 2,
              quantity: 1,
            },
            {
              addressKey: 1,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
      ],
    }

    const cartTwo = {
      id: 2,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
        {
          productKey: '4493-25',
          quantity: 1,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '501 Irving Rd',
        },
        {
          key: 2,
          streetName: '301 Irving Rd',
        },
      ],
    }

    const expectedResult = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 4,
          shippingDetails: [
            {
              addressKey: 2,
              quantity: 1,
            },
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 3,
              quantity: 1,
            },
            {
              addressKey: 4,
              quantity: 1,
            },
          ],
        },
        {
          productKey: '4493-25',
          quantity: 1,
          shippingDetails: [
            {
              addressKey: 3,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 3,
          streetName: '501 Irving Rd',
        },
        {
          key: 4,
          streetName: '301 Irving Rd',
        },
      ],
    }

    const result = merge(cartOne, cartTwo)
    expect(result).toEqual(expectedResult)
  })
  it('should correclt merge two carts with matching and non-matching line items with different order of matching and non matching items', () => {
    const cartOne = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 2,
              quantity: 1,
            },
            {
              addressKey: 1,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
      ],
    }

    const cartTwo = {
      id: 2,
      lineItems: [
        {
          productKey: '4493-25',
          quantity: 1,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
          ],
        },
        {
          productKey: '5493-01',
          quantity: 2,
          shippingDetails: [
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 2,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 1,
          streetName: '501 Irving Rd',
        },
        {
          key: 2,
          streetName: '301 Irving Rd',
        },
      ],
    }

    const expectedResult = {
      id: 1,
      lineItems: [
        {
          productKey: '5493-01',
          quantity: 4,
          shippingDetails: [
            {
              addressKey: 2,
              quantity: 1,
            },
            {
              addressKey: 1,
              quantity: 1,
            },
            {
              addressKey: 3,
              quantity: 1,
            },
            {
              addressKey: 4,
              quantity: 1,
            },
          ],
        },
        {
          productKey: '4493-25',
          quantity: 1,
          shippingDetails: [
            {
              addressKey: 3,
              quantity: 1,
            },
          ],
        },
      ],
      addresses: [
        {
          key: 2,
          streetName: '201 Irving Rd',
        },
        {
          key: 1,
          streetName: '101 Irving Rd',
        },
        {
          key: 3,
          streetName: '501 Irving Rd',
        },
        {
          key: 4,
          streetName: '301 Irving Rd',
        },
      ],
    }

    const result = merge(cartOne, cartTwo)
    expect(result).toEqual(expectedResult)
  })
})
