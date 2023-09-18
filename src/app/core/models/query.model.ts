import {FieldPath, WhereFilterOp} from "@angular/fire/firestore";

export interface Filter {
    keyword: string | any[] | number | boolean,
    keyProp: string | FieldPath,
    type: WhereFilterOp
}
