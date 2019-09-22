function volLifePrice(coverageAmount, product, price) {
  price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  return price
}

function ltdPrice(employee, salaryPercentage, product, price) {
  price += ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price
  return price
}
function employerContribution(dollarsOff, product, price) {
  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }
  return price
}
function formatPrice(price) {
  return parseInt(price * 100) / 100
}
module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var price = 0
  var dollarsOff = 0
  switch (product.type) {
    case 'volLife':
      for (var i = 0; i < coverageLevels.length; i++) {
        var coverageAmount = coverageLevels[i].coverage

        price = volLifePrice(coverageAmount, product, price)
      }

      var newPrice = employerContribution(dollarsOff, product, price)

      return formatPrice(newPrice)
    case 'ltd':
      var salaryPercentage = product.coveragePercentage / 100

      price = ltdPrice(employee, salaryPercentage, product, price)

      var discountPrice = employerContribution(dollarsOff, product, price)

      return formatPrice(discountPrice)
    default:
      return 0
  }
}
