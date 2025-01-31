import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guest',
            required: true,
        },
        roomNumber: { type: Number, required: true },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        bookingStatus: {
            type: String,
            enum: ['Booked', 'Available', 'Pending'],
            default: 'Available',
        },
    },
    { timestamps: true }
);

const pgInfoSchema = new mongoose.Schema(
    {
        pgName: { type: String, required: true },
        ownerName: { type: String, required: true },
        location: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        contactNumber: { type: String, required: true },
        totalRooms: { type: Number, required: true },
        availableRooms: { type: Number, required: true },
        roomTypes: [{ type: String }],
        facilities: [{ type: String }],
        rent: {
            monthly: { type: Number, required: true },
            securityDeposit: { type: Number, required: true },
        },
        rules: { type: String },
        reviews: [
            {
                reviewerName: { type: String },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String },
                date: { type: Date, default: Date.now },
            },
        ],
        images: [{ type: String }],
        amenities: [{ type: String }],
        bookings: [bookingSchema], // Add booking slots
    },
    { timestamps: true }
);

const pgInfo = mongoose.model('pgInfo', pgInfoSchema);

export default pgInfo;
