import NodeRSA from "node-rsa";
export default function encryptor(publicKey, data) {
    const key = new NodeRSA(publicKey, 'public', { encryptionScheme: 'pkcs1' });
    return key.encrypt(data, 'base64');
}
