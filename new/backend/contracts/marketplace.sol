// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract MarketPlace is ERC721URIStorage {

  uint public productCount = 0;
  address payable public owner; 

  mapping(uint => Product) public products;

  struct Product {
    uint id;
    string name;
    uint price;
    address payable owner;
    bool purchased;
  }

  event ProductCreated(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  event ProductSeller(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  constructor() ERC721("CryptDog", "CRDG") {
        owner = payable(msg.sender);
    }

  function createProduct(string memory _name, uint _price) public {
    // Required Valid Name
    require(bytes(_name).length > 0);
    // Required Valid Price
    require(_price > 0);
    //Increment product count
    productCount ++;
    //create a product
    products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);
    //Trigger the enter
    emit ProductCreated(productCount, _name, _price,payable(msg.sender), false);
  }

  function purchaseProduct(uint _id) public payable {
    // Fetch the product
    Product memory _product = products[_id];
    // Fetch the Owner
    address payable _seller = _product.owner;
    // Check the product having valid ID
    require(_product.id > 0 && _product.id <= productCount);
    // Check enough Ether in transaction
    require(msg.value >= _product.price);
    // Check the product not be purchased before
    require(!_product.purchased);
    // check the seller can't buy his own product
    require(_seller != msg.sender, "Seller can't buy his own product");
    // Transfer the ownership to buyer
    _product.owner = payable(msg.sender);
    // Mark as Purchase
    _product.purchased = true;
    // Update the product
    products[_id] = _product;
    // Pay the seller
    payable(_seller).transfer(msg.value);
    // Trigger the event
    emit ProductSeller(productCount, _product.name, _product.price, payable(msg.sender), true);

  }

}