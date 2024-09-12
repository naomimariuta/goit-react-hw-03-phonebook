const serialize = value => {
  return JSON.stringify(value);
};

const deserialize = serializedState => {
  return JSON.parse(serializedState);
};

const save = (key, value) => {
  try {
    const serializedState = serialize(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    throw new Error(
      `Failed to save '${key}' to localStorage: ${error.message}`
    );
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : deserialize(serializedState);
  } catch (error) {
    throw new Error(
      `Failed to load '${key}' from localStorage: ${error.message}`
    );
  }
};

const storage = {
  save,
  load,
};

export default storage;
