const { max } = require("moment");
const Web3 = require("web3");
const web3 = new Web3("https://ethereum.publicnode.com");
function sleep(ts) {
  return new Promise((resolve) => setTimeout(resolve, ts));
}

//这里写私钥
const privateKey =
  "";
const number = 10;
const Max = 21000;
const Min = 1;
const sleepTime=1000

let arrlist = [];

//发送交易
async function sendTry(tx, privateKey) {

  try {
    var signed = await web3.eth.accounts.signTransaction(tx, privateKey);

    var tran = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    return tran;
  } catch (error) {
    console.log(error);
  }
}
//生成范围随机数
const randomNumber = (max, min) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  let nonce = await web3.eth.getTransactionCount(account);
  const gasPrice =
    (await web3.eth.getGasPrice()) * 1 + web3.utils.toWei("2", "gwei") * 1 + "";

  for (let i = 0; i < number; i++) {

    let randomAdd = randomNumber(Max, Min);
    if (arrlist.includes(randomAdd)) {
      continue;
    }
    // 这里改成你要打的JSON数据
    const dataString = `data:,{"p":"erc-20","op":"mint","tick":"eths","id":"${randomAdd}","amt":"1000"}`;

    const dataHex = Buffer.from(dataString, "utf8").toString("hex");

    const tx = {
      gas: "26000",
      gasPrice,
      to: account,
      data: dataHex,
      nonce: nonce++,
    };
    console.log(tx);
    await sendTry(tx, privateKey);
    await sleep(sleepTime)
  }

}

main();
