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

            const { levelId, functionBody } = req.body;

            await UserLevelModel.findOneAndUpdate({ userId,
                levelId }, { ...req.body });

            const findLevel = await LevelModel.findById({ _id: levelId }).lean();

            const { testCases: tests, functionName: codeName } = findLevel;

            let passes = 0;
        
            const printAttachment = `
            process.on('uncaughtException', (err, origin) => {

                console.log('only error allowed');
            });

            const logs = [];
        
            function printLog() {
                return logs;
            }
            
            function printer(str) {
                logs.push(str);
            }`;
        
            const footer = `\n\n${printAttachment} module.exports = { mainCode: ${codeName}, printer, printLog }`;

            const fullCodeSyntax = functionBody + footer;
            const fullCodeWithPrinter = replaceConsoleWithPrinter(functionBody) + footer;
        
            const root = process.cwd();
            const rnd = Math.floor(Math.random() * 45 * Math.random() * 98);
            
            const fileName = `/coder${userId}${levelId}${rnd}.js`;
            const _fileNamePathSyntax = `${root}/coder${userId}${levelId}${rnd}.js`;
    
            const fileNamePathCodeToPrinter = `${root}/coder-p${userId}${levelId}${rnd}.js`;

            try {
                await fs.writeFile(_fileNamePathSyntax, fullCodeSyntax); // Write to a file to check for syntax;
        
                await fs.writeFile(fileNamePathCodeToPrinter, fullCodeWithPrinter); // functionBody with changed console to printer
        
                const syntaxErr = await syntaxError(fileName);
                if (syntaxErr) {
                    console.log(syntaxErr);
                    return res.status(404).json({
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


                if (typeof mainCode !== 'function' || mainCode.name !== codeName) {
                    console.log('function name error');
                }

                for (const test of tests) {
                    printer(`----------Running Test ${_r}----------`);
                    const { input, expected } = test;
                    const _output = mainCode(...input);
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
                    console.log('done truth');
                    query.status = true;
                }

                await UserLevelModel.findOneAndUpdate({ userId,
                    levelId }, query);

                res.status(200).json({
                    message: 'good',
                    response: {
                        tests,
                        passes,
                        logs,
                        status: true
                    }
                });

            } catch (err) {
                console.log(err, 'error here');
                res.status(404).json({
                    message: 'bad',
                    response: {
                        tests: [],
                        passes: [],
                        logs: [`${err}`]
                    }
                });
            } finally {
                fs.unlink(_fileNamePathSyntax);
                fs.unlink(fileNamePathCodeToPrinter);
            }

        });
    }
};