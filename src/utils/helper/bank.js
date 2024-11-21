
let bankMap = {};


const mapBanksToId = (banks) => {

  banks.forEach(bank => {

    bankMap[bank.name] = bank.id;
  });
}


const  getBankMap = () => {
  return bankMap;
}



export default {mapBanksToId,getBankMap};
