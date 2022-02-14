import { UserModel } from "../models/user.model";


export class GeneralOperations {
    /** Sort given Users by time added */
    public static sortByKey(array: UserModel[]) {
        return array.sort((a, b) => {
            var x = a.timeAdded; var y = b.timeAdded;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}