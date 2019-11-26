
export enum EyeColorType {
    blue = "blue",
    black = "black",
    brown = "brown",
    green = "green",
    other = "other"
}

export enum HairColorType {
    black = "black",
    brown = "brown",
    blond = "blond",
    red = "red",
    other = "other"
}

export enum PatientPhototype {
    I = 1,
    II = 2,
    III = 3,
    IV = 4
}

export enum GenderType {
    male = "male",
    female = "female"
}

export interface PatientJson {
    id: string;
    ownerId: string;
    name: string;
    surname: string;
    gender: string;
    birthDate: string;
    daiagnoseDate: string;
    eyeColor: string;
    hairColor: string;
    patientPhototype: number;
}

export class Patient {

    id: string;
    ownerId: string;
    name: string;
    surname: string;
    gender: GenderType;
    birthDate: Date;
    eyeColor: EyeColorType;
    hairColor: HairColorType;
    patientPhototype: PatientPhototype;
    daiagnoseDate: Date;

    constructor() {
        this.birthDate = new Date();
        this.daiagnoseDate = new Date();
        this.gender  =  GenderType.male;
        this.eyeColor = EyeColorType.blue;
        this.hairColor = HairColorType.black;
        this.patientPhototype = PatientPhototype.I;
    }

    static fromJson(json:PatientJson): Patient {
        
        const patient = new Patient();
        if (!json) return patient;

        patient.id = json.id;
        patient.ownerId = json.ownerId;
        patient.name = json.name;
        patient.surname = json.surname;
        patient.gender = json.gender ? GenderType[json.gender] : undefined;
        patient.birthDate = json.birthDate ? new Date(json.birthDate) : undefined;
        patient.daiagnoseDate = json.daiagnoseDate ? new Date(json.daiagnoseDate) : undefined;
        patient.eyeColor = json.eyeColor ? EyeColorType[json.eyeColor] : undefined;
        patient.hairColor = json.hairColor ? HairColorType[json.hairColor] : undefined;
        patient.patientPhototype = json.patientPhototype;
        return patient;
    }

    toJson():PatientJson {
        const json: PatientJson = {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            surname: this.surname,
            gender: GenderType[this.gender],
            birthDate: this.birthDate.toISOString(),
            daiagnoseDate: this.daiagnoseDate.toISOString(),
            eyeColor: EyeColorType[this.eyeColor],
            hairColor: HairColorType[this.hairColor],
            patientPhototype: this.patientPhototype
        };
        return json;
    }
}