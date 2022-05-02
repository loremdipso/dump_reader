import {AES, SHA256, mode, enc, pad} from "crypto-js";

export function decrypt(ciphertext: Uint8Array) {
	for (let i = 0; i < ciphertext.length; i++) {
		if (ciphertext[i] == 0) {
			ciphertext[i] = 255;
		} else {
			ciphertext[i] -= 1;
		}
	}
	// var key = SHA256("sup");
	// var ciphertext = "DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=";
	// var iv = enc.Base64.parse("AAAAAAAAAAAAAAAAAAAAAA==")
	// console.log({ciphertext});
	// var decrypted = AES.decrypt(ciphertext, key, {iv});
	// console.log({decrypted});
	// const hmacDigest = enc.Base64.stringify(decrypted);
	// console.log({decrypted});
	// return decrypted;

	// const key = SHA256("sup");
	// const iv = enc.Base64.parse("AAAAAAAAAAAAAAAAAAAAAA==")
	// const decrypted = AES.decrypt(ciphertext, key, {iv});
	// console.log({decrypted});
	// console.log(decrypted.toString(enc.Utf8));

	// var key = enc.Hex.parse('unique nonce');
	// var iv = enc.Hex.parse('0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f');
	// var encrypted = AES.encrypt("text can be a random lenght", key, {
	// 	mode: mode.CTR,
	// 	iv: iv,
	// 	padding: pad.NoPadding
	// });

	// console.log(encrypted);

	// return 55;
}

