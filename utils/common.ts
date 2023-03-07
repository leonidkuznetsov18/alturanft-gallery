export const range = (start: number, end: number) => {
    let output = []
    if (typeof end === 'undefined') {
        end = start
        start = 0
    }
    for (let i = start; i < end; i += 1) {
        output.push(i)
    }
    return output
}

export const shortAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getCleanTokenId = (tokenId) => {
    return tokenId.substring(tokenId.length - 4)
};


export const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)