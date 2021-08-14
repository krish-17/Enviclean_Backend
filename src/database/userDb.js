const User = require('../models/user');

const signUpUser = async(user) => {
    try {
        await User.create(user);
        let email = user.email;
        let response = await getUserByEmail(email);
        return { payload: response['payload'], message: "User signed up successfully." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const getUser = async(id) => {
    try {
        const user = await User.findOne(({
            where: {
                id: id
            },
            raw: true
        }));
        return { payload: user, message: "User found." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const updateUser = async(id, user) => {
    try {
        await User.update(user, {
            where: {
                id: id
            }
        });
        return { payload: user, message: "User updated successfully." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const deleteUser = async(id) => {
    try {
        const { payload: user } = await getUser(id);
        if (user == undefined) {
            return { payload: undefined, message: "User not found" };
        } else {
            await User.destroy({
                where: {
                    id: id
                }
            });
            return { payload: user, message: "User deleted successfully." }
        }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne(({
            where: {
                email: email
            },
            raw: true
        }));
        return { payload: user, message: "User found." }
    } catch (error) {
        console.log(error);
        return { payload: undefined, message: error.message };
    }
}

module.exports = {
    signUpUser,
    getUser,
    updateUser,
    deleteUser,
    getUserByEmail
}