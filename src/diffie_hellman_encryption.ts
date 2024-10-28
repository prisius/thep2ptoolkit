



function diffie_hellman () {


async function generateRandomSha256Hash() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const hashBuffer = await crypto.subtle.digest('SHA-256', array);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

generateRandomSha256Hash().then(hash => console.log("SHA-256 Hash aléatoire :", hash));

}


export {diffie_hellman};


