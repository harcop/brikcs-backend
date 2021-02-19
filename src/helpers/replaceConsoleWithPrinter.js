const regex = /(console.log)/gui;
function replaceConsoleWithPrinter (code) {
    return code.replace(regex, "printer");
}
module.exports = replaceConsoleWithPrinter;