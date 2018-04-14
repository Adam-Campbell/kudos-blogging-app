/*
    Function takes an array of approved fields, an object containing
    data that you want to copy, and an object you want to copy the
    data onto. It loops through every key on the data object and copies
    it to target object only if the key appears in the approved fields
    array.

    Args:

    fieldsArr - an array of the approved fields.
    dataObject - the original object that you want to take data from.
    target - the target object the data is added to, returned at the end.
*/


exports.mergeApprovedFields = (fieldsArr, dataObject, target) => {
    for (const prop in dataObject) {
        if (fieldsArr.indexOf(prop) !== -1) {
            target[prop] = dataObject[prop];
        }
    }
    return target;
}
