import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import User from '@models/user';

export default async (req: Request, res: Response) => {
  const {
    name, 
    email, 
    password,
    role
  } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'name, email, password required'});
  }
  const user = new User({ name, email, password, role });
  await user.save();

  return res.status(201).json({ user});
  
}




