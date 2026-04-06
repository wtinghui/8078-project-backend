const pool=require("../database");

async function createUser({username, password, email, dateOfBirth}){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const query=`INSERT INTO users (username, hashed_password, email, date_of_birth)
                    VALUES(?,?,?,?)`;
        const bindings =[
            username,
            password,
            email,
            dateOfBirth
        ];

        console.log(bindings)

        await connection.execute(query,bindings);
        await connection.commit();
    } catch(e){
        await connection.rollback();
        console.log(e);
    } finally {
        await connection.release();
    }
    
}

async function updateUser(userId, {username, email, dateOfBirth}){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const query=`UPDATE users SET 
                        username = ?,
                        email = ?,
                        date_of_birth = ?
                        WHERE user_id = ?
                        `;
        const bindings = [username, email, dateOfBirth, userId];
        await connection.execute(query, bindings);
        await connection.commit();
    } catch (e){
        await connection.rollback();
        console.log(e);
    } finally {
        await connection.release();
    }

}

async function deleteUser(userId){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        await connection.execute(`DELETE FROM users WHERE user_id=?`,[userId]);

        await connection.commit();
    } catch(e) {
        await connection.rollback();
        console.log(e);
    } finally {
        await connection.release();
    }

}


//for login
async function getUserByEmail(email){
    const [rows] = await pool.execute(`SELECT * FROM users WHERE email =?`,[email]);
    return rows[0]
};

async function getUserByUsername(username){
    const [rows] = await pool.execute(`SELECT * FROM users WHERE username =?`,[username]);
    return rows[0]
};

//for retrieving info
async function getUserById(userId){
    const [rows] = await pool.execute(`SELECT * FROM users WHERE user_id =?`,[userId]);
    return rows[0]
};

module.exports={
    createUser, 
    updateUser, 
    deleteUser, 
    getUserByEmail, 
    getUserById,
    getUserByUsername
};



