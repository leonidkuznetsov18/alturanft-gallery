

export const shortAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getCleanTokenId = (tokenId) => {
    return tokenId.substring(tokenId.length - 4)
};


export const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)


export const cutText = (str: string, len: number): string => {
    if (str.length > len) {
        return str.slice(0, len) + '...';
    } else {
        return str;
    }
}