import { Patient, PatientJson, GenderType, EyeColorType, HairColorType, PatientPhototype } from './patients';


export enum ScenarioType {
    scenario1 = "scenario1",
    scenario2 = "scenario2",
    scenario3 = "scenario3",
    scenario4 = "scenario4"
}

export enum CutaneousBiopsyHistologiclaSubtypeType {
    acral_lentiginous = "acral_lentiginous",
    desmoplastic = "desmoplastic",
    lentiginous_malignant = "lentiginous_malignant",
    mocosal = "mocosal",
    nevoid = "nevoid",
    nodular = "nodular",
    spitzoid = "spitzoid",
    superficial_spreading = "superficial_spreading",
    other = "other"
}

export enum VisceralMetastasisLocationType {
    bone = "bone",
    cns = "cns",
    hepatic = "hepatic",
    multiple = "multiple",
    pulmonary = "pulmonary"
}


export enum AbsentPresentType {
    present = "present",
    absent = "absent"
}

export enum PrimaryTumourLocationCodedType {
    acral = "acral",
    head_and_neck = "head and neck",
    lower_limbs = "lower limbs",
    mucosa = "mucosa",
    trunk = "trunk",
    upper_limbs = "upper limbs",
    other = "other"
}

export enum CutaneousBiopsyPredominantCellType {
    epitheloid = "epitheloid",
    fusocellular = "fusocellular",
    plemorphic = "plemorphic",
    sarcomathoid = "sarcomathoid",
    small_cell = "small_cell",
    other = "other"
}


export interface TestJson {
    id: string;
    patientId: string;
    test_date: string;
    isProcessed: boolean;

    cutaneous_biopsy_breslow: number;
    cutaneous_biopsy_ulceration: string;
    total_positives_slnb_ldn: number;
    total_count_slnb_ldn: number;
    scenario: string;
    cutaneous_biopsy_histological_subtype: string;
    patient_phototype: number;
    patient_eye_color: string;
    visceral_metastasis_location: string;
    age: number;
    cutaneous_biopsy_mitotic_index: number;
    patient_hair_color: string;
    neutrofils_per_limfocits: number;
    LAB1309: number;
    LAB2406: number;
    LAB2679: number;
    LAB2544: number;
    limfocits_per_monocits: number;
    cutaneous_biopsy_satellitosis: string;
    cutaneous_biopsy_lymphatic_invasion: string;
    MC1R: number;
    LAB2469: number;
    LAB2476: number;
    LAB2404: number;
    LAB2467: number;
    LAB1314: number;
    LAB2405: number;
    LAB1313: number;
    LAB2419: number;
    LAB1307: number;
    LAB2422: number;
    LAB1301: number;
    cutaneous_biopsy_vascular_invasion: string;
    primary_tumour_location_coded: string;
    missBIO2: number;
    LAB4176: number;
    T0_date: number;
    cutaneous_biopsy_regression: string;
    LAB1311: number;
    cutaneous_biopsy_neurotropism: string;
    missNEU: number;
    LAB1316: number;
    missBIO: number;
    cutaneous_biopsy_predominant_cell_type: string;
}

export class Test {

    id: string;
    patientId: string;
    test_date: Date;
    isProcessed: boolean;

    cutaneous_biopsy_breslow: number = 0;
    cutaneous_biopsy_ulceration: AbsentPresentType;
    total_positives_slnb_ldn: number = 0;
    total_count_slnb_ldn: number = 0;
    scenario: ScenarioType;
    cutaneous_biopsy_histological_subtype: CutaneousBiopsyHistologiclaSubtypeType;
    patient_phototype: number = 0;
    patient_eye_color: EyeColorType;
    visceral_metastasis_location: VisceralMetastasisLocationType;
    age: number = 0;
    cutaneous_biopsy_mitotic_index: number = 0;
    patient_hair_color: HairColorType;
    neutrofils_per_limfocits: number = 0;
    LAB1309: number = 0;
    LAB2406: number = 0;
    LAB2679: number = 0;
    LAB2544: number = 0;
    limfocits_per_monocits: number = 0;
    cutaneous_biopsy_satellitosis: AbsentPresentType;
    cutaneous_biopsy_lymphatic_invasion: AbsentPresentType;
    MC1R: number = 0;
    LAB2469: number = 0;
    LAB2476: number = 0;
    LAB2404: number = 0;
    LAB2467: number = 0;
    LAB1314: number = 0;
    LAB2405: number = 0;
    LAB1313: number = 0;
    LAB2419: number = 0;
    LAB1307: number = 0;
    LAB2422: number = 0;
    LAB1301: number = 0;
    cutaneous_biopsy_vascular_invasion: AbsentPresentType;
    primary_tumour_location_coded: PrimaryTumourLocationCodedType;
    missBIO2: number = 0;
    LAB4176: number = 0;
    T0_date: number = 0;
    cutaneous_biopsy_regression: AbsentPresentType;
    LAB1311: number = 0;
    cutaneous_biopsy_neurotropism: AbsentPresentType;
    missNEU: number = 0;
    LAB1316: number = 0;
    missBIO: number = 0;
    cutaneous_biopsy_predominant_cell_type: CutaneousBiopsyPredominantCellType;

