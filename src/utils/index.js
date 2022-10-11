export const flatten = (data) => {
  return data.reduce((prev, cur) => {
    const value = prev.concat(cur);
    return value.concat(cur.children ? flatten(cur.children) : []);
  }, []);
};
