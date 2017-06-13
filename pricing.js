
class PricingEquation {
  constructor(minSQI,maxSQI,minPPS,maxPPS, flex) {
    let ast = maxPPS

    let pFlex = (maxSQI-minSQI) * flex

    let x1 = minSQI
    let x2 = maxSQI - pFlex

    let y1 = minPPS
    let y2 = ast + .004

    this.pricingThreshold = x2
    this.minBound = x1
    this.maxBound = maxSQI

    let a
    let b

    let y3 = (y2 - ast)/(y1- ast)
    let x3 = x2-x1


    if(x3 > 0) {
      b = Math.pow(y3, 1/x3)
    }

    a = (y2 + (ast * -1))/Math.pow(b,x2)

    this.eqString = `y = ${a} * ${b}^x + ${ast}`

    this.eq = {a,b,ast}

  }

  toString(){
    return this.eqString
  }

  getPrice(sqi){
    if(sqi < this.minBound || sqi > this.maxBound){
      throw new Error("Out of Range")
    }
    return ((this.eq.a * Math.pow(this.eq.b,sqi)) + this.eq.ast)
  }
}

function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}
