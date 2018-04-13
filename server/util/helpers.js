/*
    Function takes an object and removes any properties which aren't
    on an approved list of properties, and then merges the stripped 
    version into a target object via Object.assign(). Returns a reference 
    to the object to enable chaining if desired. 

    Args:

    fieldsArr - an array of the accepted fields.
    dataObject - the original object that you want to strip down.
    target - the target object which is returend at the end.
*/

exports.mergeApprovedFields = (fieldsArr, dataObject, target) => {
    const trimmedDataObject = fieldsArr.reduce((acc, field, index, arr) => {
        if (dataObject[field]) {
            acc[field] = dataObject[field];
        }
        return acc;
    }, {});
    const modified = Object.assign(target, trimmedDataObject);
    return modified;
}