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
            data: deletedPgInfo
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
        // Extract query parameters from the request
        const { pgName, ownerName, city, state, zipCode, contactNumber, minRooms, maxRooms, roomTypes, facilities, minRent, maxRent, rules, reviewerName, rating, amenities } = req.query;

        // Build the aggregation pipeline
        let pipeline = [];

        if (pgName) {
            pipeline.push({
                $match: {
                    pgName: { $regex: pgName, $options: 'i' }
                }
            });
        }

        if (ownerName) {
            pipeline.push({
                $match: {
                    ownerName: { $regex: ownerName, $options: 'i' }
                }
            });
        }

        if (city) {
            pipeline.push({
                $match: {
                    'location.city': { $regex: city, $options: 'i' }
                }
            });
        }

        if (state) {
            pipeline.push({
                $match: {
                    'location.state': { $regex: state, $options: 'i' }
                }
            });
        }

        if (zipCode) {
            pipeline.push({
                $match: {
                    'location.zipCode': zipCode
                }
            });
        }

        if (contactNumber) {
            pipeline.push({
                $match: {
                    contactNumber: contactNumber
                }
            });
        }

        if (minRooms || maxRooms) {
            let roomMatch = {};
            if (minRooms) roomMatch.$gte = Number(minRooms);
            if (maxRooms) roomMatch.$lte = Number(maxRooms);

            pipeline.push({
                $match: {
                    totalRooms: roomMatch
                }
            });
        }

        if (roomTypes) {
            pipeline.push({
                $match: {
                    roomTypes: { $in: roomTypes.split(',') }
                }
            });
        }

        if (facilities) {
            pipeline.push({
                $match: {
                    facilities: { $in: facilities.split(',') }
                }
            });
        }

        if (minRent || maxRent) {
            let rentMatch = {};
            if (minRent) rentMatch.$gte = Number(minRent);
            if (maxRent) rentMatch.$lte = Number(maxRent);

            pipeline.push({
                $match: {
                    'rent.monthly': rentMatch
                }
            });
        }

        if (rules) {
            pipeline.push({
                $match: {
                    rules: { $regex: rules, $options: 'i' }
                }
            });
        }

        if (reviewerName) {
            pipeline.push({
                $match: {
                    'reviews.reviewerName': { $regex: reviewerName, $options: 'i' }
                }
            });
        }

        if (rating) {
            pipeline.push({
                $match: {
                    'reviews.rating': Number(rating)
                }
            });
        }

        if (amenities) {
            pipeline.push({
                $match: {
                    amenities: { $in: amenities.split(',') }
                }
            });
        }

        // Execute the aggregation pipeline
        const pgInfos = await pgInfo.aggregate(pipeline);

        res.status(200).json({
            message: "PG Info Retrieved Successfully",
            code: 200,
            success: true,
            data: pgInfos,
            total: pgInfos.length // total number of PG info
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