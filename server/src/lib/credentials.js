import argon2 from 'argon2';

export async function hashCredential(plainSecret) {
    return argon2.hash(plainSecret, {
        type: argon2.argon2id,
        memoryCost: 65536,//64MiB
        timeCost: 3,
        parallelism: 1
    })
}

export async function verifyCredential(credentialHash, plainSecret){
        return argon2.verify(credentialHash, plainSecret)
}

