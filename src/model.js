
export const version = () => "1.0.0";

/* TODO : Créer le modèle objet ici */ 
export class Sensor{
    constructor(id,name,type,data){
        this._id=id;
        this._name=name;
        this._type=type;
        this._data=data;
    }
    get data(){
        return this._data;
    }
    set data(data){
        this._data.values=data.values;
        this._data.labels=data.labels;
    }
    get id(){
        return this._id;
    }
    set id(id){
        this._id=id;
    }
    set type(type){
        this._type=type;
    }
    get type(){
       return  this._type;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name=name;
    }
    addRow(element){
        var td="<tr>"+
       " <td></td>"+
      "  <td></td>"+
       " </tr>"

            element.appendChild(td)

    }
  
}
export class TEMPERATURE extends Sensor{
    constructor(id,nom,type,data,unite){
        super(id,nom,type,data);
        this._unite=unite;
    }
    get unite(){
        return this._unite;
    }
    set unite(unite){
        this._unite=unite;
    }
    Moyenne(){
        var somme=0;
        
        var taille=this._data.nbrValues();
        if(this._data.values != null){
            for(var i=0;i<this._data.nbrValues();i++){
                somme = parseFloat(this._data.values[i])+somme;
            }
            return somme/taille;
        }else{
            return 0;
        }
        
        
    }
}


export class HUMIDITE extends Sensor{
    constructor(id,nom,type,data,unite){
        super(id,nom,type,data);
        this._unite=unite;
    }
    get unite(){
        return this._unite;
    }
    set unite(unite){
        this._unite=unite;
    }
    Moyenne(){
        var somme=0;
        var taille=this._data.nbrValues();
        if(this._data.values != null){
            for(var i=0;i<this._data.nbrValues();i++){
                somme=parseFloat(this._data.values[i])+somme;
            }

            return somme/taille;
        }else{
            return 0;
        }
        
    }
}

export class BOUTTON extends Sensor{
    constructor(id,nom,type,data){
        super(id,nom,type,data);
    }
}

export class Data{
    constructor(value,label){
        this._values=[]
        this._labels=[]
        this._values.push(value);
        this._labels.push(label);
    }
    
    get values(){
        return this._values;
    }
    set values(value){
        this._values = value;

    }
    get labels(){
        return this._labels;
    }
    set labels(label){
        this._labels=label;
    }
    nbrValues(){
        return this._values.length;
    }

}