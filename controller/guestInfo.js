import Guest from "../models/guestData.js";

const addGuest = async (req, res) => {
    try {
        const {
            firstName, lastName, email, phoneNumber, address, dateOfBirth,
            gender, profession, checkInDate, checkOutDate, notes
        } = req.body;

        const guest = new Guest({
            firstName, lastName, email, phoneNumber, address, dateOfBirth,
            gender, profession, checkInDate, checkOutDate, notes
        });

        const createdGuest = await guest.save();

        res.status(201).json({
            message: "Guest Added Successfully",
            code: 201,
            success: true,
            data: createdGuest
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to Add Guest",
            code: 500,
            success: false,
            error: error.message
        });
    }
};

const getGuestData = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const skip = (page - 1) * limit;

        const matchStage = {
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } },
                { "address.street": { $regex: search, $options: "i" } },
                { "address.city": { $regex: search, $options: "i" } },
                { "address.state": { $regex: search, $options: "i" } },
                { "address.zipCode": { $regex: search, $options: "i" } },
                { profession: { $regex: search, $options: "i" } },
            ]
        };

        const guests = await Guest.aggregate([
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
        ]);

        const totalGuests = await Guest.countDocuments(matchStage);

        if (guests.length === 0) {
            return res.status(404).json({
                message: "No guests found matching the search criteria",
                code: 404,
                success: false,
            });
        }

        res.status(200).json({
            message: "Guests fetched successfully",
            code: 200,
            success: true,
            data: guests,
            totalPages: Math.ceil(totalGuests / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch guests",
            code: 500,
            success: false,
            error: error.message
        });
    }
};

const updateGuest = async (req, res) => {
    try {
        const { guestId } = req.params;
        const { ...updateData } = req.body;

        // Validate guestId
        if (!guestId) {
            return res.status(400).json({
                message: "Guest ID is required",
                code: 400,
                success: false,
            });
        }

        // Find the guest to update
        const guestToUpdate = await Guest.findById(guestId);
        if (!guestToUpdate) {
            return res.status(404).json({
                message: "Guest not found",
                code: 404,
                success: false,
            });
        }

        // Update specific fields (optional for partial updates)
        if (updateData) {
            Object.assign(guestToUpdate, updateData);
        }

        // Save the updated guest
        const updatedGuest = await guestToUpdate.save();

        res.status(200).json({
            message: "Guest Updated Successfully",
            code: 200,
            success: true,
            data: updatedGuest
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to Update Guest",
            code: 500,
            success: false,
            error: error.message
        });
    }
};

const deleteGuest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGuest = await Guest.findByIdAndDelete(id);

        if (!deletedGuest) {
            return res.status(404).json({
                message: "Guest Not Found",
                code: 404,
                success: false,
            });
        }

        res.status(200).json({
            message: "Guest Deleted Successfully",
            code: 200,
            success: true,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to Delete Guest",
            code: 500,
            success: false,
            error: error.message
        });
    }
};



export { addGuest, getGuestData, updateGuest, deleteGuest };
