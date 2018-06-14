export class OpaqueTransaction {
    nPositions : number;
    opaque_transaction : String;

    constructor( nPositions : number, opaque_transaction : String){
        this.nPositions = nPositions;
        this.opaque_transaction = opaque_transaction;
    } 
}
