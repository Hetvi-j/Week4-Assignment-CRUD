import { readData,
    writeData
} from "../utils/helper.js";

import {
    validateUser,
    validatePartialUser
} from "../utils/validation.js";



// STATIC LOGIN
export const loginUser = (
    req,
    res
) => {

    try {

        const {
            email,
            password
        } = req.body;

        // Required Validation
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Email and Password are required"
            });
        }

        // Static Credentials
        if (
            email !== "admin@gmail.com" ||
            password !== "admin123"
        ) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid Credentials"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Login Successful"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Login Failed"
        });
    }
};



// GET ALL USERS
export const getUsers = (
    req,
    res
) => {

    try {

        const data = readData();

        // Remove Soft Deleted Users
        const users =
            data.users.filter(
                (user) =>
                    !user.isDeleted
            );

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch users"
        });
    }
};



// GET SINGLE USER
export const getSingleUser = (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const data = readData();

        const user =
            data.users.find(
                (u) =>
                    u.id == id &&
                    !u.isDeleted
            );

        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch user"
        });
    }
};



// ADD USER
export const addUser = (
    req,
    res
) => {

    try {

        // Validation
        const validation =
            validateUser(req.body);

        if (!validation.valid) {

            return res.status(400).json({
                success: false,
                errors:
                    validation.errors
            });
        }

        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body;

        const data = readData();

        // Duplicate Email Check
        const existingUser =
            data.users.find(
                (u) =>
                    u.email === email
            );

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                    "Email already exists"
            });
        }

        // Create User
        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
            password,
            role,
            isDeleted: false
        };

        data.users.push(newUser);

        writeData(data);

        res.status(201).json({
            success: true,
            message:
                "User Added Successfully",
            user: newUser
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Failed to add user"
        });
    }
};



// UPDATE USER
export const updateUser = (
    req,
    res
) => {

    try {

        const { id } = req.params;

        // Partial Validation
        const validation =
            validatePartialUser(
                req.body
            );

        if (!validation.valid) {

            return res.status(400).json({
                success: false,
                errors:
                    validation.errors
            });
        }

        const data = readData();

        const userIndex =
            data.users.findIndex(
                (u) =>
                    u.id == id &&
                    !u.isDeleted
            );

        if (userIndex === -1) {

            return res.status(404).json({
                success: false,
                message:
                    "User Not Found"
            });
        }

        // Duplicate Email Check
        if (req.body.email) {

            const existingEmail =
                data.users.find(
                    (u) =>
                        u.email ===
                            req.body.email &&
                        u.id != id
                );

            if (existingEmail) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email already exists"
                });
            }
        }

        // Update User
        data.users[userIndex] = {
            ...data.users[userIndex],
            ...req.body
        };

        writeData(data);

        res.status(200).json({
            success: true,
            message:
                "User Updated Successfully",
            user:
                data.users[userIndex]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Failed to update user"
        });
    }
};



// SOFT DELETE USER
export const deleteUser = (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const data = readData();

        const user =
            data.users.find(
                (u) =>
                    u.id == id &&
                    !u.isDeleted
            );

        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User Not Found"
            });
        }

        // Soft Delete
        user.isDeleted = true;

        writeData(data);

        res.status(200).json({
            success: true,
            message:
                "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Failed to delete user"
        });
    }
};