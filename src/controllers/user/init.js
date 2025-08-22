const UserModel = require('../../models/user'); 
const { db } = require('../../../db');
const { generateToken } = require('../../middleware/token');

module.exports = class Init {
    static loadUser (req, res) {
        db.then(async () => {
            const { email } = req.body;
            if (!email) {
                throw 'please provide email';
            }
            //check if name doesn't exist
            const findEmail = await UserModel.findOne({ email });
            if (!findEmail) {
                const _user = new UserModel({
                    ...req.body
                });
                return _user.save({ validateBeforeSave: false });
            }
            return findEmail;
        })
        .then(response => {
            if (!response) {
                throw 'error creating user';
            }
            const { _id, email } = response;

            const token = generateToken({ userId: _id,
                email });
            
            if (!token) {
                throw "error occur generating login";
            }

            res.status(200).json({
                message: 'done',
                response,
                token
            });
        })
        .catch(message => {
            res.status(404).json({
                error: true,
                message
            });
        });
    }
};