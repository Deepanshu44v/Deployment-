const user = require('../models/schema');
const fetchDietition = async(req,res)=>{
    try{
        
        const AllUsers = await user.find({Role:'Dietiton'})
        // AllUsers.Passward = "NULL";
        // console.log("fetching")
        AllUsers.map((users)=>{
            users.Passward = "NULL";
        })
        //  console.log("fetching")
         console.log("fetching2")
         console.log(AllUsers.Name);
         return res.status(200).json({
            success:true,
            messesge:"all user are fetched successfully",
            users:AllUsers
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in fetching user"
        })
    }
}
module.exports = fetchDietition;