    constructor() {
        this.test_date = new Date();
        this.isProcessed = false;
        this.cutaneous_biopsy_ulceration = AbsentPresentType.present;
        this.scenario = ScenarioType.scenario1;
        this.cutaneous_biopsy_histological_subtype = CutaneousBiopsyHistologiclaSubtypeType.acral_lentiginous;
        this.patient_eye_color = EyeColorType.black;
        this.visceral_metastasis_location = VisceralMetastasisLocationType.bone;
        this.patient_hair_color = HairColorType.black;
        this.cutaneous_biopsy_satellitosis = AbsentPresentType.present;
        this.cutaneous_biopsy_lymphatic_invasion = AbsentPresentType.present;
        this.cutaneous_biopsy_vascular_invasion = AbsentPresentType.present;
        this.primary_tumour_location_coded = PrimaryTumourLocationCodedType.acral;
        this.cutaneous_biopsy_regression = AbsentPresentType.present;
        this.cutaneous_biopsy_neurotropism = AbsentPresentType.present;
        this.cutaneous_biopsy_predominant_cell_type = CutaneousBiopsyPredominantCellType.epitheloid;
    }

    static fromJson(json:TestJson): Test {
        
        const test = new Test();
        if (!json) return test;


        test.id = json.id;
        test.patientId = json.patientId;
        test.test_date = json.test_date ? new Date(json.test_date) : undefined;
        test.isProcessed = !!json.isProcessed;

        test.cutaneous_biopsy_breslow = json.cutaneous_biopsy_breslow;
        test.cutaneous_biopsy_ulceration = json.cutaneous_biopsy_ulceration ? AbsentPresentType[json.cutaneous_biopsy_ulceration] : undefined;
        test.total_positives_slnb_ldn = json.total_positives_slnb_ldn;
        test.total_count_slnb_ldn = json.total_count_slnb_ldn;
        test.scenario = json.scenario ?  ScenarioType[json.scenario] : undefined;
        test.cutaneous_biopsy_histological_subtype = json.cutaneous_biopsy_histological_subtype ? CutaneousBiopsyHistologiclaSubtypeType[json.cutaneous_biopsy_histological_subtype] : undefined;
        test.patient_phototype = json.patient_phototype;
        test.patient_eye_color = json.patient_eye_color?  EyeColorType[json.patient_eye_color] : undefined;
        test.visceral_metastasis_location = json.visceral_metastasis_location ? VisceralMetastasisLocationType[json.visceral_metastasis_location] : undefined;
        test.age = json.age;
        test.cutaneous_biopsy_mitotic_index = json.cutaneous_biopsy_mitotic_index;
        test.patient_hair_color = json.patient_hair_color ? HairColorType[json.patient_hair_color] : undefined;
        test.neutrofils_per_limfocits = json.neutrofils_per_limfocits;
        test.LAB1309 = json.LAB1309;
        test.LAB2406 = json.LAB2406;
        test.LAB2679 = json.LAB2679;
        test.LAB2544 = json.LAB2544;
        test.limfocits_per_monocits = json.limfocits_per_monocits;
        test.cutaneous_biopsy_satellitosis = json.cutaneous_biopsy_satellitosis ? AbsentPresentType[json.cutaneous_biopsy_satellitosis] : undefined;
        test.cutaneous_biopsy_lymphatic_invasion = json.cutaneous_biopsy_lymphatic_invasion ?  AbsentPresentType[json.cutaneous_biopsy_lymphatic_invasion] : undefined;
        test.MC1R = json.MC1R;
        test.LAB2469 = json.LAB2469;
        test.LAB2476 =json.LAB2476;
        test.LAB2404 = json.LAB2404;
        test.LAB2467 = json.LAB2467;
        test.LAB1314 = json.LAB1314;
        test.LAB2405 = json.LAB2405;
        test.LAB1313 = json.LAB1313;
        test.LAB2419 = json.LAB2419;
        test.LAB1307 = json.LAB1307;
        test.LAB2422 = json.LAB2422;
        test.LAB1301 = json.LAB1301;
        test.cutaneous_biopsy_vascular_invasion = json.cutaneous_biopsy_vascular_invasion ? AbsentPresentType[json.cutaneous_biopsy_vascular_invasion] : undefined;
        test.primary_tumour_location_coded = json.primary_tumour_location_coded ? PrimaryTumourLocationCodedType[json.primary_tumour_location_coded] : undefined;
        test.missBIO2 = json.missBIO2;
        test.LAB4176 = json.LAB4176;
        test.T0_date = json.T0_date;
        test.cutaneous_biopsy_regression = json.cutaneous_biopsy_regression ? AbsentPresentType[json.cutaneous_biopsy_regression] : undefined;
        test.LAB1311 = json.LAB1311;
        test.cutaneous_biopsy_neurotropism = json.cutaneous_biopsy_neurotropism ? AbsentPresentType[json.cutaneous_biopsy_neurotropism] : undefined;
        test.missNEU = json.missNEU;
        test.LAB1316 = json.LAB1316;
        test.missBIO = json.missBIO;
        test.cutaneous_biopsy_predominant_cell_type = json.cutaneous_biopsy_predominant_cell_type ? CutaneousBiopsyPredominantCellType[json.cutaneous_biopsy_predominant_cell_type] : undefined;

        return test;
    }

