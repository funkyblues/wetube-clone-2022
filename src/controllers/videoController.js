export const trending = (req, res) => res.send("Home Page Videos");
export const watch = (req, res) => res.send("Watch");
export const edit = (req, res) => res.send("Edit");

// Watch와 Edit을 export 하는 방법...?

// export default하는 것과 각각의 변수를 export 하는 것의 차이
// export default trending;