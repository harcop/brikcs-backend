/* eslint-disable global-require */
const fs = require('fs').promises;
const syntaxError = require('../../helpers/syntax-error');
const replaceConsoleWithPrinter = require('../../helpers/replaceConsoleWithPrinter');
const { db } = require('../../../db');
const LevelModel = require('../../models/level');
const UserLevelModel = require('../../models/userLevel');

module.exports = class Challenge {

    static solve (req, res) {
        db.then(async () => {

            const { userId } = res.locals;

            const { levelId, codeBody, language } = req.body;

            await UserLevelModel.findOneAndUpdate({ userId,
                levelId }, { ...req.body });

            const findLevel = await LevelModel.findById({ _id: levelId }).lean();

            const { testCases: tests, functionName: codeName } = findLevel;

            let passes = 0;
        
            const printAttachment = `
            const logs = [];
        
            function printLog() {
                return logs;
            }
            
            function printer(str) {
                logs.push(str);
            }`;
        
            const footer = `\n\n${printAttachment} module.exports = { mainCode: ${codeName}, printer, printLog }`;
        
            const fullCodeSyntax = codeBody + footer;
            const fullCodeWithPrinter = replaceConsoleWithPrinter(codeBody) + footer;
        
            try {
                const root = process.cwd();
                const fileName = `/coder${userId}${levelId}.js`;
                const _fileNamePathSyntax = `${root}/coder${userId}${levelId}.js`;
        
                const fileNamePathCodeToPrinter = `${root}/coder-p${userId}${levelId}.js`;
        
                await fs.writeFile(_fileNamePathSyntax, fullCodeSyntax); // Write to a file to check for syntax;
        
                await fs.writeFile(fileNamePathCodeToPrinter, fullCodeWithPrinter); // codeBody with changed console to printer
        
                const syntaxErr = await syntaxError(fileName);
                if (syntaxErr) {
                    console.log(syntaxErr);
                    fs.unlink(_fileNamePathSyntax);
                    fs.unlink(fileNamePathCodeToPrinter);
                    return res.status(200).json({
                        message: 'bad',
                        response: {
                            tests: [],
                            passes: [],
                            logs: [syntaxErr.annotated]
                        }
                    });
                }
        
                const { mainCode, printer, printLog } = require(fileNamePathCodeToPrinter);
                let _r = 1;
                for (const test of tests) {
                    printer(`Running Test ${_r}`);
                    const { input, expected } = test;
                    const _output = mainCode(input);
                    if (_output === expected) {
                        test.status = 'pass';
                        test.output = _output;
                        passes += 1;
                    } else {
                        test.status = 'fail';
                        test.output = _output;
                    }
                    _r += 1;
                }
                const logs = printLog();

                // update the user level status
                const query = {
                    ...req.body
                };
                if (passes === tests.length) {
                    query.status = true;
                }
                
                await UserLevelModel.findOneAndUpdate({ userId,
                    levelId }, query);

                res.status(200).json({
                    message: 'good',
                    response: {
                        tests,
                        passes,
                        logs
                    }
                });

                fs.unlink(_fileNamePathSyntax);
                fs.unlink(fileNamePathCodeToPrinter);
            } catch (err) {
                console.log(err);
                res.status(404).json({
                    message: 'bad',
                    response: err
                });
            }

        });
    }
};