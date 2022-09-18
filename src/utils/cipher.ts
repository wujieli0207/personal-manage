import UTF8, { parse } from 'crypto-js/enc-utf8'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import { encrypt, decrypt } from 'crypto-js/aes'
import md5 from 'crypto-js/md5'
import Base64 from 'crypto-js/enc-base64'

export interface EncryptionParams {
  key: string
  iv: string
}

export class AesEncryption {
  private key
  private iv

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt
    if (key) {
      this.key = parse(key)
    }
    if (iv) {
      this.iv = parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: Pkcs7,
      iv: this.iv,
    }
  }

  encryptByAES(cipherText: string) {
    if (this.key) {
      return encrypt(cipherText, this.key, this.getOptions).toString()
    }
  }

  decryptByAES(cipherText: string) {
    if (this.key) {
      return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
    }
  }
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64)
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8)
}

export function encryptByMd5(password: string) {
  return md5(password).toString()
}
