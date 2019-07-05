import { Schema, Model, model} from "mongoose"

export var DnaSchema: Schema = new Schema({
  	dna: { 
		type: String, 
		required: true,
		unique: true   
	},
	isMutant: { 
		type: Boolean, 
		required: true 
	}
});

const DnaModel = model("dna", DnaSchema);
export default DnaModel