export default class Direction {
    static readonly HAUT = new Direction(1);
    static readonly BAS = new Direction(-1);
    static readonly GAUCHE = new Direction(-1);
    static readonly DROITE = new Direction(1);
    static readonly HAUT_ECRAN = new Direction(-1);
    static readonly BAS_ECRAN = new Direction(1);

    private valeur: number;
    
    private constructor(valeur: number) {
        this.valeur = valeur;
    }

    public getValeur(): number {
        return this.valeur;
    }
}