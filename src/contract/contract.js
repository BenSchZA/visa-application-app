import store from '../store'

class Contract {

  web3 = store.getters.web3;

  VISA_APPLICTION_CONTRACT = undefined;
  CONTRACT_ADDRESS = undefined;

  constructor(name, id, birthDate) {
    // let fs = require('fs');
    // let contractAbiFile = "contract.abi";
    // let abi = JSON.parse(fs.readFileSync(contractAbiFile));
    let abi = [ { "constant": true, "inputs": [], "name": "application", "outputs": [ { "name": "destination", "type": "bytes32" }, { "name": "arrivalDate", "type": "uint256" }, { "name": "departureDate", "type": "uint256" }, { "name": "submitted", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "submit", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "applicant", "outputs": [ { "name": "addr", "type": "address" }, { "name": "name", "type": "bytes32" }, { "name": "id", "type": "uint256" }, { "name": "birthDate", "type": "uint256" }, { "name": "applied", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "destination", "type": "bytes32" }, { "name": "arrivalDate", "type": "uint256" }, { "name": "departureDate", "type": "uint256" } ], "name": "apply", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "name", "type": "bytes32" }, { "name": "id", "type": "uint256" }, { "name": "birthDate", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "Updating", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "Applying", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "Applied", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" } ], "name": "Submitted", "type": "event" } ];

    this.VISA_APPLICTION_CONTRACT = new this.web3.eth.Contract(abi);

    store.commit('showSnackbar', {text: 'Deploying contract', action: 'Okay'});

    let self = this;
    this.web3.eth.getAccounts().then(function (accounts) {
      self.VISA_APPLICTION_CONTRACT.deploy({
        data: '0x608060405234801561001057600080fd5b506040516060806108c88339810180604052810190808051906020019092919080519060200190929190805190602001909291905050506000600102836000191614158015610060575060008214155b801561006d575060008114155b1515610107576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f506c6561736520737570706c7920616c6c20706572736f6e616c20646574616981526020017f6c732e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b336000800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260006001018160001916905550816000600201819055508060006003018190555050505061074a8061017e6000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806326e4ca82146100675780635bcb2fc6146100b357806388e687ea146100e25780639eea2c7d14610161575b600080fd5b34801561007357600080fd5b5061007c6101be565b6040518085600019166000191681526020018481526020018381526020018215151515815260200194505050505060405180910390f35b3480156100bf57600080fd5b506100c86101e9565b604051808215151515815260200191505060405180910390f35b3480156100ee57600080fd5b506100f7610429565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018560001916600019168152602001848152602001838152602001821515151581526020019550505050505060405180910390f35b34801561016d57600080fd5b506101a46004803603810190808035600019169060200190929190803590602001909291908035906020019092919050505061047a565b604051808215151515815260200191505060405180910390f35b60058060000154908060010154908060020154908060030160009054906101000a900460ff16905084565b60003373ffffffffffffffffffffffffffffffffffffffff166000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561024657fe5b600060040160009054906101000a900460ff1615156102f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001807f4170706c7920666f722076697361206170706c69636174696f6e20666972737481526020017f2e0000000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600560030160009054906101000a900460ff161515156103a1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f56697361206170706c69636174696f6e20616c7265616479207375626d69747481526020017f65642e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b7f1ed657d5540dc57b6181fb8e1b90fa1620897560baf17d1646f17d12ff256cb733604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16001600560030160006101000a81548160ff0219169083151502179055506001905090565b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040160009054906101000a900460ff16905085565b60003373ffffffffffffffffffffffffffffffffffffffff166000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156104d757fe5b600560030160009054906101000a900460ff16151515610585576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001807f56697361206170706c69636174696f6e20616c7265616479207375626d69747481526020017f65642e000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b60011515600060040160009054906101000a900460ff161515141561060c577fca11c3ed479ab868b0a7ec6dc02af29de9105a9afd710836210c93a376108caa33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1610670565b7f8c3edaffd9fe7aa204527d05e2e71e3f071e6758a6c5e9c1c652943cf2dcee4933604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b836005600001816000191690555082600560010181905550816005600201819055507f83f970044e0c4e2d8a4922431cb57df4cd6dc71f67b619eb184d105e3b6d917a33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16001600060040160006101000a81548160ff0219169083151502179055506001905093925050505600a165627a7a7230582001ece377e0da5fc594c3c4b38fe87a15e3c996ed61d0063a958f47bef20383ec0029',
        arguments: [self.web3.utils.fromAscii(name), id, birthDate]
      })
        .send({
          from: accounts[0],
          gas: 4700000,
          // gasPrice: '30000000000000'
        }, function(error, transactionHash){})
        .on('error', console.error)
        .on('transactionHash', function(transactionHash){console.log(transactionHash)})
        .on('receipt', function(receipt){
          console.log(receipt.contractAddress)
        })
        .on('confirmation', function(confirmationNumber, receipt){console.log(confirmationNumber)})
        .then(function(newContractInstance){
          console.log(newContractInstance.options.address);
          self.CONTRACT_ADDRESS = newContractInstance.options.address;

          store.commit('showSnackbar', {text: 'Contract deployed', action: 'Okay'});
        });
    });
  }

  apply(destination, arrivalDate, departureDate) {
    store.commit('showSnackbar', {text: 'Entering visa details', action: 'Okay'});

    let self = this;
    this.web3.eth.getAccounts().then(function (accounts) {
      self.VISA_APPLICTION_CONTRACT.methods.apply(self.web3.utils.fromAscii(destination), arrivalDate, departureDate)
        .send({
          from: accounts[0]
        }, function (error, transactionHash) {
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
        })
        .on('receipt', function (receipt) {
          console.log(receipt)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log(confirmationNumber)
        })
        .on('error', console.error)
        .then(function (newContractInstance) {
          store.commit('showSnackbar', {text: 'Entered visa details', action: 'Okay'});
        });
    })
  }

  submit() {
    store.commit('showSnackbar', {text: 'Submitting visa application', action: 'Okay'});

    let self = this;
    this.web3.eth.getAccounts().then(function (accounts) {
      self.VISA_APPLICTION_CONTRACT.methods.VISA_APPLICTION_CONTRACT.methods.submit()
        .send({
          from: accounts[0]
        }, function (error, transactionHash) {
        })
        .on('transactionHash', function (hash) {
          console.log(hash)
        })
        .on('receipt', function (receipt) {
          console.log(receipt)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log(confirmationNumber)
        })
        .on('error', console.error)
        .then(function (newContractInstance) {
          store.commit('showSnackbar', {text: 'Submitted visa application', action: 'Okay'});
        });
    })
  }
}

export default Contract;
