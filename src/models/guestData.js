import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        dateOfBirth: { type: Date },
        gender: { type: String, enum: ['Male', 'Female', 'Other'] },
        profession: { type: String },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        notes: { type: String },
    },
    { timestamps: true }
);

const guestData = mongoose.model('Guest', guestSchema);

export default guestData;