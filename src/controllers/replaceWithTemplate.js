
function replaceWithTemplate(str, regex) {

    const replacedString = str.replace(regex, "<%=$1%>");
    return replacedString;
}

module.exports = replaceWithTemplate;