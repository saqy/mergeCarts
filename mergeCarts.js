function merge(cartOne, cartTwo) {
  let result = JSON.parse(JSON.stringify(cartOne))

  function mergeLineItems(lineItem1, lineItem2) {
    lineItem1.quantity += lineItem2.quantity

    lineItem2.shippingDetails.forEach((shippingDetail2) => {
      let shippingAddress2 = cartTwo.addresses.find(
        (address) => address.key === shippingDetail2.addressKey,
      )

      let shippingAddress1 = result.addresses.find(
        (address) => address.key === shippingDetail2.addressKey,
      )

      let shippingDetail1 = lineItem1.shippingDetails.find(
        (d) => d.addressKey === shippingAddress1?.key,
      )

      if (
        shippingAddress1 &&
        shippingAddress2 &&
        shippingAddress1.streetName === shippingAddress2.streetName
      ) {
        mergeShippingDetails(shippingDetail1, shippingDetail2)
      } else {
        addNewShippingDetail(lineItem1, shippingDetail2, shippingAddress2)
      }
    })
  }

  function mergeShippingDetails(shippingDetail1, shippingDetail2) {
    shippingDetail1.quantity += shippingDetail2.quantity
  }

  function addNewShippingDetail(lineItem, shippingDetail, shippingAddress) {
    const highestAddressKey = Math.max(
      ...result.addresses.map((address) => address.key),
    )
    lineItem.shippingDetails.push({
      ...shippingDetail,
      addressKey: highestAddressKey + 1,
    })
    result.addresses.push({
      ...shippingAddress,
      key: highestAddressKey + 1,
    })
  }

  // Merge line items with matching product keys
  cartTwo.lineItems.forEach((lineItem2) => {
    let lineItem1 = result.lineItems.find(
      (lineItem) => lineItem.productKey === lineItem2.productKey,
    )

    if (lineItem1) {
      mergeLineItems(lineItem1, lineItem2)
    }
  })

  // Merge line items with non matching product keys
  cartTwo.lineItems.forEach((lineItem2) => {
    let lineItem1 = result.lineItems.find(
      (lineItem) => lineItem.productKey === lineItem2.productKey,
    )

    if (!lineItem1) {
      let newLineItem = { ...lineItem2 }
      newLineItem.shippingDetails = newLineItem.shippingDetails.map(
        (shippingDetail) => {
          let shippingAddress = cartTwo.addresses.find(
            (address) => address.key === shippingDetail?.addressKey,
          )
          let newAddress = result.addresses.find(
            (address) => address.streetName === shippingAddress.streetName,
          )
          return {
            ...shippingDetail,
            addressKey: newAddress.key,
          }
        },
      )
      result.lineItems.push(newLineItem)
    }
  })

  return result
}

module.exports = {
  merge,
}
