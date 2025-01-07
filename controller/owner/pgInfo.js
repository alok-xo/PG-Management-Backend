import pgInfo from "../../models/owner/pgInfoModel.js";

const addPgInfo = async (req, res) => {
    try {
        const {
            pgName,
            ownerName,
            location,
            contactNumber,
            totalRooms,
            availableRooms,
            roomTypes,
            facilities,
            rent,
            rules,
            reviews,
            images,
            amenities
        } = req.body;
        console.log("saaaaaaaaaaaaaaaaaaaaaaaa");
        const newPgInfo = new pgInfo({
            pgName,
            ownerName,
            location,
            contactNumber,
            totalRooms,
            availableRooms,
            roomTypes,
            facilities,
            rent,
            rules,
            reviews,
            images,
            amenities
        });
        console.log("sssssssssssss");
        const createdPgInfo = await newPgInfo.save();
        console.log("zzzzzzzzzzzzz", createdPgInfo);

        res.status(201).json({
            message: "PG Info Added Successfully",
            code: 201,
            success: true,
            data: createdPgInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to Add PG Info",
            code: 500,
            success: false,
            error: error.message
        });
    }
};

const updatePgInfo = async (req, res) => {
    try {
        const updatedPgInfo = await pgInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPgInfo) {
            return res.status(404).json({
                message: "PG Info Not Found",
                code: 404,
                success: false
            });
        }
        res.status(200).json({
            message: "PG Info Updated Successfully",
            code: 200,
            success: true,
            data: updatedPgInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to Update PG Info",
            code: 500,
            success: false,
            error: error.message
        });
    }
};

const deletePgInfo = async (req, res) => {
    try {
        const deletedPgInfo = await pgInfo.findByIdAndDelete(req.params.id);
        if (!deletedPgInfo) {
            return res.status(404).json({
                message: "PG Info Not Found",
                code: 404,
                success: false
            });
        }
        res.status(200).json({
            message: "PG Info Deleted Successfully",
            code: 200,
            success: true,
            // data: deletedPgInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to Delete PG Info",
            code: 500,
            success: false,
            error: error.message
        });
    }
};
const getAllPgInfo = async (req, res) => {
    try {
        const { pgName, ownerName, city, state, zipCode, contactNumber, minRooms, maxRooms, roomTypes, facilities, minRent, maxRent, rules, reviewerName, rating, amenities } = req.query;

        // Initialize the match object
        let match = {};

        if (pgName) match.pgName = { $regex: pgName, $options: 'i' };
        if (ownerName) match.ownerName = { $regex: ownerName, $options: 'i' };
        if (city) match['location.city'] = { $regex: city, $options: 'i' };
        if (state) match['location.state'] = { $regex: state, $options: 'i' };
        if (zipCode) match['location.zipCode'] = zipCode;
        if (contactNumber) match.contactNumber = contactNumber;

        if (minRooms || maxRooms) {
            match.totalRooms = {};
            if (minRooms) match.totalRooms.$gte = Number(minRooms);
            if (maxRooms) match.totalRooms.$lte = Number(maxRooms);
        }

        if (roomTypes) match.roomTypes = { $in: roomTypes.split(',') };
        if (facilities) match.facilities = { $in: facilities.split(',') };

        if (minRent || maxRent) {
            match['rent.monthly'] = {};
            if (minRent) match['rent.monthly'].$gte = Number(minRent);
            if (maxRent) match['rent.monthly'].$lte = Number(maxRent);
        }

        if (rules) match.rules = { $regex: rules, $options: 'i' };
        if (reviewerName) match['reviews.reviewerName'] = { $regex: reviewerName, $options: 'i' };
        if (rating) match['reviews.rating'] = Number(rating);
        if (amenities) match.amenities = { $in: amenities.split(',') };

        // Build the aggregation pipeline
        let pipeline = [{ $match: match }];

        // Execute the aggregation pipeline
        const pgInfos = await pgInfo.aggregate(pipeline);

        res.status(200).json({
            message: "PG Info Retrieved Successfully",
            code: 200,
            success: true,
            total: pgInfos.length,
            data: pgInfos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to Retrieve PG Info",
            code: 500,
            success: false,
            error: error.message
        });
    }
};



export { addPgInfo, updatePgInfo, deletePgInfo, getAllPgInfo }