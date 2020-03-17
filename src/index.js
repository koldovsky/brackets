module.exports = function check(str, bracketsConfig) {
    const brackets = str
        .split("")
        .filter(char =>
            bracketsConfig.find(v => v[0] === char || v[1] === char)
        );
    const bracketStack = [];
    for (const bracket of brackets) {
        const bracketInfo = getBracketInfo(bracket, bracketsConfig);
        if (bracketInfo.kind === 'same') {
          if (bracketStack.includes(bracket)) {
            if (bracketStack.pop() !== bracket ) return false;
          } else {
            bracketStack.push(bracket);
          }          
        } else if (bracketInfo.kind === "opening") {
            bracketStack.push(bracket);
        } else {
            if (bracketStack.pop() !== bracketInfo.opening) return false;
        }
    }
    return bracketStack.length === 0;
};

function getBracketInfo(bracket, bracketsConfig) {
    const pair = bracketsConfig.find(
        brackets => bracket === brackets[0] || bracket === brackets[1]
    );
    return {
        kind: bracket === pair[0] && bracket === pair[1]
                ? "same"
                : bracket === pair[0]
                ? "opening"
                : "closing",
        opening: pair[0],
        closing: pair[1]
    };
}

