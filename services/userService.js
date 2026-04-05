const userData = require ('../data/userData');
const bcrypt = require ('bcrypt')

async function createUser({username, password, email, dateOfBirth}){
    const emailInUse= await userData.getUserByEmail(email);
    if (emailInUse){
        throw new Error("Email has been registered.")
    };

    const usernameInUse = await userData.getUserByUsername(username);
    if (usernameInUse){
        throw new Error("Username has been used.")
    };

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(username, hashedPassword, email, dateOfBirth)
    return await userData.createUser({
        username,
        "password":hashedPassword,
        email,
        dateOfBirth
    })
};

async function updateUser (userId, {username, password, email}){
    const userDetails = await userData.getUserById(userId);

    const usernameInUse = await userData.getUserByUsername(username);
    if (usernameInUse && username!=userDetails.username){
        throw new Error ("Username is taken.")
    };

    const emailInUse = await userData.getUserByEmail(email);
    if (emailInUse && email!=userDetails.email){
        throw new Error ("Email already in use by an account.")
    };

    const hashedPassword= await bcrypt.hash(password, 10);
    return await userData.updateUser(userId, {
        username,
        "password":hashedPassword,
        email
    });
}


//how to verify password before deleting user?
async function deleteUser (userId, password){
    const userDetails = await userData.getUserById(userId);
    console.log(userDetails);

    const isPasswordCorrect = await bcrypt.compare(password, userDetails.hashed_password);
    if (!isPasswordCorrect){
        throw new Error('Password entered is not correct')
    };

    return await userData.deleteUser(userId);
};

//to optimise to show error message only after running check of both email and password
async function loginUser (email, password){
    const user = await userData.getUserByEmail(email);
    if (!user){
        throw new Error ("Invalid email or password.")
    }
    console.log(user);

    const isPasswordCorrect = await bcrypt.compare(password,user.hashed_password);
    if (!isPasswordCorrect){
        throw new Error('Invalid email or password')
    };

    return user
};

async function getUserById(userId){
    return await userData.getUserById(userId)
}

module.exports={
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserById
}