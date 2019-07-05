"use strict"; 
import { DnaServiceInterface } from "../interfaces"
import { injectable, inject } from "inversify";
import 'reflect-metadata';

@injectable()
class DnaService implements DnaServiceInterface{

	private dna: Array<string>
	private found: number = 0

	/* Esta funccio recibe un array representando un ADN 
	y busca determinar si el AND es de un mutante.
	Si el ADN es de un mutante devuelve TRUE y en caso
	contrario devuelve FALSE 
	
	Ejemplo:
	dna = ["AAAA","ATCT","AGTC","ACGA"]
	retult= true */

    public isMutant (dna: Array<string>): boolean {

    	this.dna = dna
		this.found = 0
		let n: number = dna.length
		let max: number = n - 4

		for(let x: number=0; x<n; x++){
			for(let z: number=0; z<n; z++){
				
				//busco Bottom
				if (x<=max && this.check(x,z, x+1, z, x+2, z, x+3, z)){
					return true						
				}
				
				//Busco Right
				if(z<=max && this.check(x,z, x,z+1, x,z+2, x,z+3)){
					return true
				}

				//Busco Botom Right
				if(x<=max && z<=max && this.check(x,z, x+1,z+1, x+2,z+2, x+3,z+3)){
					return true
				}
				
				//Busco Right Botom 
				if(z>max && x<=max && this.check(x,z, x+1,z-1, x+2,z-2, x+3,z-3)){					
					return true					
				}				
			}
		}

		return false
    }

    /* Esta función compara 4 valores del array dna y si todos
    son iguales devuelve TRUE, en caso contrario devuelve FALSE.

    Recibe 8 parámetros numéricos los cuales corresponden a coordenadas del array dna.
	los dos primeros son las coordenadas x-z de la primer posición la cual se va a 
	comparar con los otros 3 */

    private check (x1: number, z1: number, x2: number, z2: number, x3: number, z3: number, x4: number, z4: number ){

    	if(this.dna[x1][z1] == this.dna[x2][z2] && this.dna[x1][z1] == this.dna[x3][z3] && this.dna[x1][z1] == this.dna[x4][z4]){
			this.found++
									
			if(this.found>1){
				return true
			}
		}

		return false			
    }
    
}

export default DnaService