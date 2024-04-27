export function generateRandom(digits: number){
    return Math.floor(Math.random() * (10 ** digits)).toString()
}