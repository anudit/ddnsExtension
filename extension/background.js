(function() {
	'use strict';

	chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
		
		var mappingKey = 'anuditnagar.urlReRwrite';
		var mappings = JSON.parse(localStorage[mappingKey] || '[]');

		for (var i = 0; i < mappings.length; i++) {
			var mapping = mappings[i];
			if (details.url.indexOf(mapping.sourceUrl) == 0) {
				var newUrl = mapping.destinationUrl + details.url.slice(mapping.sourceUrl.length);
				// console.log('rewriting', details.url, 'to', newUrl);
				
				chrome.tabs.update(details.tabId, { url: newUrl })
				break;
			}
		}
	});
	
	chrome.webNavigation.onCompleted.addListener(function(details) {
		var web3;
		if (window.ethereum) {
			
        window.web3 = new Web3(ethereum);
        try {
             ethereum.enable();
        } catch (error) {
            console.log(error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/8f68025ea6a8425cb75ae44591a8b1b3"));
    }
	
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var DDNSContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"},{"name":"newIp","type":"bytes15"}],"name":"edit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"},{"name":"ip","type":"bytes15"}],"name":"register","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"}],"name":"renewDomainName","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"},{"name":"newOwner","type":"address"}],"name":"transferDomain","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"domainName","type":"bytes"},{"indexed":false,"name":"topLevel","type":"bytes12"}],"name":"LogDomainNameRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"domainName","type":"bytes"},{"indexed":false,"name":"topLevel","type":"bytes12"},{"indexed":true,"name":"owner","type":"address"}],"name":"LogDomainNameRenewed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"domainName","type":"bytes"},{"indexed":false,"name":"topLevel","type":"bytes12"},{"indexed":false,"name":"newIp","type":"bytes15"}],"name":"LogDomainNameEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"domainName","type":"bytes"},{"indexed":false,"name":"topLevel","type":"bytes12"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"LogDomainNameTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"timestamp","type":"uint256"},{"indexed":true,"name":"_owner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogPurchaseChangeReturned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"receiptKey","type":"bytes32"},{"indexed":true,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"domainName","type":"bytes"},{"indexed":false,"name":"amountInWei","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"}],"name":"LogReceipt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"BYTES_DEFAULT_VALUE","outputs":[{"name":"","type":"bytes1"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DN_COST","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DN_COST_SHORT_ADDITION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DN_EXPENSIVE_LENGTH","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DN_MIN_LENGTH","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_EXPIRATION_DATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"domainNames","outputs":[{"name":"name","type":"bytes"},{"name":"topLevel","type":"bytes12"},{"name":"owner","type":"address"},{"name":"ip","type":"bytes15"},{"name":"expires","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"}],"name":"getDomainHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"}],"name":"getIP","outputs":[{"name":"","type":"bytes15"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes"}],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"receiptKey","type":"bytes32"}],"name":"getReceipt","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"domain","type":"bytes"},{"name":"topLevel","type":"bytes12"}],"name":"getReceiptKey","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReceiptList","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"paymentReceipts","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"receiptDetails","outputs":[{"name":"amountPaidWei","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"expires","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TLD_MIN_LENGTH","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]);
	var DDNS = DDNSContract.at('0xbb56f7377956b32b5c61debb58552fb0ebd0ecca');
	
	DDNS.getReceiptList(function(error, result) {
        if (!error) {
		   document.body.innerHTML += "<p>hello"+ DDNS.address +"</p>";
		   document.getElementById("formGettersResult").innerHTML = "Paragraph changed!";
        } else
            console.log(error);
    });
		
	});

})();


