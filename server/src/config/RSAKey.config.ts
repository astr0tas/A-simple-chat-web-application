import NodeRSA from 'node-rsa';

const key: NodeRSA = new NodeRSA({ b: 2048 });
key.setOptions({ encryptionScheme: 'pkcs1' });
export default key;