    toJson(): TestJson {
        const json: TestJson = {
            id: this.id,
            patientId: this.patientId,
            test_date: this.test_date.toISOString(),
            isProcessed: !!this.isProcessed,

            cutaneous_biopsy_breslow: this.cutaneous_biopsy_breslow,
            cutaneous_biopsy_ulceration: AbsentPresentType[this.cutaneous_biopsy_ulceration],
            total_positives_slnb_ldn: this.total_positives_slnb_ldn,
            total_count_slnb_ldn: this.total_count_slnb_ldn,
            scenario: ScenarioType[this.scenario],
            cutaneous_biopsy_histological_subtype: CutaneousBiopsyHistologiclaSubtypeType[this.cutaneous_biopsy_histological_subtype],
            patient_phototype: this.patient_phototype,
            patient_eye_color: EyeColorType[this.patient_eye_color],
            visceral_metastasis_location: VisceralMetastasisLocationType[this.visceral_metastasis_location],
            age: this.age,
            cutaneous_biopsy_mitotic_index: this.cutaneous_biopsy_mitotic_index,
            patient_hair_color: HairColorType[this.patient_hair_color],
            neutrofils_per_limfocits: this.neutrofils_per_limfocits,
            LAB1309: this.LAB1309,
            LAB2406: this.LAB2406,
            LAB2679: this.LAB2679,
            LAB2544: this.LAB2544,
            limfocits_per_monocits: this.limfocits_per_monocits,
            cutaneous_biopsy_satellitosis: AbsentPresentType[this.cutaneous_biopsy_satellitosis],
            cutaneous_biopsy_lymphatic_invasion: AbsentPresentType[this.cutaneous_biopsy_lymphatic_invasion],
            MC1R: this.MC1R,
            LAB2469: this.LAB2469,
            LAB2476: this.LAB2476,
            LAB2404: this.LAB2404,
            LAB2467: this.LAB2467,
            LAB1314: this.LAB1314,
            LAB2405: this.LAB2405,
            LAB1313: this.LAB1313,
            LAB2419: this.LAB2419,
            LAB1307: this.LAB1307,
            LAB2422: this.LAB2422,
            LAB1301: this.LAB1301,
            cutaneous_biopsy_vascular_invasion: AbsentPresentType[this.cutaneous_biopsy_vascular_invasion],
            primary_tumour_location_coded: PrimaryTumourLocationCodedType[this.primary_tumour_location_coded],
            missBIO2: this.missBIO2,
            LAB4176: this.LAB4176,
            T0_date: this.T0_date,
            cutaneous_biopsy_regression: AbsentPresentType[this.cutaneous_biopsy_regression],
            LAB1311: this.LAB1311,
            cutaneous_biopsy_neurotropism: AbsentPresentType[this.cutaneous_biopsy_neurotropism],
            missNEU: this.missNEU,
            LAB1316: this.LAB1316,
            missBIO: this.missBIO,
            cutaneous_biopsy_predominant_cell_type: CutaneousBiopsyPredominantCellType[this.cutaneous_biopsy_predominant_cell_type]
        };
        return json;
    }
}