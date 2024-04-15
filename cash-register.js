/* Challenge Page
https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register
*/
function checkCashRegister(price, cash, cid) {
  /*
      insufficient: cid < change due OR not enough change
      open: if can give back change and still have cid

      Find total cash in drawer
     */
  let totalDrawer = cid.reduce((prev, current) => prev + current[1], 0);
  let changeDue = cash - price;
  const changeDueArray = [];
  //round a number to 2 decimal points: https://codedamn.com/news/javascript/javascript-round-a-number-to-2-decimal-places-with-examples
  totalDrawer = Math.round((totalDrawer + Number.EPSILON) * 100) / 100;

  // insufficient: cid < change due OR not enough change
  if (totalDrawer < changeDue)
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  // closed: if can give back enough change but cid is 0
  else if (changeDue == totalDrawer) return { status: "CLOSED", change: cid };
  // open: There is enough change in drawer
  else {
    for (let i = cid.length - 1; i >= 0; i--) {
      //if current amount is >=current highest bill
      if (currencyAmount(cid[i][0]) <= changeDue) {
        let currentBill = currencyAmount(cid[i][0]);
        let amountInDrawer = cid[i][1];
        //How many bills of current bill can you use
        let highestBill = Math.floor(changeDue / currentBill);

        //check how many you have in the drawer
        //if have more than needed just subtract the amount and update change due
        if (highestBill * currentBill <= amountInDrawer) {
          changeDueArray.push([cid[i][0], highestBill * currentBill]);
          changeDue -= highestBill * currentBill;
          changeDue = Math.round((changeDue + Number.EPSILON) * 100) / 100;
          cid[i][1] -= cid[i][1];
        } else if (highestBill * currentBill > amountInDrawer) {
          changeDueArray.push([cid[i][0], cid[i][1]]);
          changeDue -= cid[i][1];
          changeDue = Math.round((changeDue + Number.EPSILON) * 100) / 100;
          // changeDue -= cid[i][1];
          cid[i][1] = 0;
        }
        //if not enough just subtract all availble change due
      }
    }
    if (changeDue > 0) return { status: "INSUFFICIENT_FUNDS", change: [] };
    return { status: "OPEN", change: changeDueArray };
  }
}

//convert bill name into number
function currencyAmount(currency) {
  switch (currency) {
    case "ONE HUNDRED":
      return 100;
    case "TWENTY":
      return 20;
    case "TEN":
      return 10;
    case "FIVE":
      return 5;
    case "ONE":
      return 1;
    case "QUARTER":
      return 0.25;
    case "DIME":
      return 0.1;
    case "NICKEL":
      return 0.05;
    case "PENNY":
      return 0.01;
  }
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
