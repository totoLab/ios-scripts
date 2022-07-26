// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: dollar-sign;
// share-sheet-inputs: file-url;

const requests = importModule("requests");
const lib = importModule("libIOS");

function chooseAddress(addresses) {
	wallets = [];
	for (const [walletName, address] of Object.entries(addresses)) {
    	wallets.push(walletName);
	};

	chosenWalletPos = 0; // default personal wallet
	// chosenWalletPos = await lib.menuIOS(wallets); 
	return addresses[wallets[chosenWalletPos]];
}

function getWalletInfo(address) { // TODO figure out requests    
    // const request = new Request(url)
  	// const response = await request.loadJSON()
	return address; // dummy return value
}

function getAddressesFromJson() {
	let secretsPath = "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/btcSecrects.js";
	let src = "icloud";
	let addresses = lib.cleanAndreadJsonFrom(secretsPath, src);
	return addresses;
}

function main(url, addresses) {
	let addr = chooseAddress(addresses);
	let info = getWalletInfo(url + addr);
	lib.showAndCopyOnIOS(info);
}

let url = "https://blockchain.info/rawaddr/";
main(url, getAddressesFromJson());

