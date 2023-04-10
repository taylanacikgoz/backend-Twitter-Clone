const db=require("../../data/db-config");

async function getAllUsers(){

    return await db("Users");
}

async function getByFilter(filter){
    let user= await db("Users as u")
        .leftJoin("Roles as r", "u.Role_id", "r.Role_id")
        .select("u.*", "r.Rolename")
        .where(filter).first()
    
    return user;
}

async function getById(User_id){
    return await db("Users").where("User_id", User_id).first()
}

async function createNewUser(user){
    const {Role_id}=await db("Roles").where("Rolename",user.Rolename).first()
    const newUser={
        Username:user.Username,
        Password:user.Password,
        Email:user.Email,
        Phone:user.Phone,
        Role_id:Role_id
    }
    const insertedId=await db("Users").insert(newUser)
    return await getByFilter({"u.User_id":insertedId[0]});

}

async function update(User_id,user){
    return await db("Users as u").where({User_id:User_id}).update({user})
}

async function removeUser(User_id){
    // eslint-disable-next-line no-unused-vars
    const removedUser=await db("Users").where({User_id}).del();
    return getAllUsers();
}

module.exports={
    getAllUsers,
    getById,
    getByFilter,
    createNewUser,
    update,
    removeUser
}