const schemaError = (model) => {
    const err = model.validateSync();
    if (!err) {
        return null;
    }
    const output = [];
    for (const error in err.errors) {
        output.push(err.errors[error].message);
    }
    throw output.sort();
};

module.exports = {
    schemaError
};