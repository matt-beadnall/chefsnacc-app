// import React from 'react'
import diff from 'deep-diff';

const getDifferences = (oldObject, newObject) => {
    return diff(oldObject, newObject);
}

const functions = {
    getDifferences,
}

export default functions;