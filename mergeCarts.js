function merge(cartOne, cartTwo) {
  let result = JSON.parse(JSON.stringify(cartOne));

  function mergeLineItems(lineItem1, lineItem2) {
    lineItem1.quantity += lineItem2.quantity;

    lineItem2.shippingDetails.forEach((shippingDetail2, index2) => {
      let shippingAddress2 = cartTwo.addresses.find(address => address.key === shippingDetail2.addressKey);
      let shippingDetail1 = lineItem1.shippingDetails[index2];
      let shippingAddress1 = result.addresses.find(address => address.key === (shippingDetail1?.addressKey ?? 0));

      if (shippingAddress1 && shippingAddress2 && shippingAddress1.streetName === shippingAddress2.streetName) {
        mergeShippingDetails(shippingDetail1, shippingDetail2);
      } else {
        addNewShippingDetail(lineItem1, shippingDetail2, shippingAddress2);
      }
    });
  }

  function mergeShippingDetails(shippingDetail1, shippingDetail2) {
    shippingDetail1.quantity += shippingDetail2.quantity;
  }

  function addNewShippingDetail(lineItem, shippingDetail, shippingAddress) {
    const highestAddressKey = Math.max(...result.addresses.map(address => address.key));
    lineItem.shippingDetails.push({
      ...shippingDetail,
      addressKey: highestAddressKey + 1
    });
    result.addresses.push({
      ...shippingAddress,
      key: highestAddressKey + 1
    });
  }

  cartTwo.lineItems.forEach(lineItem2 => {
    let lineItem1 = result.lineItems.find(lineItem => lineItem.productKey === lineItem2.productKey);

    if (lineItem1) {
      mergeLineItems(lineItem1, lineItem2);
    } else {
      result.lineItems.push({ ...lineItem2 });
    }
  });

  return result;
}


  

  module.exports = {
    merge
  };