export function validateUser(body) {

    const errors = [];

    // Name Validation
    if (!body.name) {

        errors.push("Name is required");

    } else if (
        typeof body.name !== "string"
    ) {

        errors.push(
            "Name must be string"
        );

    } else if (
        body.name.trim().length < 2
    ) {

        errors.push(
            "Name must be at least 2 characters"
        );
    }

    // Email Validation
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!body.email) {

        errors.push(
            "Email is required"
        );

    } else if (
        !emailRegex.test(body.email)
    ) {

        errors.push(
            "Invalid email"
        );
    }

    // Phone Validation
    const phoneRegex =
        /^[0-9]{10}$/;

    if (!body.phone) {

        errors.push(
            "Phone is required"
        );

    } else if (
        !phoneRegex.test(body.phone)
    ) {

        errors.push(
            "Phone must be 10 digits"
        );
    }

    // Password Validation
    if (!body.password) {

        errors.push(
            "Password is required"
        );

    } else if (
        body.password.length < 6
    ) {

        errors.push(
            "Password must be at least 6 characters"
        );
    }

    // Role Validation
    const allowedRoles = [
        "admin",
        "user",
        "editor"
    ];

    if (!body.role) {

        errors.push(
            "Role is required"
        );

    } else if (
        !allowedRoles.includes(
            body.role
        )
    ) {

        errors.push(
            "Role must be admin, user, or editor"
        );
    }

    return {
        valid: errors.length === 0,
        errors
    };
}



// UPDATE USER VALIDATION
export function validatePartialUser(
    body
) {

    const errors = [];

    // Name Validation
    if (body.name !== undefined) {

        if (
            typeof body.name !== "string"
        ) {

            errors.push(
                "Name must be string"
            );

        } else if (
            body.name.trim().length < 2
        ) {

            errors.push(
                "Name must be at least 2 characters"
            );
        }
    }

    // Email Validation
    if (body.email !== undefined) {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailRegex.test(
                body.email
            )
        ) {

            errors.push(
                "Invalid email"
            );
        }
    }

    // Phone Validation
    if (body.phone !== undefined) {

        const phoneRegex =
            /^[0-9]{10}$/;

        if (
            !phoneRegex.test(
                body.phone
            )
        ) {

            errors.push(
                "Phone must be 10 digits"
            );
        }
    }

    // Password Validation
    if (
        body.password !== undefined
    ) {

        if (
            body.password.length < 6
        ) {

            errors.push(
                "Password must be at least 6 characters"
            );
        }
    }

    // Role Validation
    if (body.role !== undefined) {

        const allowedRoles = [
            "admin",
            "user",
            "editor"
        ];

        if (
            !allowedRoles.includes(
                body.role
            )
        ) {

            errors.push(
                "Invalid role"
            );
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}