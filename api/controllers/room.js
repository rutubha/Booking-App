import Room from "../models/room.js";
import Hotel from '../models/hotel.js';
import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const saveRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms : saveRoom._id}}); 
        } catch (error) {
            next(error);
        }

        res.status(200).json(saveRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            {new: true}
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne({"roomNumber._id": req.params.id}, {
            $push: {
                "roomNumber.$.unavailableDates" : req.body.dates
            }
        })
        res.status(200).json("Room status has been updated");
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms : req.params.id}}); 
        } catch (error) {
            next(error);
        }
        res.status(200).json("Room Delete");
    } catch (error) {
        next(error);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.id
        );
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
}