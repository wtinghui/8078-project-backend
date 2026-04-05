const userData = require ('../data/userData');
const bcrypt = require ('bcrypt')

async function createUser({username, password, email, date_of_birth}){
    const emailInUse= await userData.getUserByEmail(email);
    if (emailInUse){
        throw new Error("Email has been registered.")
    };

    const usernameInUse = await userData.getUserByUsername(username);
    if (usernameInUse){
        throw new Error("Username has been used.")
    };

    const hashedPassword = await bcrypt.hash(password,10);
    return await userData.createUser({
        username,
        "password":hashedPassword,
        email,
        date_of_birth
    })
};

async function updateUser ({username, password, email}){
    const emailInUse = await userData.getUserByEmail(email);
    if (emailInUse){
        throw new Error ("Email already in use by an account.")
    };

    const hashedPassword= await bcrypt.hash(password, 10);
    return await userData.updateUser({
        username,
        "password":hashedPassword,
        email
    });
}


//how to verify password before deleting user?
async function deleteUser (userId, password){
    const user = await userData.getUserById(userId);

    const isPasswordCorrect = await bcrypt.compare(password,user.hashed_password);
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

module.exports={
    createUser,
    updateUser,
    deleteUser,
    loginUser
}