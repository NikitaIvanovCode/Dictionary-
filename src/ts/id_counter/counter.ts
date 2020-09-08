function counter() {
    let num = 14;
    return (): number => {
        return num++;
    }
}

let id = counter();

export default id;