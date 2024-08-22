const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that norman block is in the list 
  const name = 'Luke Hs';
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    leaf: name,
    root,
  });

  console.log({ gift });
}

main();