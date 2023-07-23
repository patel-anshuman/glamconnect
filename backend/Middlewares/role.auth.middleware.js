const roleAuth = (permittedRole) => {
    return (req,res,next) => {
        const user_role = req.body.role;
        if(permittedRole.includes(user_role)){
            next();
        } else {
            res.status(400).send({msg: `Unauthorised Access by ${user_role}` });
        }
    }
}

module.exports = { roleAuth };