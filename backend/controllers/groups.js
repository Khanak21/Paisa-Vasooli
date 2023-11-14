import mongoose from "mongoose";
import user from "../models/user.js"
import group from "../models/group.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";

export const  creategroup= async(req,res)=>{
    const {userId,title} = req.body.groupInput
        const newgroup = new group(
            req.body.groupInput
        );
    try {
        console.log(userId)
        newgroup.members.push(userId)
        const updatedgroup = await group.findByIdAndUpdate(
            newgroup._id,
            {$push:{members:userId}},
            {new:true}
        )
        const userr = await user.findByIdAndUpdate(
            userId,
            { $push: { groups: newgroup._id } },
            { new: true }
        );
        await newgroup.save()
        res.status(200).json({newgroup})
    }
    catch (err) {
    next(err)
    console.log(err);
    }
};

export const joingroup = async(req,res)=>{
    const {userId,JoingCode} = req.body.joincode
    const existgroup = await group.findOne({groupCode:JoingCode});
    if (!existgroup) {
        return res.status(404).json({ error: 'Group not found' });
    }
    if (existgroup.members.includes(userId)) {
        return res.status(400).json({ error: 'User is already a member of this group' });
    }
    await existgroup.findByIdAndUpdate(
            newgroup._id,
            {$push:{members:userId}},
            {new:true}
        )
    const userr = await user.findByIdAndUpdate(
        userId,
        { $push: { groups: updatedGroup._id } },
        { new: true }
    );
    const updatedGroup = await existgroup.save();
    res.status(200).json(updatedGroup);
}

