
export const Math = {
    sum: (n1: number, n2: number) => {
        return n1 + n2;
    },
    sub: (n1: number, n2: number) => {
        return n1 - n2;
    },
    div: (n1: number, n2: number) => {
        return n2 > 0 ? n1 / n2 : false;
    },
    mut: (n1: number, n2: number) => {
        return n1 * n2;
    }
}