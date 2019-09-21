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

        price += (coverageAmount / product.cost.costDivisor) * product.cost.price
      }

      var newPrice = employerContribution(dollarsOff, product, price)

      return formatPrice(newPrice)
    case 'ltd':
      var salaryPercentage = product.coveragePercentage / 100

      price += ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price

      var discountPrice = employerContribution(dollarsOff, product, price)

      return formatPrice(discountPrice)
    default:
      return 0
  }
}
