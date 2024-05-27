// This function is used to organize an object according to a specified order of keys.
export const sortKeysofObject = (obj, orderKeys) => {
  const keysOfObject = Object.keys(obj);

  const differentsKeys = orderKeys.filter((key) => !keysOfObject.includes(key));

  // Checks if the passed keys exist in the object
  if (differentsKeys.length > 0) {
    console.error(`Error: The following keys dont exist in the object: ${differentsKeys}`)
    return 
  }

  // Checks if the all the keys in the object exist in the passed keys
  const missingKeys = keysOfObject.filter((key) => !orderKeys.includes(key))

  if (missingKeys.length > 0) {
    console.error(`Error: The following object keys are missing: ${missingKeys}`)
    return 
  }

  // Sort Object
  const sortedObject = {}

  orderKeys.forEach((key) => {
    sortedObject[key] = obj[key]
  })

  return sortedObject
}

export const filterKeysOfObject = (obj, keysOfInterest) => {
  // Object.entries: Transforms an object into an array where each element is [key, value]. Example: { foo: "bar", baz: 42 } ---> [['foo', 'bar'], ['baz', 42]]
  const entriesOfObject = Object.entries(obj) 

  const filteredEntriesOfObject = entriesOfObject.filter(([key, _]) => keysOfInterest.includes(key))

  // Object.fromEntries: Transforms a list of key-value pairs into an object. Example: [['foo', 'bar'], ['baz', 42]] ---> { foo: "bar", baz: 42 }
  const filteredObject = Object.fromEntries(filteredEntriesOfObject)

  return filteredObject
}

// This function is used to filter the objects in a list according to the `keysOfInterest`. This can be useful for filtering a request
// The order of the `keysOfInterest` is taken into account
export const filterArrayOfObjects = (arrayOfObjects, keysOfInterest) => {
  const filteredArray = arrayOfObjects.map((obj) => filterKeysOfObject(obj, keysOfInterest))

  const sortedFilteredArray = filteredArray.map((obj) => sortKeysofObject(obj, keysOfInterest))

  return sortedFilteredArray
}