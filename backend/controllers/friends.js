import User from "../models/user.js"
export const sendRequest = async(req,res)=>{
    // console.log(req.params,req.body)
    const {userId} = req.params
    const username = (await User.findById(userId)).username
    const friend=req.body.friendName//username of friend
    const friendUser = await User.findOne({username:friend})

   try{ 
    if (!friendUser) {
        return res.json({ message: 'Friend not found' });
      }
  
      // Check if the sender is already a friend of the receiver
      if (friendUser.friends.includes(username)) {
        return res.json({ message: 'You are already friends with this user' });
      }
  
      // Check if the sender has already sent a request to the receiver
      if (friendUser.receivedRequests.includes(username)) {
        return res.json({ message: 'You have already sent a request to this user' });
      }

    const res1 = await User.findByIdAndUpdate(
        userId,
        {$push: {sentRequests:friend}},
        {new:true}
    )
    const res2 = await User.findByIdAndUpdate(

        friendUser._id,
        {$push:{receivedRequests:username,inbox:`${username} sent you a friend request`}},
        {new:true}
    )
     res.json({message:"Invitation sent",res2})
   }catch(err){
    res.json("Unable to send request")
   }
}

export const acceptRequest = async(req,res)=>{
    const {userId} = req.params
    const friendName = req.body.friendName// id of friend
    const username = (await User.findById(userId)).username
    const friendUser = await User.findOne({username:friendName})
    console.log("friend name",req.body.friendName)

   try{ 
    if (!friendUser) {
        return res.status(200).json({ message: 'Friend not found' });
      }
  
      if (friendUser.friends.includes(username)) {
        return res.status(200).json({ message: 'You are already friends with this user' });
      }
        const res1 = await User.findByIdAndUpdate(
        userId,
        {$push: {friends:friendName},$pull: { receivedRequests: friendName }},
        {new:true}
    )
    const res2 = await User.findByIdAndUpdate(
        friendUser.id,
        {$push:{friends:username,inbox:`${username} accepted your friend request`},$pull: { sentRequests: username }},
        {new:true}
    )
    res.status(200).json({res1,res2,message:"Invitation accepted"})
   }catch(err){
    res.json("Error")
   }
  }